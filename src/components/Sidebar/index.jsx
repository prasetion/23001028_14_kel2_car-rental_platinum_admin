import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { login } from "../../redux/features/login/loginSlice";

import FiHome from "../../assets/assets-navbar/fi-home.svg";
import Car from "../../assets/assets-navbar/car.svg";
import Logo from "../../assets/assets-navbar/logo.svg";
import { FiMenu } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";
import Search from "../../assets/assets-navbar/search.svg";
import "./style.css";

import SubSidebarDashboard from "../subSidebarDashboard";
import SubSidebarCar from "../subSidebarCar";
import { useDispatch, useSelector } from "react-redux";

import { getCarList, setFilter } from "../../redux/features/listcar/carListSlice";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [sideCar, setSideCar] = useState(true);
  const [sideDashboard, setSideDashboard] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const { cars, name, category, loading: carListLoading, error: carListError } = useSelector((state) => state.carList);

  function handleSideCar() {
    setSideCar(!sideCar);
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

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    dispatch(setFilter({ name, category }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilter({ name: searchText, category }));
    dispatch(getCarList({ name: searchText, category }));
  };

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
                <div className="search-container">
                  <input type="text" placeholder={"     Search..."} value={searchText} onChange={handleInputChange} className="input" />
                  <img src={Search} alt="Search" className={`search-icon ${searchText ? "hidden" : ""}`} />
                </div>
                <button className="btn btn-search" style={{ height: "43px" }} onClick={handleSearch}>
                  Search
                </button>
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
            <div className={`sidebar-second`} style={{ marginRight: "20px" }}>
              {renderSubSidebar()}
            </div>
            <div className="main-content">{<Outlet />}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
