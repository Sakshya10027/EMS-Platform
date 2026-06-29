<div align="center">

# Employee Management System (EMS)

Streamline your workforce operations, track attendance, manage payroll, and empower your team securely.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)

[Live Demo](#) · [Documentation](#) · [Report Bug](https://github.com/yourusername/ems-platform/issues) · [Request Feature](https://github.com/yourusername/ems-platform/issues)

</div>

## Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Testing](#testing)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact / Acknowledgments](#contact--acknowledgments)

---

## About the Project

Managing a growing workforce often results in chaotic spreadsheets, missed attendance logs, and manual payroll errors. The Employee Management System (EMS) solves this by centralizing HR operations into a single, automated platform. 

By providing distinct and secure portals for administrators and employees, EMS ensures everyone has exactly the access they need. Admins can effortlessly generate payslips and approve leaves, while employees can track their own attendance and update their profiles in real-time. It's designed for small-to-medium businesses looking to professionalize their internal operations without heavy enterprise software costs.

![Demo](./assets/demo.gif)

## Features

- 🔐 **Role-Based Access Control:** Dedicated, secure portals for both Admins and Employees with restricted data boundaries.
- ⏱️ **Automated Attendance Tracking:** One-click check-ins and check-outs with dynamic UI updates and daily logging.
- 🏖️ **Leave Management System:** Streamlined employee leave requests with an intuitive admin approval/rejection workflow.
- 💵 **Dynamic Payslip Generation:** Instantly calculate net salaries and generate organized, downloadable payslips.
- 🤖 **Background Cron Jobs:** Automated reminders and attendance checks powered by Inngest.
- 🎨 **Modern, Responsive UI:** A premium, intuitive interface built with React and Tailwind CSS.

## Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) | Fast, modern UI component rendering |
| **Frontend** | Tailwind CSS | Utility-first styling for a responsive, clean design |
| **Backend** | Node.js / Express | Robust, scalable RESTful API handling |
| **Database** | MongoDB & Mongoose | Flexible NoSQL document storage and schema modeling |
| **DevOps/Tools**| Inngest | Reliable background jobs and scheduled cron tasks |
| **Security** | JWT & bcrypt | Secure, stateless authentication and password hashing |

## Getting Started

Follow these steps to get a local copy up and running in under 5 minutes.

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** or **yarn**
- **MongoDB** (Local instance or Atlas URI)

### Installation

1. **Clone the repo**
```bash
git clone https://github.com/Sakshya10027/ems-platform.git
cd ems-platform
```

2. **Backend Setup**
```bash
cd server
npm install
```

3. **Frontend Setup**
```bash
cd ../Client
npm install
```

### Environment Variables

You will need to create a `.env` file in both the `server/` and `Client/` directories. 

<details>
<summary><b>Server <code>/server/.env</code></b></summary>

```env
# MongoDB Connection String (Local or Atlas)
MONGODB_URI=mongodb://localhost:27017/ems

# JSON Web Token Secret for Authentication
JWT_SECRET=your_super_secret_jwt_key

# Port for the Express server to run on
PORT=4000

# Admin email for initial database seeding
ADMIN_EMAIL=admin@example.com
```
</details>

<details>
<summary><b>Client <code>/Client/.env</code></b></summary>

```env
# URL for the backend API
VITE_BASE_URL=http://localhost:4000
```
</details>

### Running the App

To run the application locally, you will need two separate terminal windows.

**Terminal 1: Run the Backend Server**
```bash
cd server
npm run server
```

**Terminal 2: Run the Frontend Client**
```bash
cd Client
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:4000`.

## Project Structure

<details>
<summary><b>Click to view folder tree</b></summary>

```bash
ems-platform/
├── Client/                 # React Frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── api/            # Axios interceptors and configurations
│   │   ├── components/     # Reusable UI components (Modals, Forms)
│   │   ├── context/        # React Context (AuthContext)
│   │   ├── pages/          # Full page views (Dashboard, Settings)
│   │   ├── App.jsx         # Main router and layout wrapper
│   │   └── main.jsx        # React entry point
│   └── package.json
│
└── server/                 # Node.js/Express Backend
    ├── controllers/        # Route logic (auth, employee, payslip)
    ├── inngest/            # Background jobs and cron tasks
    ├── middleware/         # Custom middlewares (protect, protectAdmin)
    ├── models/             # Mongoose schemas (User, Employee, Attendance)
    ├── routes/             # Express API routers
    ├── server.js           # Express app setup and entry point
    └── package.json
```
</details>

## API Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticates user and returns JWT | No |
| `GET` | `/api/employees` | Fetches all active employees | Yes (Admin) |
| `POST` | `/api/payslips` | Generates a new payslip | Yes (Admin) |
| `PUT` | `/api/profile` | Updates the authenticated user's profile | Yes |

**Example Request: `POST /api/auth/login`**
```json
{
  "email": "admin@example.com",
  "password": "admin123",
  "role_type": "admin"
}
```

**Example Response: `200 OK`**
```json
{
  "user": {
    "userId": "64abcdef1234567890",
    "role": "ADMIN",
    "email": "admin@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

## Testing

*Currently, the project uses manual testing. Automated testing setup is planned for a future release.*

To add your own tests, you can set up Jest or Vitest:
```bash
npm test
```

## Deployment

- **Frontend:** Recommended to deploy on [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). Ensure you set the `VITE_BASE_URL` environment variable to your deployed backend URL.
- **Backend:** Recommended to deploy on [Render](https://render.com/) or [Railway](https://railway.app/). Ensure your `MONGODB_URI` points to a production database (like MongoDB Atlas) and `JWT_SECRET` is secured.

## Roadmap

- [ ] Implement automated testing (Unit and E2E)
- [ ] Add CSV export functionality for Attendance and Payslips
- [ ] Build an analytics dashboard with charts for HR metrics
- [ ] Integrate a third-party email provider (e.g., Resend) for real email notifications
- [ ] Implement mobile-responsive improvements for the employee portal

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact / Acknowledgments

- **Your Name** - [patelsakshya2@gmail.com](mailto:your.email@example.com)
- **LinkedIn:** [https://www.linkedin.com/in/sakshya-patel-20751232a/](https://linkedin.com/in/yourprofile)
- **Portfolio:** [https://animated-portfolio-tau-nine.vercel.app/](https://yourportfolio.com)

**Acknowledgments:**
- UI Icons by [Lucide React](https://lucide.dev/)
- Toast Notifications by [React Hot Toast](https://react-hot-toast.com/)
- Background tasks powered by [Inngest](https://www.inngest.com/)
