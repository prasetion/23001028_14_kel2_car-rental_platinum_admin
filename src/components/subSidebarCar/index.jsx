import { useNavigate } from "react-router-dom";
const SubSidebarCar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="title-list-sidebar">
        <p>Cars</p>
      </div>
      <div className="list-sidebar">
        <a onClick={() => navigate("carlist")}>List Car</a>
      </div>
    </>
  );
};

export default SubSidebarCar;
