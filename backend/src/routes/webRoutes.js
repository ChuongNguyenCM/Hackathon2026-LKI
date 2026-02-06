import express from "express";

const router = express.Router();

const webRoutes = (app) => {

    return app.use("/api", router);
}

export default webRoutes;