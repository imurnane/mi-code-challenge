import {Bar, Doughnut} from "react-chartjs-2";

export default function VisualiseResults({ result }) {
  if (result === null) {
    return (
      <div>No result yet</div>
    );
  }
  else {
    const data = {
      labels: Object.keys(result.booking_distance_bins),
      datasets: [{
        label: 'My Dataset',
        data: Object.values(result.booking_distance_bins),
        backgroundColor: [ "rgb(2, 62, 138)", "rgb(0, 119, 182)", "rgb(0, 150, 199)", "rgb(0, 180, 216)" ],
      }],
    };

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          }
        }]
      }
    };

    return (
      <div>
        <Doughnut data={data} />
        <Bar data={data} options={options} />
      </div>
    );
  }
}
