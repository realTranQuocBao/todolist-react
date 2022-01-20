import { Chart } from "primereact/chart";

function TodoStatistic({ props }) {
  const { todoDatas } = props;
  const processing = todoDatas.filter((data) => {
    return data.completedAt === null;
  }).length;

  const done = todoDatas.filter((data) => {
    return data.completedAt !== null;
  }).length;

  const chartData = {
    labels: ["Done", "Processing"],
    datasets: [
      {
        data: [done, processing],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const lightOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
  };

  return (
    <div className="d-flex justify-content-center">
      <Chart
        type="doughnut"
        data={chartData}
        options={lightOptions}
        style={{ position: "relative", minWidth: "150px", width: "15%" }}
      />
    </div>
  );
}

export default TodoStatistic;
