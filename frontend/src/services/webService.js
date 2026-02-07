import axios from "../config/axios"




const createReservation = (data) => {
    return axios.post("/api/reservations", data);
};

export {

    createReservation,
}