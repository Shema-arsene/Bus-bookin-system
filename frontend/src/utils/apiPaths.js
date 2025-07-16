export const BASE_URL = import.meta.env.VITE_BASE_URL

// utils/apiPaths.js
export const API_PATHS = {
  AUTH: {
    LOGIN: "api/auth/login",
    REGISTER: "api/auth/register",
    GET_USER_INFO: "api/auth/getUser",
  },
  JOURNEYS: {
    GET_ALL_JOURNEYS: "api/journeys/",
    GET_ALL_JOURNEYBYID: (journeyId) => `api/journeys/${journeyId}`,
    ADD_JOURNEY: "api/journeys/add",
    UPDATE_JOURNEY: (journeyId) => `api/journeys/update/${journeyId}`,
    DELETE_JOURNEY: (journeyId) => `api/journeys/delete/${journeyId}`,
  },
  BOOKING: {
    BOOK_SEATS: "api/booking",
  },
  BUSES: {
    GET_ALL_BUSES: "api/buses/",
    GET_BUS_BY_ID: (busId) => `api/buses/${busId}`,
    ADD_BUS: "api/buses",
    UPDATE_BUS: (busId) => `api/buses/${busId}`,
    DELETE_BUS: (busId) => `api/buses/${busId}`,
  },
}
