import React from "react"
import { Link } from "react-router-dom"
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  BusFront,
} from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 text-red-600 mb-4">
              <BusFront className="h-12 w-12 text-sky-400" />
            </div>

            <p className="text-gray-300 mb-4">
              Your one-stop platform for booking reliable and comfortable bus
              rides across Rwanda and beyond.
              <br />
              We connect you to the best routes at affordable prices, anytime,
              anywhere.
            </p>

            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-sky-400 transition-colors"
              >
                <Instagram className="h-7 w-7" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-sky-400 transition-colors"
              >
                <Facebook className="h-7 w-7" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-sky-400 transition-colors"
              >
                <Twitter className="h-7 w-7" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-sky-400 transition-colors"
              >
                <Youtube className="h-7 w-7" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-sky-400 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "About Us", to: "/about" },
                { label: "FAQ", to: "/faq" },
                { label: "Booking", to: "/booking" },
                { label: "Contact Us", to: "/contact" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-gray-400 hover:text-sky-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-sky-400 mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2">
              {[
                "Contact Us",
                "FAQs",
                "Shipping Policy",
                "Return Policy",
                "Privacy Policy",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-sky-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-sky-400 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-sky-400 mt-0.5" />
                <span className="text-gray-300">KG 11 Ave</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-sky-400" />
                <p className="text-gray-300">
                  <span className="whitespace-nowrap">+250 (780) 123 456</span>
                </p>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-sky-400" />
                <span className="text-gray-300">support@ticketbus.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Nkubito Business Development.
              All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-4 text-sm">
                {["Terms of Service", "Privacy Policy", "Sitemap"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-[#c2a756] transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
