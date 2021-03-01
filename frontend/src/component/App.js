import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GraphBookingDistanceBins from "./GraphBookingDistanceBins";
import Map from "./Map";

import './App.css';


export default class App extends React.Component {
  state = {
    data: null,
  };

  fetchSimulation = async () => {
    try {
      const url = `${window.location.protocol}//${window.location.hostname}:5000/simulations`;
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
      });
      const result = await response.json();
      result.most_popular_dropoff_points = JSON.parse(result.most_popular_dropoff_points);
      result.most_popular_pickup_points = JSON.parse(result.most_popular_pickup_points);

      setTimeout(() => {
        document.getElementsByTagName("header")[0].className += " App-header-transition"
      }, 600);

      this.setState({data: result});
    }
    catch (error) {
      toast.error("Failed to fetch results..");
    }
  };

  createContent() {
    if (this.state.data) {
      return (
        <div>
          <section className="mt-4">
            <p>
              Booking Distance Bins
            </p>
            <GraphBookingDistanceBins data={this.state.data} />
          </section>
          <section className="mt-4">
            <p>
              Popular Pickup / Dropoff Points
            </p>
            <Map data={this.state.data} />
          </section>
        </div>
      );
    }
    else {
      return (
        <section>
          <p>
            <button
              id="button-fetch-simulation"
              type="button"
              onClick={ this.fetchSimulation }
              className="btn btn-primary">
                Begin Simulation
            </button>
          </p>
        </section>
      );
    }
  }

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
