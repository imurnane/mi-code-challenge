import {cloneDeep} from "lodash";
import {Bar, Doughnut} from "react-chartjs-2";


export default function GraphBookingDistanceBins({ data }) {
  const dataTemplate = {
    labels: Object.keys(data.booking_distance_bins),
    datasets: [{
      borderColor: "#282c34",
      data: Object.values(data.booking_distance_bins),
    }],
  };

  const doughnutOptions = {
    legend: {
      labels: {
        fontColor: "#FFF",
      }
    }
  };

  const barOptions = {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        ticks: {
          fontColor: "#FFF",
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          fontColor: "#FFF",
        },
      }]
    },
  };

  const doughnutData = cloneDeep(dataTemplate);
  const barData = cloneDeep(dataTemplate);
  doughnutData.datasets[0].backgroundColor = [ "rgb(157, 2, 8)", "rgb(220, 47, 2)", "rgb(244, 140, 6)", "rgb(155, 186, 8)" ];
  barData.datasets[0].backgroundColor = [ "rgb(2, 62, 138)", "rgb(0, 119, 182)", "rgb(0, 150, 199)", "rgb(0, 180, 216)" ];

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
