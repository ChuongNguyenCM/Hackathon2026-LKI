import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION)
        console.log("Success data")
    } catch (error) {
        console.log("Error");
        process.exit(1);
    }
}