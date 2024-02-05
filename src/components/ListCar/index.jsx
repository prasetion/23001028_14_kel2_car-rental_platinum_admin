import { useEffect, useState } from "react";
import "./styles.css";
import chevronRight from "../../assets/chevron-right.svg";
import carConfirmImg from "../../assets/img-BeepBeep.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCar } from "../../redux/features/deletecar/deleteCarSlice";
import { getCarList, setFilter } from "../../redux/features/listcar/carListSlice";
import dayjs from "dayjs";
import personIcon from "../../assets/fi_users.svg";
import timeIcon from "../../assets/fi_clock.svg";
import { Pagination } from "antd";
import { createCar } from "../../redux/features/createCar/createCarSlice";
import carPlaceHolder from "../../assets/vehicule-placeholder.png"

const ListCar = () => {
  const dispatch = useDispatch();
  const { cars, name, category, page, loading: carListLoading, error: carListError } = useSelector((state) => state.carList) || {};
  const { id: deleteCarId, loading: deleteCarLoading, error: deleteCarError } = useSelector((state) => state.deleteCar);
  const {success, id, loading, error} = useSelector ((state) => state.createCar)

  const [activeButton, setActiveButton] = useState(1);
  const [confirmation, setConfirmation] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [addCarModal, setAddCarModal] = useState(false)

  const carCategory = {
    small: "2 - 4 people",
    medium: "4 - 6 people",
    large: "6 - 8 people",
  };

  useEffect(() => {
    dispatch(getCarList({ name, category, page}));
    setActiveButton(1);
    // handleAddCarModal();
    // dispatch(createCar({status}))
    // if (success && success.statusText === "Created") {
    //   setAddCarModal(true)
    // }
    // setTimeout(() => {
    //   setAddCarModal(false);
    // }, 2000);
  }, []);


  const handleButtonClick = (categoryButton) => {
    setActiveButton((prevActiveButton) => (prevActiveButton === categoryButton ? null : categoryButton));
  };

  const handleChangeFilter = (changeName, changeCategory, changePage ) => {
    dispatch(setFilter({ name: changeName, category: changeCategory, page: changePage }));
    dispatch(getCarList({ name: changeName, category: changeCategory, page: changePage }));
  };

  const toggleConfirmation = (carId) => {
    setConfirmation(!confirmation);
    setSelectedCar(carId);
  };

  const handlePageChange = (pageNumber) => {
    dispatch(getCarList({ name, category, page: pageNumber }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCar({ id }));
      await dispatch(getCarList({ name, category, page}));
      await setConfirmation(!confirmation);
      await setSuccessModal(true);
      setTimeout(() => {
        setSuccessModal(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }, 2000);
      await window.scrollTo({ top: 0, behavior: 'instant' });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCarModal = async () => {
    // dispatch(createCar({success}))
    // if (success === "Created") {
    //   await setAddCarModal(true)
    // }
    // setTimeout(() => {
    //   setAddCarModal(false);
    // }, 2000);
  }

  return (
    <div className="listcar-container">
      {successModal && (
        <div className="success-modal-container">
          <div className="success-modal">
            <p>Data Berhasil Dihapus</p>
          </div>
        </div>
      )}
      {addCarModal && (
        <div className="success-modal-container">
          <div className="success-modal">
            <p>Data Berhasil Disimpan</p>
          </div>
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
            handleChangeFilter("", "", ""), handleButtonClick(1);
          }}
        >
          All
        </button>
        <button
          id="category-button"
          className={activeButton === 2 ? "active" : "categoryButton"}
          disabled={activeButton === 2}
          onClick={() => {
            handleChangeFilter("", "small", ""), handleButtonClick(2);
          }}
        >
          2 - 4 people
        </button>
        <button
          id="category-button"
          className={activeButton === 3 ? "active" : "categoryButton"}
          disabled={activeButton === 3}
          onClick={() => {
            handleChangeFilter("", "medium", ""), handleButtonClick(3);
          }}
        >
          4 - 6 people
        </button>
        <button
          id="category-button"
          className={activeButton === 4 ? "active" : "categoryButton"}
          disabled={activeButton === 4}
          onClick={() => {
            handleChangeFilter("", "large", ""), handleButtonClick(4);
          }}
        >
          6 - 8 people
        </button>
      </div>
      <div className="carlist-item">
        {cars && cars.map((car) => (
          <div key={car.id} id="carlist-card">
            <div className="carimage-card">
              <img src={car.image === null ? carPlaceHolder : car.image} alt="" />
            </div>
            <div>
              <p id="carlist-typecar">{car.name}</p>
              <h3 id="catlist-price">Rp {Intl.NumberFormat("es-ES").format(car.price)} / Hari</h3>
              <p>
                <span>
                  <img src={personIcon} alt="" />
                </span>{" "}
                {carCategory[car.category]}
              </p>
              <p id="carlist-info">
                <span>
                  <img src={timeIcon} alt="" />
                </span>{" "}
                Update at {dayjs(car.updatedAt).format("D MMM YYYY, HH:mm")}
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
      <div className="pagination-container">
      <Pagination current={page.page} total={page.count} onChange={handlePageChange} />
      </div>
    </div>
  );
};

export default ListCar;
