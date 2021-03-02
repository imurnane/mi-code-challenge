import React from "react";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import { Bar, Doughnut } from "react-chartjs-2";

/**
 * Output the supplied bookingDistanceBins in an easy to read graphical format
 *
 * @param {Object} bookingDistanceBins dictionary
 * @returns {JSX.Element} Bootstrap formatted container row including graphs
 */
export default function GraphBookingDistanceBins({ bookingDistanceBins }) {
  const dataTemplate = {
    labels: Object.keys(bookingDistanceBins),
    datasets: [{
      borderColor: "#282c34",
      data: Object.values(bookingDistanceBins),
    }],
  };

  const doughnutOptions = {
    legend: {
      labels: {
        fontColor: "#FFF",
      },
    },
  };

  const barOptions = {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        ticks: {
          fontColor: "#FFF",
        },
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          fontColor: "#FFF",
        },
      }],
    },
  };

  const doughnutData = cloneDeep(dataTemplate);
  const barData = cloneDeep(dataTemplate);
  doughnutData.datasets[0].backgroundColor = ["rgb(157, 2, 8)", "rgb(220, 47, 2)", "rgb(244, 140, 6)", "rgb(155, 186, 8)"];
  barData.datasets[0].backgroundColor = ["rgb(2, 62, 138)", "rgb(0, 119, 182)", "rgb(0, 150, 199)", "rgb(0, 180, 216)"];

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
        <div className="col-md-6">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}

GraphBookingDistanceBins.propTypes = {
  bookingDistanceBins: PropTypes.objectOf(PropTypes.number).isRequired,
};
