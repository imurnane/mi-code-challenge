"""Simulations
Author: Ian Murnane
Date: 2nd Mar 2021
Email: imurnane@internode.on.net
"""

import sqlite3

from flask_restful import Resource

from simulator import Simulator


class Simulations(Resource):
    """Simulations is an end-point accessible at /simulations
    This class fetches simulated geolocations and appends booking_distance_bins to the database
    """

    region_id = "de_berlin"
    conn = None

    def __init__(self):
        self._connect()

    def _connect(self):
        """Establish an sqlite database connection
        :return: None
        """
        self.conn = sqlite3.connect("simulation.db")
        self.conn.row_factory = sqlite3.Row

    def _get_bounding_box(self):
        """Fetch a region_bounding_box from the database
        :return: bounding box tuple
        :raises: sqlite3.Error on error
        """
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM region_bounding_box WHERE region_id = ?", (self.region_id,))
        result = cursor.fetchone()
        return (
            float(result["min_longitude"]),
            float(result["min_latitude"]),
            float(result["max_longitude"]),
            float(result["max_latitude"]),
        )

    def _save_booking_distance(self, booking_distance):
        """Append a booking_distance dict to the database
        :param booking_distance: A booking distance dict
        :return: None
        :raises: sqlite3.Error on error
        """
        with self.conn:
            cursor = self.conn.cursor()
            cursor.execute("""
                INSERT INTO booking_distance
                ('region_id', 'from_0_1', 'from_1_2', 'from_2_3', 'from_3_4')
                VALUES (?, ?, ?, ?, ?)
            """, (
                self.region_id,
                booking_distance["From 0->1km"],
                booking_distance["From 1->2km"],
                booking_distance["From 2->3km"],
                booking_distance["From 3->4km"],
            ))
            self.conn.commit()
        cursor.close()

    def get(self):
        """Fetch simulated geolocation data
        :return: {
            bounding_box,
            booking_distance_bins,
            most_popular_dropoff_points,
            most_popular_pickup_points
        }
        or 500 internal server error on sqlite3 error
        """
        try:
            bounding_box = self._get_bounding_box()
            data = Simulator(bounding_box).simulate(10)
            data.update({"bounding_box": bounding_box})
            self._save_booking_distance(data["booking_distance_bins"])
            return data
        except sqlite3.Error as error:
            return "Database error: " + str(error), 500
