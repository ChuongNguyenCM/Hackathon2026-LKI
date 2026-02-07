import axios from "../config/axios"

const createReservation = (data) => {
    return axios.post("/api/reservations", data);
};

const getDisease = () => {
    return axios.get("/api/diseases");
};

export {
    createReservation,
    getDisease
}