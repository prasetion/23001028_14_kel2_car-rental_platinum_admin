import React, { useState } from "react";
import "./styles.css"
import Form from 'react-bootstrap/Form';
import chevronRight from "../../assets/chevron-right.svg"
import { Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import uploadIcon from "../../assets/fi_upload.svg"
import { useDispatch, useSelector } from "react-redux";
import { createCar } from "../../redux/features/createCar/createCarSlice";

const CreateNewCar = () => {
    const dispatch = useDispatch()
    const {id, loading, error} = useSelector ((state) => state.createCar)

    const navigate = useNavigate();

    const [form, setForm] = useState ({
        name: "",
        category: "",
        price: "",
        image: "",
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        // console.log(name, value)
        setForm({
            ...form,
            [name]: value,
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const maxSize = 2 * 1024 * 1024;
        if (!form.name || !form.price || !form.image || !form.category) {
            alert("Data harus diisi");
        } else if (form.image && form.image.size > maxSize)  {
            alert("Ukuran file melebihi batas maksimum (2MB). Pilih file lain.")
            e.target.value = null;
        } else {
            dispatch(createCar({form}))
            navigate("/carlist")
        }


    }

    console.log(
        form.name,
        form.category,
        form.price,
        form.image,
    )

    return (
        <div className="addcar-container">
            <div className="breadcrumb">
                <h4 className="breadcrumb-text-1">Cars</h4>
                <img src={chevronRight} alt="" />
                <Link to={"/carlist"}>
                <h4 className="breadcrumb-text-1">List Car</h4>
                </Link>
                <img src={chevronRight} alt="" />
                <h5 className="breadcrumb-text-2">Add New Car</h5>
            </div>
            <div>
                <h2 className="car-sub-title">Add New Car</h2>
            <div className="addcar-input-container">
                <div className="addcar-input-form">
                    <div className="addcar-input-form-1">
                        <p>Nama<span className="asterisk">*</span></p>
                        <input onChange={handleChange} name="name" type="text" />
                    </div>
                    <div className="addcar-input-form-1">
                        <p>Harga<span className="asterisk">*</span></p>
                        <input onChange={handleChange} name="price" type="number" />
                    </div>
                    <div className="addcar-input-form-1">
                        <p>Foto<span className="asterisk">*</span></p>
                        <div>
                            <input onChange={handleChange} name="image" type="file" accept=".jpg, .jpeg, .png" id="input-with-upload-image" />
                            <label htmlFor="input-with-upload-image" className="input-style">Pilih gambar<span><img src={uploadIcon} alt="" /></span></label>
                            <p id="requirement-text-image">File size max. 2MB</p>
                        </div>
                    </div>
                    <div className="addcar-input-form-1">
                        <p>Kategori<span className="asterisk">*</span></p>
                        <select onChange={handleChange} name="category" id="select-cars">
                            <option value="">Kategori</option>
                            <option value="small">2 - 4 people</option>
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
                <button className="button-save" onClick={(e) => handleSubmit(e, form)}>Save</button>
            </div>
            </div>
        </div>
    )
}

export default CreateNewCar