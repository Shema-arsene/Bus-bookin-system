import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Homepage from "./Pages/Homepage"
// import About from "./Pages/About"
import FAQ from "./Pages/FAQ"
import Booking from "./Pages/Booking"
import Contact from "./Pages/Contact"
import MainLayout from "./Layouts/MainLayout"
import AgencyRoutes from "./Pages/AgencyRoutes"

// Public Pages
import RegisterPage from "./pages/Auth/RegisterPage"
import LoginPage from "./pages/Auth/LoginPage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/agencies/:agencyId" element={<AgencyRoutes />} />

          {/* Booking routes */}
          <Route path="/booking" element={<Booking />} />

          {/* Auth Routes */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          {/* Protected Routes */}

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
