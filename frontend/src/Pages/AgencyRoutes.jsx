// src/pages/AgencyRoutes.jsx
import React from "react"
import { useParams } from "react-router-dom"
import { agencyRoutes } from "../utils/data"

const AgencyRoutes = () => {
  const { agencyId } = useParams()
  const agency = agencyRoutes[agencyId]

  if (!agency) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600">Agency not found</h1>
      </div>
    )
  }

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {agency.name} Routes
      </h1>
      <table className="w-full border-collapse border rounded-lg overflow-hidden shadow-md bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3 text-left">From</th>
            <th className="border p-3 text-left">To</th>
            <th className="border p-3 text-left">Departure Time</th>
            <th className="border p-3 text-left">Price (RWF)</th>
          </tr>
        </thead>
        <tbody>
          {agency.routes.map((route, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border p-3">{route.from}</td>
              <td className="border p-3">{route.to}</td>
              <td className="border p-3">{route.time}</td>
              <td className="border p-3">{route.price.toLocaleString()} RWF</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default AgencyRoutes
