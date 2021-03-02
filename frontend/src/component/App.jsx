import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GraphBookingDistanceBins from "./GraphBookingDistanceBins";
import Map from "./Map";

import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  /**
   * Fetch simulated geolocation data from the backend server.
   * Updates the state and calls setState on success, or displays
   * a toast message on error.
   *
   * @returns {Promise<void>}
   */
  async fetchSimulation() {
    try {
      const url = `${window.location.protocol}//${window.location.hostname}:5000/simulations`;
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
      });
      const result = await response.json();
      // geolocation data requires deserializing
      result.most_popular_dropoff_points = JSON.parse(result.most_popular_dropoff_points);
      result.most_popular_pickup_points = JSON.parse(result.most_popular_pickup_points);

      // animate reduced header spacing to better utilize content area
      setTimeout(() => {
        document.getElementsByTagName("header")[0].className += " App-header-transition";
      }, 600);

      this.setState({ data: result });
    }
    catch (error) {
      toast.error("Failed to fetch results..");
      console.error(error); // eslint-disable-line no-console
    }
  }

  /**
   * Create the page layout depending on state
   * TODO: As the content grows, this will likely be moved into separate files
   *
   * @returns {JSX.Element} Start button or simulated results
   */
  createContent() {
    const { data } = this.state;
    return data ? (
      <div>
        <section className="mt-4">
          <p>
            Booking Distance Bins
          </p>
          <GraphBookingDistanceBins bookingDistanceBins={data.booking_distance_bins} />
        </section>
        <section className="mt-4">
          <p>
            Popular Pickup / Dropoff Points
          </p>
          <Map
            pickupPoints={data.most_popular_pickup_points}
            dropoffPoints={data.most_popular_dropoff_points}
            boundingBox={data.bounding_box}
          />
        </section>
      </div>
    ) : (
      <section>
        <p>
          <button
            id="button-fetch-simulation"
            type="button"
            onClick={this.fetchSimulation.bind(this)}
            className="btn btn-primary"
          >
            Begin Simulation
          </button>
        </p>
      </section>
    );
  }

  /**
   * Render the basic page template with React components
   *
   * @returns {JSX.Element} Page template
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Mobility Intelligence Code Challenge
          </p>
        </header>
        { this.createContent() }
        <ToastContainer position="top-center" />
      </div>
    );
  }
}
