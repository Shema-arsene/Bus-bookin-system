import React from "react"
import { Link } from "react-router-dom"

const Agencies = () => {
  const agencies = [
    {
      id: 1,
      name: "RITCO Express",
      description: "Reliable long-distance travel across Rwanda and EAC.",
      image: "https://www.ritco.rw/assets/images/home_two/hero_thumb_2.png",
      route: "/agencies/ritco",
    },
    {
      id: 2,
      name: "Volcano Bus",
      description: "Fast and safe travel to all major cities.",
      image:
        "https://www.bus-planet.com/bus/pictures/Rwanda/890/JV-2016-01-22-012.jpg",
      route: "/agencies/volcano",
    },
    {
      id: 3,
      name: "KBS Transport",
      description: "City and regional bus services with comfort.",
      image:
        "https://prod.cdn-medias.jeuneafrique.com/cdn-cgi/image/q=auto,f=auto,metadata=none,width=1215,fit=cover/https://prod.cdn-medias.jeuneafrique.com/medias/2016/06/06/kigali-bus-services.jpg",
      route: "/agencies/kbs",
    },
  ]

  return (
    <section className="py-10 px-4 md:px-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Our Bus Partners</h2>
        <p className="text-gray-600 font-medium my-5">
          Choose from Rwanda's most trusted transport agencies
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agencies.map((agency) => (
          <aside
            key={agency.id}
            className="relative h-full min-h-[250px] flex flex-col justify-end p-6 rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={agency.image}
              alt={agency.name}
              className="absolute inset-0 w-full h-full object-cover -z-10"
            />
            <div className="absolute inset-0 bg-black/50 -z-10" />

            <h3 className="text-2xl font-semibold text-white">{agency.name}</h3>
            <p className="text-sm text-gray-200 mb-4">{agency.description}</p>
            <Link
              to={agency.route}
              className="inline-block w-fit py-2 px-4 rounded-md font-semibold border border-white text-white hover:bg-white hover:text-black transition"
            >
              View Routes
            </Link>
          </aside>
        ))}
      </div>
    </section>
  )
}

export default Agencies
