import ChartDiagram from "../../components/ChartDiagram";
import Rectangle from "../../assets/assets-dashboard/Rectangle.png";
import TableDashboard from "../../components/TableDashboard";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard mt-3">
        <div className="dashboard-title">
          <h5>
            <b>Dashborad &gt;</b> Dashboard
          </h5>
        </div>

        <div className="d-flex gap-2 mt-5 ms-4">
          <img src={Rectangle} alt="" style={{ width: "5px", height: "30px" }} />
          <p>
            <b>Rented Car Data Visualization</b>
          </p>
        </div>
        <div className="mb-5">
          <ChartDiagram />
        </div>
        <div>
          <TableDashboard />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
