export const BASE_URL = import.meta.env.VITE_BASE_URL

// utils/apiPaths.js
export const API_PATHS = {
  AUTH: {
    LOGIN: `${BASE_URL}/api/auth/login`,
    REGISTER: `${BASE_URL}/api/auth/register`,
    GET_USER_INFO: `${BASE_URL}/api/auth/getUser`,
  },
  JOURNEYS: {
    GET_ALL_JOURNEYS: `${BASE_URL}/api/journeys/`,
    GET_ALL_JOURNEYBYID: (journeyId) => `${BASE_URL}/api/journeys/${journeyId}`,
    ADD_JOURNEY: `${BASE_URL}/api/journeys/add`,
    UPDATE_JOURNEY: (journeyId) =>
      `${BASE_URL}/api/journeys/update/${journeyId}`,
    DELETE_JOURNEY: (journeyId) =>
      `${BASE_URL}/api/journeys/delete/${journeyId}`,
  },
  BOOKING: {
    BOOK_SEATS: `${BASE_URL}/api/booking`,
  },
  BUSES: {
    GET_ALL_BUSES: `${BASE_URL}/api/buses/`,
    GET_BUS_BY_ID: (busId) => `${BASE_URL}/api/buses/${busId}`,
    ADD_BUS: `${BASE_URL}/api/buses`,
    UPDATE_BUS: (busId) => `${BASE_URL}/api/buses/${busId}`,
    DELETE_BUS: (busId) => `${BASE_URL}/api/buses/${busId}`,
  },
}
