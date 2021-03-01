import React from "react";
import GraphBookingDistanceBins from "./graphBookingDistanceBins";
import './App.css';

export default class App extends React.Component {
  state = {
    result: null,
  };

  fetchSimulation = async () => {
    const url = `${window.location.protocol}//${window.location.hostname}:5000/simulations`;
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
    });
    const result = await response.json();
    result.most_popular_dropoff_points = JSON.parse(result.most_popular_dropoff_points);
    result.most_popular_pickup_points = JSON.parse(result.most_popular_pickup_points);
    console.log(result);
    document.getElementById("button-fetch-simulation").style.display = "none";
    document.getElementsByTagName("header")[0].className += " App-header-transition";
    this.setState({ result });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Mobility Intelligence Code Challenge
          </p>
        </header>
        <section className="visualiseResults">
          <p>
            <button
              id="button-fetch-simulation"
              type="button"
              onClick={ this.fetchSimulation }
              className="btn btn-primary">
                Begin Simulation
            </button>
          </p>
          <GraphBookingDistanceBins result={this.state.result} />
        </section>
      </div>
    );
  }
}
