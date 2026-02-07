import axios from "../config/axios"

const createReservation = (data) => {
    return axios.post("/api/reservations", data);
};

const getDisease = () => {
    return axios.get("/api/diseases");
};

const getHome = async () => {
    return axios.get("/api/home");
}

export {
    createReservation,
    getDisease,
    getHome
}