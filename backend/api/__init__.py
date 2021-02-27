import os
from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
cors = CORS()
import sqlite3
from simulator import Simulator

# instantiate the app
app = Flask(__name__)
cors.init_app(app)
api = Api(app)


class SimulationsPing(Resource):
    def get(self):
        return {"status": "success", "message": "pong!"}


api.add_resource(SimulationsPing, "/simulations/ping")


class Simulations(Resource):
    def get(self):
        region_id = "de_berlin"
        conn = sqlite3.connect('simulation.db')
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM region_bounding_box WHERE region_id = ?", (region_id,))
        result = cursor.fetchone()
        # print(result['region_name'])
        bounding_box = (
            float(result["min_longitude"]),
            float(result["min_latitude"]),
            float(result["max_longitude"]),
            float(result["max_latitude"]),
        )
        result2 = Simulator(bounding_box).simulate(10)
        booking_distance_bins = result2["booking_distance_bins"]
        # print(booking_distance_bins["From 0->1km"])
        cursor.execute("""
            INSERT INTO booking_distance
            ('region_id', 'from_0_1', 'from_1_2', 'from_2_3', 'from_3_4')
            VALUES (?, ?, ?, ?, ?)
        """, (
            region_id,
            booking_distance_bins["From 0->1km"],
            booking_distance_bins["From 1->2km"],
            booking_distance_bins["From 2->3km"],
            booking_distance_bins["From 3->4km"],
        ))
        conn.commit()
        cursor.close()
        return result2


api.add_resource(Simulations, "/simulations")
