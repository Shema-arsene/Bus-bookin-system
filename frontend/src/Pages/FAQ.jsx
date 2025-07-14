import React, { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"

const Faqs = [
  {
    id: 1,
    question: "How do I book a bus ticket?",
    answer:
      "Select your route, travel date, and seat on our website, then proceed to payment to confirm your booking.",
  },
  {
    id: 2,
    question: "Can I cancel or reschedule my ticket?",
    answer:
      "Yes, you can cancel or reschedule up to 24 hours before departure, subject to our cancellation policy.",
  },
  {
    id: 3,
    question: "What payment methods are accepted?",
    answer: "We accept mobile money, debit/credit cards, and bank transfers.",
  },
  {
    id: 4,
    question: "Will I receive a confirmation after booking?",
    answer:
      "Yes, you'll receive a confirmation email and SMS with your ticket details after successful booking.",
  },
  {
    id: 5,
    question: "Do I need to print my ticket?",
    answer: "No, you can show your e-ticket on your phone during boarding.",
  },
  {
    id: 6,
    question: "Are there discounts for children or groups?",
    answer:
      "Yes, we offer discounts for children under a certain age and for group bookings. Check our pricing page for details.",
  },
  {
    id: 7,
    question: "What should I do if I miss my bus?",
    answer:
      "Please contact customer support immediately. We’ll help you reschedule depending on availability and policy.",
  },
  {
    id: 8,
    question: "Can I choose my seat when booking?",
    answer:
      "Yes, you can select your preferred seat during the booking process if it's available.",
  },
]

const FAQ = () => {
  const [openId, setOpenId] = useState(null)

  const toggleFaq = (id) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <>
      <section className="py-16 px-4 md:px-8 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
              <p className="text-gray-600 mt-2 max-w-md">
                Find answers to common inquiries about booking, returns, and
                customer support.
              </p>
              <p className="text-gray-600 mt-2 max-w-md">
                If you have more questions, feel free to reach out to us
                directly.
              </p>
            </div>
            <Link
              to="/contact"
              className="font-medium mt-4 md:mt-0 border-2 border-sky-400 bg-sky-400 text-white px-6 py-2 rounded-lg hover:bg-transparent 
                        hover:text-sky-400 transition duration-300"
            >
              Contact Us
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {Faqs.map((faq) => {
              const isOpen = openId === faq.id
              return (
                <div key={faq.id} className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between text-left px-6 py-4 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm font-medium w-6">
                        {faq.id < 10 ? `0${faq.id}` : faq.id}
                      </span>
                      <span className="font-medium">{faq.question}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-500 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`px-6 transition-max-height duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-40 py-2" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default FAQ
