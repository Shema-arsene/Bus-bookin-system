import React from "react"

const Newsletter = () => {
  return (
    <section className="relative  p-6 min-h-[300px] flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-10 overflow-hidden">
      <img
        src="https://images.pexels.com/photos/5453909/pexels-photo-5453909.jpeg"
        alt="Bus Ticket"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <div className="absolute inset-0 w-full h-full bg-black/60 -z-10" />

      {/* Left Content */}
      <aside className="text-gray-200 max-w-xl space-y-2">
        <h1 className="text-3xl font-bold">Book Your Bus Ticket</h1>
        <h3 className="text-xl font-semibold">Stay Updated!</h3>
        <p>
          Subscribe to our newsletter for the latest travel updates and offers.
        </p>
        <p>
          Call us at <strong>+250 (780) 123 456</strong>
        </p>
      </aside>

      {/* Right Form */}
      <aside className="w-full max-w-md">
        <form action="#" className="flex">
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="p-2 rounded-l-md flex-1 outline-none bg-gray-100 border border-gray-400"
            aria-label="Email address"
          />
          <button
            type="submit"
            className="bg-sky-400 hover:bg-sky-800 font-medium transition text-white p-2 rounded-r-md cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </aside>
    </section>
  )
}

export default Newsletter
