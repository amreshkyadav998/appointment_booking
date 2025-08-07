## 📘 Appointment Booking Application

A **full-stack appointment booking system** with authentication, role-based access, and booking features. Patients can book and manage appointments, while admins can view all bookings.

Demo Video Link : https://drive.google.com/file/d/1bRKSXXRyXkNvcGtZbhmRYZqGslMz_mWW/view?usp=drive_link
---

## 🚀 Overview

* **Frontend:** React (Vite), Tailwind CSS
* **Backend:** Node.js, Express, Prisma
* **Database:** PostgreSQL (Neon)
* **Deployment:** Vercel (frontend), Render (backend)

---

## ✅ Status

| Layer    | Status                                                                     |
| -------- | -------------------------------------------------------------------------- |
| Backend  | ✅ Fully working — Auth, slots, bookings, admin panel (`/api/all-bookings`) |
| Frontend | ⚠️ Functional for patients; minor admin page issue (redirect/display bug)  |
| Database | ✅ Neon Postgres integrated & operational                                   |

---

## 🧱 Tech Stack

| Layer      | Tech Used                                                        |
| ---------- | ---------------------------------------------------------------- |
| Frontend   | React (Vite), Tailwind CSS, React Router, Axios, react-hot-toast |
| Backend    | Node.js, Express, Prisma, JWT, bcrypt                            |
| Database   | Neon PostgreSQL                                                  |
| Deployment | Vercel (frontend), Render (backend), Neon (DB)                   |

---

## ⚖️ Trade-offs

* **Vite**: Fast dev/build times, but smaller ecosystem than CRA.
* **Prisma**: Great type safety and ease of use. Raw SQL may be needed for advanced queries.
* **Neon**: Serverless Postgres (free), but may experience cold starts — mitigated with `connect_timeout=10`.

---

## 🛠️ Setup Instructions

### ⚙️ Prerequisites

* Node.js `v20.16.0` or later
* Neon (PostgreSQL) account
* Git, `npm`, `psql`

---

## 🧪 Backend Setup

```bash
git clone https://github.com/amreshkyadav998/appointment_booking.git
cd appointment_booking/backend
npm install
```

### 🔐 Create `.env` in `/backend`

```env
DATABASE_URL=postgresql://<your-neon-connection>
JWT_SECRET=<your-secret>
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### 🔧 Prisma Setup

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### ▶️ Start Backend

```bash
npm start
```

---

## 💻 Frontend Setup

```bash
git clone https://github.com/amreshkyadav998/appointment_booking.git
cd appointment_booking/frontend
npm install
```

### 🧪 Create `.env` in `/frontend`

```env
VITE_API_URL=http://localhost:3001
```

### ▶️ Start Frontend

```bash
npm run dev
```

Open in browser: [http://localhost:5173](http://localhost:5173)

---

## 🗄️ Database Setup

* Sign up at [neon.tech](https://neon.tech)
* Create a project → copy the **pooled connection string**
* Add `?connect_timeout=10` to handle cold starts
* Apply Prisma migrations (see backend setup)

---

## ☁️ Deployment

### 📦 Frontend (Vercel)

1. Push frontend repo to GitHub
2. Create project in Vercel and link the repo
3. Add environment variable:

```env
VITE_API_URL=<your-backend-render-url>
```

4. Deploy using:

```bash
npm run build
```

---

### 🖥️ Backend (Render)

1. Push backend repo to GitHub
2. Create a web service in Render and link the repo
3. Set environment variables:

```env
DATABASE_URL=<your-neon-url>
JWT_SECRET=<your-secret>
PORT=3001
FRONTEND_URL=<your-vercel-url>
```

4. Set **Start Command**:

```bash
npm start
```

5. Deploy migrations:

```bash
npx prisma migrate deploy
```

---

## 🔐 Credentials

| Role    | Email                 | Password    |
| ------- | --------------------- | ----------- |
| Admin   | `admin@example.com`   | `Password!` |
| Patient | `patient@example.com` | `Password!` |

---

## 🔌 API Testing (Postman)

### Register

```bash
curl -X POST <api-url>/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"Test User","email":"patient@example.com","password":"Password!","role":"patient"}'
```

### Login

```bash
curl -X POST <api-url>/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"patient@example.com","password":"Password!"}'
```

### Get Slots

```bash
curl -X GET <api-url>/api/slots \
-H "Authorization: Bearer <token>"
```

### Book Slot

```bash
curl -X POST <api-url>/api/bookings \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{"slotId": 1}'
```

### View My Bookings

```bash
curl -X GET <api-url>/api/bookings \
-H "Authorization: Bearer <token>"
```

### Admin: All Bookings

```bash
curl -X GET <api-url>/api/all-bookings \
-H "Authorization: Bearer <token>"
```

---

## 🧠 Architecture Notes

### Backend

* Clean structure: `controllers/`, `routes/`, `middleware/`, `utils/`
* JWT-based authentication with RBAC
* Unique slot constraints to avoid double booking
* `/api/all-bookings` for admin

### Frontend

* React Router + Context for global auth
* Tailwind for styling
* Admin panel at `/admin` (minor display bug noted)

### Database (Neon)

* Tables: `User`, `Slot`, `Booking`
* Slots auto-generated for 7 days (9 AM–5 PM UTC, 30 min intervals)

---

## ⚠️ Known Issues

* ⚠️ **Admin Page:** Minor redirect/display bug — sometimes redirects to login even if authenticated.
* ❌ No unit/integration tests
* ❌ No rate limiting yet

---

## 🛠️ Future Improvements

* ✅ Fix admin display/redirect issues in frontend
* 🔍 Add unit tests (Jest) for backend
* 🚨 Add rate limiting (e.g., `express-rate-limit`)
* 🎨 Improve UI with animations and better error handling

---

## 🧾 Submission Details

| Item            | Link                                                |
| --------------- | ----------------------------------------------------|
| Frontend URL    |`https://appointment-booking-l3da.vercel.app/        |
| Backend API URL | https://appointment-booking-etkc.onrender.com/      |
