import express from "express";
import { handleReservation, getDisease } from "../controllers/webController.js";

const router = express.Router();

const webRoutes = (app) => {
    router.post("/reservations", handleReservation);
    router.get("/diseases", getDisease);

    return app.use("/api", router);
}

export default webRoutes;