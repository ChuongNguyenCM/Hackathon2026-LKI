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

const askDiseaseAI = (text) => {
    return axios.post("/api/ai/disease-suggest", { text });
};

export {
    createReservation,
    getDisease,
    getHome,
    askDiseaseAI,
}