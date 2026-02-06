import Reservation from "../models/Reservation.js";

function validateReservation(body) {
    const errors = {};
    const nameRegex = /^[A-Za-z\s]+$/;

    const firstName = (body.firstName ?? "").trim();
    const lastName = (body.lastName ?? "").trim();
    const phoneNumber = (body.phoneNumber ?? "").trim();
    const email = (body.email ?? "").trim();
    const date = (body.date ?? "").trim();
    const time = (body.time ?? "").trim();

    // First/Last name
    if (!firstName) errors.firstName = "First name is required";
    else if (!nameRegex.test(firstName)) errors.firstName = "Only letters and spaces";

    if (!lastName) errors.lastName = "Last name is required";
    else if (!nameRegex.test(lastName)) errors.lastName = "Only letters and spaces";

    // Phone
    if (!phoneNumber) errors.phoneNumber = "Phone number is required";
    // optional: phone basic check
    else if (!/^[0-9+\-\s()]{7,20}$/.test(phoneNumber)) {
        errors.phoneNumber = "Phone number is invalid";
    }

    // Email
    if (!email) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Email is invalid";
    }

    // Date / Time
    if (!date) errors.date = "Please choose a date";
    if (!time) errors.time = "Please choose a time";

    return errors;
}

const handleReservation = async (req, res) => {
    try {
        const errors = validateReservation(req.body);
        if (Object.keys(errors).length) {
            return res.status(400).json({ EC: 1, EM: "Validation error", DT: errors });
        }

        const doc = await Reservation.create({
            firstName: req.body.firstName.trim(),
            lastName: req.body.lastName.trim(),
            phoneNumber: req.body.phoneNumber.trim(),
            email: req.body.email.trim().toLowerCase(),
            date: req.body.date,
            time: req.body.time,
        });

        return res.status(201).json({ EC: 0, EM: "Created", DT: doc });
    } catch (err) {
        console.error("createReservation error:", err);
        return res.status(500).json({ EC: -1, EM: "Server error", DT: null });
    }
};

export { handleReservation };