import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },

        phoneNumber: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },

        date: { type: String, required: true, trim: true },
        time: { type: String, required: true, trim: true },
    },
    { timestamps: true }
);

const Reservation = mongoose.model("Reservation", ReservationSchema);

export default Reservation;