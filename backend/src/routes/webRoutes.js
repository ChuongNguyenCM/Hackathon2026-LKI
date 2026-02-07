import express from "express";
import { handleReservation, getDisease, getHome, askDiseaseAI } from "../controllers/webController.js";

const router = express.Router();

const webRoutes = (app) => {
    router.post("/reservations", handleReservation);
    router.get("/diseases", getDisease);
    router.get("/home", getHome);
    router.post("/ai/disease-suggest", askDiseaseAI);

    return app.use("/api", router);
}

export default webRoutes;