import React, { useState } from "react";
import "./styles.css"
import Form from 'react-bootstrap/Form';
import chevronRight from "../../assets/chevron-right.svg"
import { Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CreateNewCar = () => {

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
        form.price = Number(form.price)
        try {
            const token = localStorage.getItem("accessToken")

            const config = {
                headers: {
                  access_token: `${token}`,
                },
              };

              const res = await axios.post("https://api-car-rental.binaracademy.org/admin/car", form, config)
              console.log(res.data)
              navigate("/listCar")
        } catch (err) {
            console.log(err)
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
                <Link to={"/listcar"}>
                <h4 className="breadcrumb-text-1">List Car</h4>
                </Link>
                <img src={chevronRight} alt="" />
                <h5 className="breadcrumb-text-2">Add New Car</h5>
            </div>
            <div>
                <h2 className="car-sub-title">Add New Car</h2>
            <div className="addcar-input-container">
                <div className="addcar-input-form">
                    {/* <Form.Group as={Row} className="mb-3" controlId="formName">
                        <Form.Label column sm="2" className="custom-label">Nama/Tipe Mobil<span className="asterisk">*</span></Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Input Nama/Tipe Mobil" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPrice">
                        <Form.Label column sm="2" >Harga<span className="asterisk">*</span></Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Input Harga Sewa Mobil" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formImage">
                        <Form.Label column sm="2">Kategori<span className="asterisk">*</span></Form.Label>
                        <Col sm="10">
                            <Form.Control type="file" placeholder="Upload Foto Mobil" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formImage">
                        <Form.Label column sm="2">Kategori<span className="asterisk">*</span></Form.Label>
                        <Col sm="10">
                        <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        </Col>
                    </Form.Group> */}
                    <div className="addcar-input-form-1">
                        <p>Nama<span className="asterisk">*</span></p>
                        <input onChange={handleChange} name="name" type="text" />
                    </div>
                    <div className="addcar-input-form-1">
                        <p>Harga<span className="asterisk">*</span></p>
                        <input onChange={handleChange} name="price" type="text" />
                    </div>
                    <div className="addcar-input-form-1">
                        <p>Foto<span className="asterisk">*</span></p>
                        <div>
                            <input onChange={handleChange} name="image" type="file" id="input-with-upload-image" />
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
                <button className="button-cancel">Cancel</button>
                <button className="button-save" onClick={handleSubmit}>Save</button>
            </div>
            </div>
        </div>
    )
}

export default CreateNewCar