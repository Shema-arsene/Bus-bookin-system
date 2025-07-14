import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Homepage from "./Pages/Homepage"
import FAQ from "./Pages/FAQ"
import Booking from "./Pages/Booking"
import Contact from "./Pages/Contact"
import MainLayout from "./Layouts/MainLayout"
import AgencyRoutes from "./Pages/AgencyRoutes"

import RegisterPage from "./pages/Auth/RegisterPage"
import LoginPage from "./pages/Auth/LoginPage"
import NotFoundPage from "./pages/NotFoundPage"

import AgencyForm from "./Pages/Admin/AgencyForm"
import RequireAuth from "./components/RequireAuth" // Auth protection

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/agencies/:agencyId" element={<AgencyRoutes />} />
          <Route path="/booking" element={<Booking />} />

          {/* Auth Routes */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/agency-form" element={<AgencyForm />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
