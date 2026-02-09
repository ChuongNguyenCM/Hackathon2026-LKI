# Hackathon2026-LKI

A full-stack web app for eye-related health information: browse conditions, get AI-powered symptom suggestions, and make reservations.

## About us

We are a team of passionate CS and CE students from Wright State University who love turning ideas into real products. We enjoy tackling challenging problems, experimenting with new technologies, and learning from both success and failure. More than just writing code, we value teamwork, creativity, and the ability to build solutions that matter to real people. This hackathon is not just a competition for us — it’s an opportunity to grow, collaborate, and push our technical boundaries together.

- **Phong Xuan Thanh Nguyen**:
  - Contact: nguyen.345@wright.edu
  - Role: Team Lead
- **Gia Huy Tran**:
  - Contact: tran.124@wright.edu
  - Role: Designer
- **Hoang Chuong Nguyen**:
  - Contact: nguyen.328@wright.edu
  - Role: Lead Full-Stack Engineer
- **Duy Bao Nguyen**:
  - Contact: nguyen.382@wright.edu
  - Role: Associate Full-Stack Engineer

## Features

- **Home** – Landing page with hero, about, and testimonials
- **Diseases** – List of eye conditions with thumbnails, urgency badges, and short descriptions; pagination
- **AI symptom suggest** – Describe symptoms in natural language; Gemini suggests matching diseases with match percentage and reasoning; red-flag warnings and disclaimer
- **Reservations** – Form to book (first name, last name, phone, email, date, time) with client and server validation

## Tech stack

| Layer    | Stack                                                                 |
| -------- | --------------------------------------------------------------------- |
| Frontend | React 19, Vite 7, Tailwind CSS 4, React Router, Axios, react-toastify |
| Backend  | Node.js, Express 5, Mongoose, Google Generative AI (Gemini)           |
| Database | MongoDB                                                               |

## Project structure

```
Hackathon2026-LKI/
├── frontend/          # React + Vite app (port 5173)
│   ├── src/
│   │   ├── app/       # App, layout, routes
│   │   ├── components/
│   │   ├── pages/     # Home, Disease, Reservation
│   │   ├── services/  # API calls
│   │   └── config/    # Axios instance
│   └── public/
└── backend/           # Express API (port 8080)
    └── src/
        ├── config/   # DB connection
        ├── controllers/
        ├── models/   # Disease, Reservation
        ├── routes/
        ├── services/  # Gemini AI
        └── server.js
```

## Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- [Google AI API key](https://aistudio.google.com/apikey) for Gemini

## Setup

### 1. Clone and install

```bash
cd Hackathon2026-LKI

# Backend
cd backend && npm install && cd ..

# Frontend
cd frontend && npm install && cd ..
```

### 2. Backend environment

In `backend/`, copy `.env.example` to `.env` and set:

| Variable             | Description                                                |
| -------------------- | ---------------------------------------------------------- |
| `PORT`               | Server port (default: `8080`)                              |
| `CORS_ORIGIN`        | Allowed frontend origin (default: `http://localhost:5173`) |
| `MONGODB_CONNECTION` | MongoDB connection string                                  |
| `GEMINI_API_KEY`     | Google AI (Gemini) API key                                 |
| `GEMINI_MODEL`       | Optional; e.g. `gemini-2.0-flash` (default used if unset)  |

### 3. Run

**Terminal 1 – backend**

```bash
cd backend
npm run dev
```

**Terminal 2 – frontend**

```bash
cd frontend
npm run dev
```

- Frontend: **http://localhost:5173**
- API: **http://localhost:8080**

## API overview

| Method | Path                      | Description                                                                               |
| ------ | ------------------------- | ----------------------------------------------------------------------------------------- |
| GET    | `/api/home`               | Home data                                                                                 |
| GET    | `/api/diseases`           | List all diseases                                                                         |
| POST   | `/api/ai/disease-suggest` | AI symptom matching; body: `{ text, topK? }`                                              |
| POST   | `/api/reservations`       | Create reservation; body: `firstName`, `lastName`, `phoneNumber`, `email`, `date`, `time` |

Responses use a common shape: `{ EC, EM, DT }` (error code, message, data).

## License

ISC
