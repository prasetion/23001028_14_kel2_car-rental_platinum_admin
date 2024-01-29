import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { login } from "../../redux/features/login/loginSlice";

import FiHome from "../../assets/assets-navbar/fi-home.svg";
import Car from "../../assets/assets-navbar/car.svg";
import Logo from "../../assets/assets-navbar/logo.svg";
import { FiMenu } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";
import "./style.css";
// import style from "../../assets/style.module.css";

import SubSidebarDashboard from "../subSidebarDashboard";
import SubSidebarCar from "../subSidebarCar";
import { useSelector, useDispatch } from "react-redux";
import { getCarList, setFilter } from "../../redux/features/listcar/carListSlice";
// import Dashboard from "../../pages/Dashboard";
// import CarList from "../../pages/CarList";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [sideCar, setSideCar] = useState(true);
  const [sideDashboard, setSideDashboard] = useState(false);
  const [username, setUsername] = useState("");
  const { success } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")

  function handleSideCar() {
    setSideCar(!sideCar);
  }

  const handleSubmit = () => {
    dispatch(setFilter({name, category}))
    dispatch(getCarList({name, category}))
  }

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  function handleSideDashboard() {
    setSideDashboard(!sideDashboard);
  }

  function handleOpen() {
    setOpen(!open);
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  useEffect(() => {
    dispatch(login()).then(() => {
      setUsername(localStorage.getItem("email"));
    });
  }, []);

  console.log("test", success);
  const renderSubSidebar = () => {
    if (sideDashboard === true) {
      return <SubSidebarDashboard /> || <SubSidebarCar className="d-none" />;
    } else if (sideCar === true) {
      return <SubSidebarCar /> || <SubSidebarDashboard className="d-none" />;
    } else if (open === true) {
      return <SubSidebarDashboard />;
    }
  };
  return (
    <>
      <div className="d-flex">
        <div className="navbar-sidebar">
          <div className="sidebar">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="34" height="34" fill="#CFD4ED" className="logo-home" />
            </svg>
            <button onClick={handleSideDashboard} className="home-icon btn">
              <img src={FiHome} />
              <a>Dashboard</a>
            </button>
            <button onClick={handleSideCar} className="car-icon btn">
              <img src={Car} />
              <a>Cars</a>
            </button>
          </div>
        </div>
        <div className="navbar-sidebar-second">
          <div className="header d-flex align-items-center">
            <div className="header-1">
              <img src={Logo} alt="" />
              <button className="btn btn-hamburger" onClick={handleOpen}>
                <FiMenu style={{ width: "24px", height: "24px", listStyle: "none" }} />
              </button>
            </div>
            <div className="header-2">
              <div className="search-bar">
                <label htmlFor="">
                  <input onChange={handleChangeName} type="text" placeholder={`      Search`} />
                </label>
                <button onClick={handleSubmit} className="btn btn-search">Search</button>
              </div>
              <div className="user-account">
                <p className="icon-account btn m-auto">{username[0]}</p>
                <p className="m-auto">{username}</p>
                <div className="nav-item dropdown">
                  <IoChevronDown className="m-auto nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" />
                  <ul className="dropdown-menu mt-3">
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className={`sidebar-second`}>{renderSubSidebar()}</div>
            <div className="main-content">
              <div>{<Outlet />}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
