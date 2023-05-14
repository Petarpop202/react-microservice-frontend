import axios, { AxiosError, AxiosResponse } from "axios"
/*
import { toast } from "react-toastify";
import { router } from "../router/Router";
import { store } from "../store/configureStore";
*/

axios.defaults.baseURL = "http://localhost:5069/api/"
axios.defaults.withCredentials = true

const responseBody = (response: AxiosResponse) => response.data
/*
axios.interceptors.request.use(config => {
    const token = store.getState().acount.user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})*/

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
}

const Account = {
  login: (values: any) => requests.post("Account/login", values),
  register: (values: any) => requests.post("Account/register", values),
  currentUser: () => requests.get("Account/currentUser"),
  delete: (username: any) => requests.delete(`Account/${username}`),
  updateUser: (user: any) => requests.put(`Account/update`, user),
}

const Flight = {
  getFlights: () => requests.get("Flights"),
  getFlight: (id: any) => requests.get(`Flights/${id}`),
  createFlight: (flight: any) => requests.post("Flights", flight),
  updateFlight: (flight: any) => requests.put(`Flights/${flight.id}`, flight),
  deleteFlight: (id: any) => requests.delete(`Flights/${id}`),
  getBySearch: (values: any) => requests.get(`Flights/getBySearch${values}`),
}

/*
const Accomodation = {
  getAccomodations: () => requests.get("AccomodationSearch"),
  getAccomodation: (id: any) => requests.get(`Accomodation/${id}`),
}
*/

const Accomodation = {
    getAccomodations: () => axios.get("https://localhost:5090/api/AccomodationSearch").then(responseBody),
    getAccomodation: (id: any) => axios.get(`https://localhost:7046/api/Accomodation/${id}`).then(responseBody),
  }

/*
const ReservationRequest = {
  getReservationRequests: () => requests.get("ReservationRequest"),
  getReservationRequest: (id: any) => requests.get(`ReservationRequest/${id}`),
  createReservationRequest: (reservationRequest: any) =>
    requests.post(`ReservationRequest`, reservationRequest),
  updateReservationRequest: (reservationRequest: any) =>
    requests.put(
      `ReservationRequest/${reservationRequest.id}`,
      reservationRequest
    ),
  deleteReservationRequest: (id: any) =>
    requests.delete(`ReservationRequest/${id}`),
}

const Reservation = {
  getReservations: () => requests.get("Reservation"),
  getReservation: (id: any) => requests.get(`Reservation/${id}`),
  createReservation: (reservation: any) =>
    requests.post(`Reservation`, reservation),
  updateReservation: (reservation: any) =>
    requests.put(`Reservation/${reservation.id}`, reservation),
  deleteReservation: (id: any) => requests.delete(`Reservation/${id}`),
}
*/

const ReservationRequest = {
    getReservationRequests: () => axios.get("https://localhost:5001/api/ReservationRequest").then(responseBody),
    getReservationRequest: (id: any) => axios.get(`https://localhost:5001/api/ReservationRequest/${id}`).then(responseBody),
    getReservationRequestsByGuestUsername: (id: any) => axios.get(`https://localhost:5001/api/ReservationRequest/getByGuest/${id}`).then(responseBody),
    getReservationRequestsByAccomodationId: (id: any) => axios.get(`https://localhost:5001/api/ReservationRequest/getByAccomodation/${id}`).then(responseBody),
    createReservationRequest: (reservationRequest: any) => axios.post(`https://localhost:5001/api/ReservationRequest`, reservationRequest).then(responseBody),
    updateReservationRequest: (reservationRequest: any) => axios.put(`https://localhost:5001/api/ReservationRequest/${reservationRequest.id}`,reservationRequest).then(responseBody),
    deleteReservationRequest: (id: any) => axios.delete(`https://localhost:5001/api/ReservationRequest/${id}`).then(responseBody),
  }
  
  const Reservation = {
    getReservations: () => axios.get("https://localhost:5001/api/Reservation").then(responseBody),
    getReservation: (id: any) => axios.get(`https://localhost:5001/api/Reservation/${id}`).then(responseBody),
    getReservationsByGuestUsername: (id: any) => axios.get(`https://localhost:5001/api/Reservation/getByGuest/${id}`).then(responseBody),
    getReservationsByAccomodationId: (id: any) => axios.get(`https://localhost:5001/api/Reservation/getByAccomodation/${id}`).then(responseBody),
    createReservation: (reservation: any) => axios.post(`https://localhost:5001/api/Reservation`, reservation).then(responseBody),
    updateReservation: (reservation: any) => axios.put(`https://localhost:5001/api/Reservation/${reservation.id}`, reservation).then(responseBody),
    deleteReservation: (id: any) => axios.delete(`https://localhost:5001/api/Reservation/${id}`).then(responseBody),
  }

const agent = {
  Account,
  Flight,
  Accomodation,
  ReservationRequest,
  Reservation,
}

export default agent
