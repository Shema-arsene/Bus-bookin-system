import React, { useState } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section className="py-10 sm:px-8 md:px-16" id="contact">
      <div className="relative h-48 flex items-center justify-center">
        <img
          src="https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg"
          alt="Contact image"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />

        <div className="absolute inset-0 bg-black/40 -z-10" />

        <h2 className="text-3xl text-center font-bold text-white mb-6">
          Contact Us
        </h2>
      </div>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row">
        <aside className="flex-1 p-5">
          <h3 className="text-2xl font-medium">Contact Info:</h3>

          <p className="text-gray-700 my-7">
            Have a question or feedback? Reach out and we’ll respond as soon as
            possible.
          </p>

          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-sky-400 mt-0.5" />
              <span className="text-black">KG 11 Ave</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-sky-400" />
              <p className="text-black">
                <span className="whitespace-nowrap">+250 (788) 435 959</span> /{" "}
                <span className="whitespace-nowrap">+250 (788) 857 892</span>
              </p>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-sky-400" />
              <span className="text-black">support@nkubitobusiness.com</span>
            </li>
          </ul>

          <h3 className="text-2xl font-medium mt-10">Follow Us:</h3>

          <div className="flex space-x-4 py-5">
            <a href="#" className="text-sky-400 transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-sky-400 transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-sky-400 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-sky-400 transition-colors">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </aside>

        <aside className="flex-1 p-5">
          <h3 className="text-2xl font-medium mb-7">Contact Form:</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-gray-50 w-full border-2 border-gray-500 rounded-lg p-3 focus:border-none focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-gray-50 w-full border-2 border-gray-500 rounded-lg p-3 focus:border-none focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
            <textarea
              name="message"
              rows={5}
              placeholder="Message..."
              value={formData.message}
              onChange={handleChange}
              required
              className="bg-gray-50 w-full border-2 border-gray-500 rounded-lg p-3 focus:border-none focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <button
              type="submit"
              className="bg-black hover:bg-transparent text-white hover:text-sky-400 border-2 border-black hover:border-sky-400 font-semibold 
                        py-2 px-3 rounded-lg transition-colors duration-300 cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </aside>
      </div>
    </section>
  )
}

export default Contact
