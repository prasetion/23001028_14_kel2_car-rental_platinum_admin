import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import chevronRight from "../../assets/chevron-right.svg";
import carConfirmImg from "../../assets/img-BeepBeep.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCar } from "../../redux/features/deletecar/deleteCarSlice";
import { getCarList, setFilter } from "../../redux/features/listcar/carListSlice";

const ListCar = () => {
  const dispatch = useDispatch();
  const { cars, name, category, loading: carListLoading, error: carListError } = useSelector((state) => state.carList);
  const { id, loading: deleteCarLoading, error: deleteCarError } = useSelector((state) => state.deleteCar);

  const [activeButton, setActiveButton] = useState(1);
  const [confirmation, setConfirmation] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [successModal, setSuccessModal] = useState(false);

  useEffect(() => {
    dispatch(getCarList({ name, category }));
    setActiveButton(1);
  }, []);

  const handleButtonClick = (categoryButton) => {
    setActiveButton((prevActiveButton) => (prevActiveButton === categoryButton ? null : categoryButton));
  };

  const handleChangeFilter = (changeName, changeCategory) => {
    dispatch(setFilter({ name: changeName, category: changeCategory }));
    dispatch(getCarList({ name: changeName, category: changeCategory }));
  };

  const toggleConfirmation = (carId) => {
    setConfirmation(!confirmation);
    setSelectedCar(carId);
  };

  const handleDelete = async (id) => {
    dispatch(deleteCar({ id }));
  };

  return (
    <div className="listcar-container">
      {successModal && (
        <div className="success-modal">
          <p>Data Berhasil Dihapus</p>
        </div>
      )}
      {confirmation && (
        <div className="confirmation-container">
          <div className="confirmation-chart">
            <img src={carConfirmImg} alt="" />
            <div className="confirm-text">
              <h2>Menghapus Data Mobil</h2>
              <p>Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin menghapus?</p>
            </div>
            <div className="confirm-button">
              <button id="confirm-yes-button" onClick={() => handleDelete(selectedCar)}>
                YES
              </button>
              <button id="confirm-no-button" onClick={() => setConfirmation(!confirmation)}>
                NO
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="breadcrumb">
        <h4 className="breadcrumb-text-1">Cars</h4>
        <img src={chevronRight} alt="" />
        <h4 className="breadcrumb-text-1">List Car</h4>
      </div>
      <div className="listcar-button-container">
        <h2 className="car-sub-title">List Car</h2>
        <Link to={"/addCar"}>
          <button className="addcar-button">
            <span>+</span> Add New Car
          </button>
        </Link>
      </div>
      <div className="category-button-containner">
        <button
          id="category-button"
          className={activeButton === 1 ? "active" : "categoryButton"}
          disabled={activeButton === 1}
          onClick={() => {
            handleChangeFilter("", ""), handleButtonClick(1);
          }}
        >
          All
        </button>
        <button
          id="category-button"
          className={activeButton === 2 ? "active" : "categoryButton"}
          disabled={activeButton === 2}
          onClick={() => {
            handleChangeFilter("", "small"), handleButtonClick(2);
          }}
        >
          2 - 4 people
        </button>
        <button
          id="category-button"
          className={activeButton === 3 ? "active" : "categoryButton"}
          disabled={activeButton === 3}
          onClick={() => {
            handleChangeFilter("", "medium"), handleButtonClick(3);
          }}
        >
          4 - 6 people
        </button>
        <button
          id="category-button"
          className={activeButton === 4 ? "active" : "categoryButton"}
          disabled={activeButton === 4}
          onClick={() => {
            handleChangeFilter("", "large"), handleButtonClick(4);
          }}
        >
          6 - 8 people
        </button>
      </div>
      <div className="carlist-item">
        {cars.map((car) => (
          <div key={car.id} id="carlist-card">
            <div className="carimage-card">
              <img src={car.image} alt="" />
            </div>
            <div>
              <p id="carlist-typecar">{car.name}</p>
              <h3 id="catlist-price">Rp {Intl.NumberFormat("es-ES").format(car.price)} / Hari</h3>
              <p id="carlist-info">
                <span>{car.start_rent_at}</span>-<span>{car.finish_rent_at}</span>
              </p>
              {/* Mengganti tanggal pake Dayjs atau Momentjs */}
              <p id="carlist-info">
                <span></span>
                {car.updatedAt}
              </p>
            </div>
            <div className="carlist-button">
              <button onClick={() => toggleConfirmation(car.id)} className="delete-button">
                <span></span>Delete
              </button>
              <Link to={`/editcar/${car.id}`}>
                <button className="edit-button">
                  <span></span>Edit
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCar;
