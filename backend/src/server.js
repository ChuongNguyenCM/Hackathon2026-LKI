import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import webRoutes from "./routes/webRoutes.js";
import { connectDB } from "./config/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

webRoutes(app);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Run success at " + PORT);
    })
});
