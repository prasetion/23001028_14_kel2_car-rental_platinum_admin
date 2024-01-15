import React, { useState } from "react";
import "./styles.css"
import Form from 'react-bootstrap/Form';
import chevronRight from "../../assets/chevron-right.svg"
import { Col, Row, Button } from "react-bootstrap";
import axios from "axios";

const CreateNewCar = () => {

    const [form, setForm] = useState ({
        name: "",
        category: "",
        price: "",
        image: "",
    })

    // const handleChange = () => {

    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     const token = localStorage.getItem("accessToken")
    //     const config = {
    //         headers: {
    //             Authorization: `${token}`
    //         }
    //     }

    //     try {
            
    //     }

    // }

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
                <h4 className="breadcrumb-text-1">List Car</h4>
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
                        <input type="text" />
                    </div>
                    <div className="addcar-input-form-1">
                        <p>Harga<span className="asterisk">*</span></p>
                        <input type="text" />
                    </div>
                    <div className="addcar-input-form-1">
                        <p>Foto<span className="asterisk">*</span></p>
                        <div>
                            <input type="file" id="input-with-upload-image" />
                            <p id="requirement-text-image">File size max. 2MB</p>
                        </div>
                    </div>
                    <div className="addcar-input-form-1">
                        <p>Kategori<span className="asterisk">*</span></p>
                        <select name="" id="select-cars">
                            <option value="">1 mobil</option>
                            <option value="">2 mobil</option>
                            <option value="">3 mobil</option>
                            <option value="">4   mobil</option>

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
                <button className="button-save">Save</button>
            </div>
            </div>
        </div>
    )
}

export default CreateNewCar