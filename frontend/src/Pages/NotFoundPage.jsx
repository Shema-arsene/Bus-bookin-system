import React from "react"
import { Link } from "react-router-dom"
import { Home, Search } from "lucide-react"

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-12">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          The page you are looking for is temporarily unavailable, had its name
          changed, or might have been removed.
        </p>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 font-medium bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-900 transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>

          <Link
            to="/booking"
            className="flex items-center justify-center gap-2 font-medium bg-white text-blue-600 py-3 px-6 rounded-lg border-2 border-blue-600
                      hover:bg-gray-50 transition-colors"
          >
            <Search className="h-5 w-5" />
            <span>Book Trip</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
