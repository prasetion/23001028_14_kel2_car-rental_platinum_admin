import axios from "axios";
import React, { useEffect, useState } from "react";
import carImage from "./../../assets/car_img.png"
import "./styles.css"
import chevronRight from "../../assets/chevron-right.svg"
import { Link } from "react-router-dom";

const ListCar = () => {

    const [cars, setCars] = useState([])

    useEffect(() => {
        getCarList()
    }, [])

  const getCarList = async () => {
    try {
      const token = localStorage.getItem("accessToken");

            const config = {
                headers: {
                  access_token: `${token}`,
                },
              };

            const res = await axios.get("https://api-car-rental.binaracademy.org/admin/v2/car?page=1&pageSize=10", config)
            setCars(res.data.cars)
            console.log(res.data.cars)
        } catch (err) {
            console.log(err)    
        }
    }

    return (
        <div className="listcar-container">
            <div className="breadcrumb">
                <h4 className="breadcrumb-text-1">Cars</h4>
                <img src={chevronRight} alt="" />
                <h4 className="breadcrumb-text-1">List Car</h4>
            </div>
            <div className="listcar-button-container">
                <h2 className="car-sub-title">List Car</h2>
                <Link to={"/addCar"}>
                <button className="addcar-button"><span>+</span> Add New Car</button>
                </Link>
            </div>
            <div className="carlist-item">
                {(cars.map((car, id) => (
                    <div key={id} id="carlist-card">
                        <div className="carimage-card">
                            <img src={car.image} alt="" />
                        </div>
                        <div>
                            <p id="carlist-typecar">{car.name}</p>
                            <h3 id="catlist-price">Rp {Intl.NumberFormat("es-ES").format(car.price)} / Hari</h3>
                            <p id="carlist-info"><span>{car.start_rent_at}</span>-<span>{car.finish_rent_at}</span></p>
                            {/* Mengganti tanggal pake Dayjs atau Momentjs */}
                            <p id="carlist-info"><span></span>{car.updatedAt}</p>
                        </div>
                        <div className="carlist-button">
                            <button className="delete-button"><span></span>Delete</button>
                            <button className="edit-button"><span></span>Edit</button>
                        </div>
                    </div>
                )))}
            </div>
        </div>
    )
  };

export default ListCar