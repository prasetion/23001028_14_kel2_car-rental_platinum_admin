import React from "react";
import "./styles.css"
import chevronRight from "../../assets/chevron-right.svg"

const EditCarList = () => {
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
        </div>
    )
}

export default EditCarList