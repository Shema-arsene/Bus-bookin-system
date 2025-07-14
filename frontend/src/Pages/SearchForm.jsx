import React from "react"
import { Search, Bus, Clock, MapPin, Users } from "lucide-react"

const SearchForm = ({ searchParams, setSearchParams, handleSearch }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/60"></div>
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
          <form
            onSubmit={handleSearch}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* From */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  FROM
                </label>
                <input
                  type="text"
                  value={searchParams.from}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, from: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-gray-50"
                  placeholder="Departure city"
                />
              </div>
              {/* To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  TO
                </label>
                <input
                  type="text"
                  value={searchParams.to}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, to: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-gray-50"
                  placeholder="Destination city"
                />
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
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-12 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
              >
                <Search className="inline mr-2 h-5 w-5" />
                SEARCH BUSES
              </button>
            </div>
          </form>

          {/* Features Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-white">
            {[
              {
                icon: Bus,
                title: "RETURN TICKETS",
                desc: "Book round trips easily",
              },
              { icon: Clock, title: "BUS DELAYS", desc: "Real-time updates" },
              {
                icon: MapPin,
                title: "DISCOUNTS",
                desc: "Special offers available",
              },
              {
                icon: Users,
                title: "DISABLED PASSENGERS",
                desc: "Accessible travel options",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="text-center">
                <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-gray-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchForm
