import React from "react"
import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <section className="relative h-screen max-h-[450px] flex flex-col items-start px-10 justify-center text-center">
      <img
        src="https://images.pexels.com/photos/7245323/pexels-photo-7245323.jpeg"
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <div className="absolute inset-0 bg-black/60 -z-10" />

      <div className="max-w-2xl flex flex-col items-start">
        <h2 className="text-3xl font-bold text-white mb-6">
          Welcome to TicketBus
        </h2>

        <p className="text-lg my-6 text-white">
          Your one-stop solution for all your bus ticketing needs.
        </p>

        <p className="text-lg text-left text-white">
          Book your bus tickets with Ticket Bus for a safe and comfortable
          journey to your destinations.Your one-stop solution for all your bus
          ticketing needs.
        </p>

        <button className="my-8">
          <Link
            to="/booking"
            className="bg-sky-400 text-white py-2 px-4 rounded border-2 border-sky-400 font-medium hover:bg-transparent 
          hover:text-sky-400 transition-colors duration-300"
          >
            Book Now
          </Link>
        </button>
      </div>
    </section>
  )
}

export default Hero
