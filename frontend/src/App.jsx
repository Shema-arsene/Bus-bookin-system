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

// Admin Routes
import AdminRoute from "./components/AdminRoute"
import AdminLayout from "./Layouts/AdminLayout"
import AdminDashboardPage from "./Pages/Admin/AdminDashboardPage"
import AdminBusesPage from "./Pages/Admin/AdminBusesPage"
import AdminAddJourneyFormPage from "./Pages/Admin/AdminAddJourneyFormPage"
import AdminEditJourneyFormPage from "./Pages/Admin/AdminEditJourneyFormPage"
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <Router>
      <AuthProvider>
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
            {/* <Route element={<RequireAuth />}>
            <Route path="/agency-form" element={<AgencyForm />} />
          </Route> */}
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="buses" element={<AdminBusesPage />} />
              <Route path="buses/new" element={<AdminAddJourneyFormPage />} />
              <Route
                path="buses/edit/:id"
                element={<AdminEditJourneyFormPage />}
              />
            </Route>
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
