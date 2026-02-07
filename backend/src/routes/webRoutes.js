import express from "express";
import { handleReservation } from "../controllers/webController.js";

const router = express.Router();

const webRoutes = (app) => {
    router.post("/reservations", handleReservation);

    return app.use("/api", router);
}

export default webRoutes;