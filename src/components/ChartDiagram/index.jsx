import { useState } from "react";
import { useDispatch } from "react-redux";
import "./style.css";
import { listOrderChart } from "../../redux/features/listOrderChart/listOrderChartSlice";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

const ChartDiagram = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const handleGetListOrderMount = () => {
    const token = localStorage.getItem("access_token");
    const param = selectedOption;

    const payload = {
      headers: {
        access_token: `${token}`,
      },
    };

    // Kirim payload dan param sebagai objek tunggal
    dispatch(listOrderChart({ payload, param }))
      .then((result) => {
        setData(result.payload);
        console.log("test", result.payload);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const dataVerticalBar = {
    labels: data.map((item) => item.day[8] + item.day[9]),
    datasets: [
      {
        label: "data pemasukan",
        data: data.map((item) => item.orderCount),
        backgroundColor: "Blue",
      },
    ],
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <div className="d-flex flex-column gap-2 ms-4">
        <label>Month</label>
        <div className="d-flex">
          <select value={selectedOption} onChange={handleDropdownChange} className="form-select">
            <option value="" disabled={selectedOption !== ""}>
              Choose
            </option>
            <option value="from=2023-01-01&until=2023-01-31">January 2023</option>
            <option value="from=2023-02-01&until=2023-02-28">February 2023</option>
            <option value="from=2023-03-01&until=2023-03-31">March 2023</option>
            <option value="from=2023-04-01&until=2023-04-30">April 2023</option>
            <option value="from=2023-05-01&until=2023-05-31">May 2023</option>
            <option value="from=2023-06-01&until=2023-06-30">June 2023</option>
            <option value="from=2023-07-01&until=2023-07-31">July 2023</option>
            <option value="from=2023-08-01&until=2023-08-31">August 2023</option>
            <option value="from=2023-09-01&until=2023-09-30">September 2023</option>
            <option value="from=2023-10-01&until=2023-10-31">October 2023</option>
            <option value="from=2023-11-01&until=2023-11-30">November 2023</option>
            <option value="from=2023-12-01&until=2023-12-31">Desember 2023</option>
          </select>

          <button className="btn btn-primary" style={{ width: "100px" }} onClick={handleGetListOrderMount}>
            Go
          </button>
        </div>
      </div>
      <div className="ms-4" style={{ width: "100%", height: "700px" }}>
        <Bar options={options} data={dataVerticalBar} />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default ChartDiagram;
