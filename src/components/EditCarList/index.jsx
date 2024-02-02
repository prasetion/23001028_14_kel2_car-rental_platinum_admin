import React, { useEffect, useState } from "react";
import "./styles.css"
import chevronRight from "../../assets/chevron-right.svg"
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import uploadIcon from "../../assets/fi_upload.svg"
import downIcon from "../../assets/fi-chevron-down.svg"
import { useDispatch, useSelector } from "react-redux";
import { editCar } from "../../redux/features/editCar/editCarSlice";
import { getCarId } from "../../redux/features/getCarId/getCarIdSlice";


const EditCarList = () => {

    const dispatch = useDispatch()
    const {carById, success: getCarIdSuccess, loading: getCarIdLoading, error: getCarIdError} = useSelector ((state) => state.getCarId)
    const {success, loading, error} = useSelector ((state) => state.editCar)
    const {id} = useParams()
    const [cars, setCars] = useState({
        name: "",
        category: "",
        price: "",
        status: "",
        image: ""
    })

    useEffect(() => {
        getCars(id)
    }, [])

    const getCars = async (idCar) => {
        dispatch(getCarId({idCar}))
    }

    
    const handleChange = (e) => {
        const {name, value} = e.target
        console.log(name, value)
        setCars({
            ...carById,
            [name]: value,
        })
    }

    const handleSubmit = async (cars) => {
        // e.preventDefault()
        cars.price = Number(cars.price)
        dispatch(editCar({id, cars}))

    }


    return (
        <div>
            <div className="addcar-container">
                <div className="breadcrumb">
                    <h4 className="breadcrumb-text-1">Cars</h4>
                    <img src={chevronRight} alt="" />
                    <h4 className="breadcrumb-text-1">List Car</h4>
                    <img src={chevronRight} alt="" />
                    <h5 className="breadcrumb-text-2">Edit Car</h5>
                </div>
                <div>
                    <h2 className="car-sub-title">Edit Car</h2>
                <div className="addcar-input-container">
                    <div className="addcar-input-form">
                        <div className="addcar-input-form-1">
                            <p>Nama<span className="asterisk">*</span></p>
                            <input className="input-style" type="text" onChange={handleChange} name="name" value={cars.name}/>
                        </div>
                        <div className="addcar-input-form-1">
                            <p>Harga<span className="asterisk">*</span></p>
                            <input type="number" onChange={handleChange} name="price" value={cars.price} />
                        </div>
                        <div className="addcar-input-form-1">
                            <p>Foto<span className="asterisk">*</span></p>
                            <div>
                                <input type="file" id="input-with-upload-image" onChange={handleChange} name="image" placeholder={cars.image} />
                                <label for="input-with-upload-image" className="input-style">Pilih gambar<span><img src={uploadIcon} alt="" /></span></label>
                                <p id="requirement-text-image">File size max. 2MB</p>
                            </div>
                        </div>
                        <div className="addcar-input-form-1">
                            <p>Kategori<span className="asterisk">*</span></p>
                            <select id="select-cars" onChange={handleChange} name="category" value={cars.category}>
                                {/* <option value="">Kategori</option> */}
                                <option className="category-option" value="small">2 - 4 people <span><img src={downIcon}/></span></option>
                                <option value="medium">4 - 6 people</option>
                                <option value="large">6 - 8 people</option>
                            </select>
                        </div>
                        <div className="addcar-input-form-2">
                            <p>Created at</p>
                            <p>-</p>
                        </div>
                        <div className="addcar-input-form-2">
                            <p>Update at</p>
                            <p>-</p>
                        </div>
                    </div>
                </div>
                <div className="button-container">
                    <Link to={"/carlist"}>
                    <button className="button-cancel">Cancel</button>
                    </Link>
                    <button className="button-save" onClick={handleSubmit}>Save</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default EditCarList