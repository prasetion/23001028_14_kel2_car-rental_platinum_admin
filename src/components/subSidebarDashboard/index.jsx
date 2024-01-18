import { useNavigate } from "react-router-dom";
const SubSidebarDashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`sidebar-second-dashboard`}>
        <div className="title-list-sidebar">
          <p>DASHBOARD</p>
        </div>
        <div className="list-sidebar">
          <a onClick={() => navigate("dashboard")}>DASHBOARD</a>
        </div>
      </div>
    </>
  );
};

export default SubSidebarDashboard;
