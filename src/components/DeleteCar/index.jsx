import axios from "axios";
import { useState } from "react";

const DeleteCar = () => {
    const [car, setCar] = useState([])

    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.delete(`https://api-car-rental.binaracademy.org/admin/car/${id}`)
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    return ( 
        <div>
            <h1>Delete Car</h1>
            <button onClick={handleDelete(item.id)}></button>
        </div>
     );
}
 
export default DeleteCar;