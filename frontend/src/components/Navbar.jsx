import React, { useEffect, useRef, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
  const { isAuthenticated, user } = useAuth()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const userMenuRef = useRef(null)

  // Open and close userMenu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  return (
    <header className="flex items-center justify-between py-4 px-10 bg-white border-b border-gray-300 text-black">
      <img src="./public/logo.jpg" alt="Logo" className="h-12" />
      <nav>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/faq", label: "FAQs" },
            { to: "/booking", label: "Booking" },
            { to: "/contact", label: "Contact Us" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `group relative text-base font-semibold transition-colors duration-300 ${
                  isActive ? "text-sky-400" : "text-gray-600 hover:text-sky-400"
                }`
              }
            >
              {({ isActive }) => (
                <span
                  className={`relative before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:bg-sky-400 before:transition-all before:duration-300 ${
                    isActive
                      ? "before:w-full"
                      : "before:w-0 group-hover:before:w-full"
                  }`}
                >
                  {label}
                </span>
              )}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <>
              <div
                className="relative flex items-center justify-center cursor-pointer mx-10"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                ref={userMenuRef}
              >
                <User />
                <button
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <span
                    className="text-sm font-medium uppercase"
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  >
                    {user?.fullName}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute top-10 -right-4 mt-2 w-48 bg-white rounded-md shadow-xl z-10 overflow-hidden">
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </NavLink>
                    {user?.role === "admin" && (
                      <NavLink
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Admin Dashboard
                      </NavLink>
                    )}
                    <button
                      onClick={() => {
                        logout()
                        setIsUserMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white bg-sky-400 hover:bg-sky-800 font-semibold px-4 py-2 rounded-md transition-colors duration-300"
              >
                Login
              </Link>
            </>
          )}
          {/* <Link
            to="/login"
            className="text-white bg-sky-400 hover:bg-sky-800 font-semibold px-4 py-2 rounded-md transition-colors duration-300"
          >
            Login
          </Link> */}
        </div>

        {/* Toggle Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-black hover:text-sky-400 cursor-pointer transition-colors duration-500"
        >
          {isMenuOpen ? (
            <X className="h-8 w-8 font-bold" />
          ) : (
            <Menu className="h-8 w-8 font-bold" />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? "translate-x-0" : "translate-x-[99%]"
          } overflow-auto fixed h-full top-0 right-0 z-20 bg-gray-100 shadow-2xl pt-20 pb-4 px-4 w-full max-w-[350px] duration-1000`}
        >
          <X
            onClick={toggleMenu}
            className="absolute -top-5 right-4 text-black hover:text-sky-400 h-10 w-10 font-bold my-10 cursor-pointer duration-500"
          />
          <div className="flex flex-col space-y-4">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/faq", label: "FAQs" },
              { to: "/booking", label: "Booking" },
              { to: "/contact", label: "Contact Us" },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `group relative text-base font-semibold transition-colors duration-300 ${
                    isActive
                      ? "text-sky-400"
                      : "text-gray-600 hover:text-sky-400"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {({ isActive }) => (
                  <span
                    className={`relative before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:bg-sky-400 before:transition-all before:duration-300 ${
                      isActive
                        ? "before:w-full"
                        : "before:w-0 group-hover:before:w-full"
                    }`}
                  >
                    {label}
                  </span>
                )}
              </NavLink>
            ))}

            <Link
              to="/login"
              className="text-white text-center bg-sky-400 hover:bg-sky-800 font-semibold px-4 py-2 rounded-md transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
