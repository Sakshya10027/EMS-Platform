import { Toaster } from "react-hot-toast"
import { Routes, Route, Navigate } from "react-router-dom"
import LoginLanding from "./pages/LoginLanding.jsx"
import Layout from "./pages/Layout.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Employees from "./pages/Employees.jsx"
import Attendence from "./pages/Attendence.jsx"
import Leave from "./pages/Leave.jsx"
import Payslips from "./pages/Payslips.jsx"
import Settings from "./pages/Settings.jsx"
import PrintPaySlip from "./pages/PrintPaySlip.jsx"
import Loginform from "./components/Loginform.jsx"

export const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<LoginLanding />} />
        <Route path="/login/admin" element={<Loginform role="admin" title="Admin Portal" subtitle="Sign in to manage the organization" />} />
        <Route path="/login/employee" element={<Loginform role="employee" title="Employee Portal" subtitle="Sign in to access ypur account" />} />




        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/attendence" element={<Attendence />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/payslips" element={<Payslips />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/print/payslips/:id" element={<PrintPaySlip />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  )
}

export default App
