import { useMemo, useState } from "react";
import Button from "../../components/ui/Button";
import Field from "./Field";
import Input from "./Input";
import Select from "./Select";
import { toast } from "react-toastify";

const initialForm = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    date: "",
    time: "",
};

function validate(values) {
    const e = {};

    const firstName = (values.firstName ?? "").trim();
    const lastName = (values.lastName ?? "").trim();
    const phoneNumber = (values.phoneNumber ?? "").trim();
    const email = (values.email ?? "").trim();

    if (!firstName) e.firstName = "First name is required";
    if (!lastName) e.lastName = "Last name is required";
    if (!phoneNumber) e.phoneNumber = "Phone number is required";
    if (!email) e.email = "Email is required";

    return e;
}

export default function ReservationForm() {
    const [form, setForm] = useState(initialForm);
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});

    const liveErrors = useMemo(() => validate(form), [form]);

    const update = (key) => (e) => {
        const value = e.target.value;
        setForm((prev) => ({ ...prev, [key]: value }));

        if (touched[key]) {
            const nextErrors = validate({ ...form, [key]: value });
            setErrors((prev) => ({ ...prev, [key]: nextErrors[key] }));
        }
    };

    const markTouched = (key) => () => {
        setTouched((t) => ({ ...t, [key]: true }));
        setErrors((prev) => ({ ...prev, [key]: liveErrors[key] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const eObj = validate(form);
        setErrors(eObj);

        setTouched({
            firstName: true,
            lastName: true,
            phoneNumber: true,
            email: true,
            date: true,
            time: true,
        });

        if (Object.keys(eObj).length > 0) return;

        try {
            toast?.success?.("Reservation created!");
            setForm(initialForm);
            setTouched({});
            setErrors({});
        } catch (err) {
            console.log(err);
            toast?.error?.(err?.response?.data?.message || "Create reservation failed");
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="grid w-full grid-cols-2 gap-5 py-4">
                <Field label="First Name" required error={touched.firstName ? errors.firstName : ""}>
                    <Input
                        value={form.firstName}
                        onChange={update("firstName")}
                        onBlur={markTouched("firstName")}
                        invalid={touched.firstName && Boolean(errors.firstName)}
                        placeholder="First Name"
                        autoComplete="given-name"
                    />
                </Field>

                <Field label="Last Name" required error={touched.lastName ? errors.lastName : ""}>
                    <Input
                        value={form.lastName}
                        onChange={update("lastName")}
                        onBlur={markTouched("lastName")}
                        invalid={touched.lastName && Boolean(errors.lastName)}
                        placeholder="Last Name"
                        autoComplete="family-name"
                    />
                </Field>
            </div>

            {/* Phone + Email */}
            <div className="grid w-full grid-cols-2 gap-5 py-4">
                <Field label="Phone Number" required error={touched.phoneNumber ? errors.phoneNumber : ""}>
                    <Input
                        value={form.phoneNumber}
                        onChange={update("phoneNumber")}
                        onBlur={markTouched("phoneNumber")}
                        invalid={touched.phoneNumber && Boolean(errors.phoneNumber)}
                        placeholder="Phone Number"
                        autoComplete="tel"
                    />
                </Field>

                <Field label="Email" required error={touched.email ? errors.email : ""}>
                    <Input
                        type="email"
                        value={form.email}
                        onChange={update("email")}
                        onBlur={markTouched("email")}
                        invalid={touched.email && Boolean(errors.email)}
                        placeholder="Email"
                        autoComplete="email"
                    />
                </Field>
            </div>

            <div className="space-y-6">
                <Field label="Choose Date" required error={touched.date ? errors.date : ""}>
                    <Input
                        type="date"
                        value={form.date}
                        onChange={update("date")}
                        onBlur={markTouched("date")}
                        invalid={touched.date && Boolean(errors.date)}
                    />
                </Field>

                <Field label="Choose Time" required error={touched.time ? errors.time : ""}>
                    <Select
                        value={form.time}
                        onChange={update("time")}
                        onBlur={markTouched("time")}
                        invalid={touched.time && Boolean(errors.time)}
                    >
                        <option value="" disabled hidden>
                            Select time
                        </option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                        <option value="19:00">19:00</option>
                        <option value="20:00">20:00</option>
                    </Select>
                </Field>

                <div className="mt-10 flex justify-center">
                    <Button type="submit">Create Reservation</Button>
                </div>
            </div>
        </form>
    );
}