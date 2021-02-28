import React from "react";
import VisualiseResults from "./visualiseResults";
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
    this.setState({ result });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Mobility Intelligence Code Challenge
          </p>
          <p>
            <button
              type="button"
              onClick={ this.fetchSimulation }
              className="btn btn-primary">
                Begin Simulation
            </button>
          </p>
        </header>
        <section>
          <VisualiseResults result={this.state.result} />
        </section>
      </div>
    );
  }
}
