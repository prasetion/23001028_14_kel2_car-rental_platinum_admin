import { useNavigate } from "react-router-dom";
const SubSidebarCar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`sidebar-second-car`}>
        <div className="title-list-sidebar">
          <p>CARS</p>
        </div>
        <div className="list-sidebar">
          <a onClick={() => navigate("carlist")}>List Car</a>
        </div>
      </div>
    </>
  );
};

export default SubSidebarCar;
