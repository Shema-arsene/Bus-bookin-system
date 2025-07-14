import React, { useState } from "react"
import {
  Search,
  ArrowRight,
  Bus,
  Clock,
  MapPin,
  Users,
  Calendar,
  User,
  Phone,
  Mail,
  CreditCard,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const Booking = () => {
  const navigate = useNavigate()

  // State to manage the booking process
  const [currentStep, setCurrentStep] = useState("search")
  const [selectedBus, setSelectedBus] = useState(null)
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
  })

  const [filters, setFilters] = useState({
    agency: "",
    destination: "",
    priceRange: "",
  })

  const [bookingInfo, setBookingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    passengers: 1,
    seatPreference: "any",
  })

  // Mock bus data
  const buses = [
    {
      id: 1,
      agency: "RITCO Express",
      from: "Kigali",
      to: "Huye",
      departureTime: "06:00 AM",
      arrivalTime: "08:30 AM",
      duration: "2h 30m",
      price: 3000,
      availableSeats: 12,
      busType: "AC Luxury",
      amenities: ["Wi-Fi", "Charging Port", "Reclining Seats"],
    },
    {
      id: 2,
      agency: "Volcano Bus",
      from: "Kigali",
      to: "Musanze",
      departureTime: "09:00 AM",
      arrivalTime: "11:45 AM",
      duration: "2h 45m",
      price: 3500,
      availableSeats: 10,
      busType: "Standard AC",
      amenities: ["AC", "Comfortable Seats"],
    },
    {
      id: 3,
      agency: "KBS Transport",
      from: "Kigali",
      to: "Rubavu",
      departureTime: "07:30 AM",
      arrivalTime: "11:30 AM",
      duration: "4h 0m",
      price: 4500,
      availableSeats: 8,
      busType: "Luxury Coach",
      amenities: ["Wi-Fi", "Entertainment", "Toilet"],
    },
  ]

  const agencies = [...new Set(buses.map((bus) => bus.agency))]
  const destinations = [...new Set(buses.map((bus) => bus.to))]

  const filteredBuses = buses.filter((bus) => {
    const matchesAgency = !filters.agency || bus.agency === filters.agency
    const matchesDestination =
      !filters.destination || bus.to === filters.destination
    const matchesPrice =
      !filters.priceRange ||
      (filters.priceRange === "low" && bus.price < 4000) ||
      (filters.priceRange === "medium" &&
        bus.price >= 4000 &&
        bus.price < 7000) ||
      (filters.priceRange === "high" && bus.price >= 7000)

    return matchesAgency && matchesDestination && matchesPrice
  })

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentStep("results")
  }

  const handleBusSelect = (bus) => {
    setSelectedBus(bus)
    setCurrentStep("booking")
  }

  const handleBooking = (e) => {
    e.preventDefault()
    setCurrentStep("confirmation")
  }

  const [departure, setDeparture] = useState("")
  const [destination, setDestination] = useState("")

  const departureOptions = [
    { value: "", label: "All Departures" },
    { value: "kigali", label: "Kigali" },
    { value: "musanze", label: "Musanze" },
    { value: "kibuye", label: "Kibuye" },
  ]

  const destinationOptions = [
    { value: "", label: "All Destinations" },
    { value: "kigali", label: "Kigali" },
    { value: "musanze", label: "Musanze" },
    { value: "kibuye", label: "Kibuye" },
  ]

  // console.log("Search Params:", searchParams)

  const SearchForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden">
      {/* Background image overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            BUY TICKETS
          </h1>
          <p className="text-xl text-gray-300">Book your journey with ease</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* Departure */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  FROM
                </label>
                {/* <input
                  type="text"
                  value={searchParams.from}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, from: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-gray-50"
                  placeholder="Departure city"
                /> */}

                <select
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={departure}
                  onChange={(e) => {
                    setDeparture(e.target.value)
                    setSearchParams({ ...searchParams, from: e.target.value })
                  }}
                >
                  {departureOptions.map((from) => (
                    <option key={from.value} value={from.value}>
                      {from.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Destination */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  TO
                </label>
                {/* <input
                  type="text"
                  value={searchParams.to}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, to: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-gray-50"
                  placeholder="Destination city"
                /> */}

                <select
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value)
                    setSearchParams({
                      ...searchParams,
                      to: e.target.value,
                    })
                  }}
                >
                  {destinationOptions.map((to) => (
                    <option key={to.value} value={to.value}>
                      {to.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DATE
                </label>
                <input
                  type="date"
                  value={searchParams.date}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, date: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-gray-50"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  BUDGET
                </label>
                <select
                  value={searchParams.time}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, time: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-gray-50"
                >
                  <option value="rwf3000">Under RWF 5,000</option>
                  <option value="rwf6000">RWF 5,000 – RWF 10,000</option>
                  <option value="rwf10000">Above RWF 10,000</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center mb-8">
              <button
                onClick={handleSearch}
                className="flex gap-3 items-center bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-12 rounded-lg transition duration-300 
                          transform cursor-pointer shadow-lg"
              >
                SEARCH BUSES
                <Search className="inline mr-2 h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center text-white">
              <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Bus className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">RETURN TICKETS</h3>
              <p className="text-sm text-gray-300">Book round trips easily</p>
            </div>
            <div className="text-center text-white">
              <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">BUS DELAYS</h3>
              <p className="text-sm text-gray-300">Real-time updates</p>
            </div>
            <div className="text-center text-white">
              <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">DISCOUNTS</h3>
              <p className="text-sm text-gray-300">Special offers available</p>
            </div>
            <div className="text-center text-white">
              <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">DISABLED PASSENGERS</h3>
              <p className="text-sm text-gray-300">Accessible travel options</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const BusResults = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => setCurrentStep("search")}
            className="text-blue-600 hover:text-blue-900 mb-4 flex items-center gap-2 cursor-pointer"
          >
            <span className="font-medium text-3xl">←</span> Back to Search
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Available Buses
          </h1>
          <p className="text-gray-600">
            From {searchParams.from} to {searchParams.to}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Filter Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Agency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agency
              </label>
              <select
                value={filters.agency}
                onChange={(e) =>
                  setFilters({ ...filters, agency: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Agencies</option>
                {agencies.map((agency) => (
                  <option key={agency} value={agency}>
                    {agency}
                  </option>
                ))}
              </select>
            </div>

            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <select
                value={filters.destination}
                onChange={(e) =>
                  setFilters({ ...filters, destination: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Destinations</option>
                {destinations.map((dest) => (
                  <option key={dest} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) =>
                  setFilters({ ...filters, priceRange: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Prices</option>
                <option value="low">Under Rwf4,000</option>
                <option value="medium">Rwf4,000 - Rwf7,000</option>
                <option value="high">Above Rwf7,000</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bus List */}
        <div className="space-y-4">
          {filteredBuses.map((bus) => (
            <div
              key={bus.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {bus.agency}
                  </h3>
                  <p className="text-sm text-gray-600">{bus.busType}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    Rwf {bus.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {bus.availableSeats} seats left
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm">
                    {bus.from} → {bus.to}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm">
                    {bus.departureTime} - {bus.arrivalTime} ({bus.duration})
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm">
                    {bus.availableSeats} seats available
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {bus.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleBusSelect(bus)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
              >
                Select Bus
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {filteredBuses.length === 0 && (
          <div className="text-center py-12">
            <Bus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No buses found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )

  const BookingForm = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setCurrentStep("results")}
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
          >
            ← Back to Results
          </button>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Booking Details
            </h2>
            <div className="border-l-4 border-blue-500 pl-4 mb-6">
              <h3 className="font-semibold text-lg">{selectedBus?.agency}</h3>
              <p className="text-gray-600">
                {selectedBus?.from} → {selectedBus?.to}
              </p>
              <p className="text-gray-600">
                {selectedBus?.departureTime} - {selectedBus?.arrivalTime}{" "}
                <strong>({selectedBus?.duration})</strong>
              </p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                Rwf{selectedBus?.price.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-6">
              Passenger Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Phone number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={bookingInfo.fullName}
                  onChange={(e) =>
                    setBookingInfo({ ...bookingInfo, fullName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Phone number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={bookingInfo.phone}
                  onChange={(e) =>
                    setBookingInfo({ ...bookingInfo, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+250 7XX XXX XXX"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={bookingInfo.email}
                onChange={(e) =>
                  setBookingInfo({ ...bookingInfo, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
              />
            </div>

            {/* Passengers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Passengers
                </label>
                <input
                  type="number"
                  value={bookingInfo.passengers}
                  onChange={(e) =>
                    setBookingInfo({
                      ...bookingInfo,
                      passengers: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  max={selectedBus?.availableSeats}
                />
              </div>

              {/* Seat Preference */}
              <div className="hidden">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seat Preference
                </label>
                <select
                  value={bookingInfo.seatPreference}
                  onChange={(e) =>
                    setBookingInfo({
                      ...bookingInfo,
                      seatPreference: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="any">Any Available</option>
                  <option value="window">Window Seat</option>
                  <option value="aisle">Aisle Seat</option>
                  <option value="front">Front Seats</option>
                  <option value="back">Back Seats</option>
                </select>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total Amount:</span>
                <span className="text-2xl font-bold text-green-600">
                  Rwf
                  {(
                    selectedBus?.price * bookingInfo.passengers
                  ).toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleBooking}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const ConfirmationPage = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Booking Confirmed!
        </h2>
        <p className="text-gray-600 mb-6">
          Your ticket has been booked successfully. You will receive a
          confirmation email shortly.
        </p>
        <div className="text-left bg-gray-50 p-4 rounded-lg mb-6">
          <p className="flex gap-3">
            <strong>Bus:</strong> {selectedBus?.agency}
          </p>
          <p className="flex gap-3">
            <strong>Route:</strong> {selectedBus?.from} → {selectedBus?.to}
          </p>
          <p className="flex gap-3">
            <strong>Date:</strong> {searchParams.date}
          </p>
          <p className="flex gap-3">
            <strong>Time:</strong> {selectedBus?.departureTime}
          </p>
          <p className="flex gap-3">
            <strong>Passengers:</strong> {bookingInfo.passengers}
          </p>
          <p className="flex gap-3">
            <strong>Total:</strong> Rwf{" "}
            {(selectedBus?.price * bookingInfo.passengers).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            Back To Home Page
          </button>
          <button
            onClick={() => setCurrentStep("search")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            Book Another Trip
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      {currentStep === "search" && <SearchForm />}
      {currentStep === "results" && <BusResults />}
      {currentStep === "booking" && <BookingForm />}
      {currentStep === "confirmation" && <ConfirmationPage />}
    </div>
  )
}

export default Booking
