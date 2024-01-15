import axios from "axios";
import React, { useEffect } from "react";

const ListCar = () => {


    useEffect(() => {
        getCarList()
    }, [])

    const getCarList = async () => {
        try {

            const token = localStorage.getItem("accessToken")

            const config = {
                headers: {
                  access_token: `${token}`,
                },
              };

            const res = await axios.get("https://api-car-rental.binaracademy.org/admin/v2/car?page=1&pageSize=10", config)
            console.log(res.data)
        } catch (err) {
            console.log(err)    
        }
    }

    return(
        <div>
            <h1>LIST CAR</h1>
        </div>
    )
}

export default ListCar