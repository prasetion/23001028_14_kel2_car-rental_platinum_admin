import axios from "axios";
import React, { useEffect, useState } from "react";
import carImage from "./../../assets/car_img.png"
import "./styles.css"
import chevronRight from "../../assets/chevron-right.svg"

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
  };

    return(
        <div className="listcar-container">
            <h1>LIST CAR</h1>
            <div className="breadcrumb">
                <h4 className="breadcrumb-text-1">Cars</h4>
                <img src={chevronRight} alt="" />
                <h4 className="breadcrumb-text-1">List Car</h4>
                <img src={chevronRight} alt="" />
                <h5 className="breadcrumb-text-2">Add New Car</h5>
            </div>
            <div>
                <h2 className="car-sub-title">Add New Car</h2>
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
}
