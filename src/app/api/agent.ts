import axios, { AxiosError, AxiosResponse } from "axios";
import { store } from "../store/configureStore";

/*
import { toast } from "react-toastify";
import { router } from "../router/Router";
import { store } from "../store/configureStore";
*/


const responseBody = (response: AxiosResponse) => response.data;

axios.defaults.baseURL = "http://localhost:8001/api/"
axios.defaults.withCredentials = true

axios.interceptors.request.use(config => {
    const token = store.getState().acount.user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

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


// const Accomodation = {
//   getAccomodations: () => requests.get("AccomodationSearch"),
//   getAccomodationsBySearch: (values: any) => requests.get(`AccomodationSearch/getBySearch${values}`),
//   getAccomodation: (id: any) => requests.get(`Accomodation/${id}`),
// }


const Accomodation = {
    getAccomodations: () => requests.get("AccomodationSearch"),
    getAccomodationsBySearch: (values: any) => requests.get(`AccomodationSearch/getBySearch${values}`),
    getAccomodation: (id: any) => requests.get(`Accomodation/${id}`),
    getAllAccomodations: () => requests.get(`Accomodation`),
}

const AccomodationGrade = {
  getGrades: () => requests.get("AccomodationGrade"),
  getById: (id: any) => requests.get(`AccomodationGrade/${id}`),
  getByGuestUsername: (username: string) => requests.get(`AccomodationGrade/getByGuest/${username}`),
  getByAccomodationId: (id: any) => requests.get(`AccomodationGrade/getByAccomodation/${id}`),
  getByGuestAndAccomodation: (username: string, id: any) => requests.get(`AccomodationGrade/getByGuestAndAccomodation/${username}/${id}`),
  createGrade: (grade: any) => requests.post("AccomodationGrade", grade),
  updateGrade: (id: any, grade: any) => requests.put(`AccomodationGrade/${id}`, grade),
  deleteGrade: (id: any) => requests.delete(`AccomodationGrade/${id}`)
}

const HostGrade = {
  getGrades: () => requests.get("HostGrade"),
  getById: (id: any) => requests.get(`HostGrade/${id}`),
  getByGuestUsername: (username: string) => requests.get(`HostGrade/getByGuest/${username}`),
  getByHostId: (id: any) => requests.get(`HostGrade/getByHost/${id}`),
  getByGuestAndHost: (username: string, id: any) => requests.get(`HostGrade/getByGuestAndHost/${username}/${id}`),
  createGrade: (grade: any) => requests.post("HostGrade", grade),
  updateGrade: (id: any, grade: any) => requests.put(`HostGrade/${id}`, grade),
  deleteGrade: (id: any) => requests.delete(`HostGrade/${id}`)
}


// const ReservationRequest = {
//   getReservationRequests: () => requests.get("ReservationRequest"),
//   getReservationRequest: (id: any) => requests.get(`ReservationRequest/${id}`),
//   createReservationRequest: (reservationRequest: any) =>
//     requests.post(`ReservationRequest`, reservationRequest),
//   updateReservationRequest: (reservationRequest: any) =>
//     requests.put(
//       `ReservationRequest/${reservationRequest.id}`,
//       reservationRequest
//     ),
//   deleteReservationRequest: (id: any) =>
//     requests.delete(`ReservationRequest/${id}`),
// }

// const Reservation = {
//   getReservations: () => requests.get("Reservation"),
//   getReservation: (id: any) => requests.get(`Reservation/${id}`),
//   createReservation: (reservation: any) =>
//     requests.post(`Reservation`, reservation),
//   updateReservation: (reservation: any) =>
//     requests.put(`Reservation/${reservation.id}`, reservation),
//   deleteReservation: (id: any) => requests.delete(`Reservation/${id}`),
// }


const ReservationRequest = {
    getReservationRequests: () => requests.get("ReservationRequest"),
    getReservationRequest: (id: any) => requests.get(`ReservationRequest/${id}`),
    getReservationRequestsByGuestUsername: (id: any) => requests.get(`ReservationRequest/getByGuest/${id}`),
    getReservationRequestsByAccomodationId: (id: any) => requests.get(`ReservationRequest/getByAccomodation/${id}`),
    createReservationRequest: (reservationRequest: any) => requests.post(`ReservationRequest`, reservationRequest),
    updateReservationRequest: (reservationRequest: any) => requests.put(`ReservationRequest/${reservationRequest.id}`,reservationRequest),
    deleteReservationRequest: (id: any) => requests.delete(`ReservationRequest/${id}`),
  }
  
  const Reservation = {
    getReservations: () => requests.get("Reservation"),
    getReservation: (id: any) => requests.get(`Reservation/${id}`),
    getReservationsByGuestUsername: (id: any) => requests.get(`Reservation/getByGuest/${id}`),
    getReservationsByAccomodationId: (id: any) => requests.get(`Reservation/getByAccomodation/${id}`),
    createReservation: (reservation: any) => requests.post(`Reservation`, reservation),
    updateReservation: (reservation: any) => requests.put(`Reservation/${reservation.id}`, reservation),
    deleteReservation: (id: any) => requests.delete(`Reservation/${id}`),
    canGuestGradeAccomodation: (username: string, accomodationId: any) => requests.get(`Reservation/canGuestGradeAccomodation/${username}/${accomodationId}`),
  }

  const NotificationUserSettings = {
    getByUser: (id: any) => requests.get(`NotificationUserSettings/getByUser/${id}`),
    updateUserSettings: (userSettings: any) => requests.put(`NotificationUserSettings/${userSettings.id}`, userSettings)
  }

  const Notification = {
    getById: (id: any) => requests.get(`Notification/${id}`),
    getAllByUser: (id: any) => requests.get(`Notification/getAllByUser/${id}`),
    getUnreadByUser: (id: any) => requests.get(`Notification/getUnreadByUser/${id}`),
    updateNotification : (notification: any) => requests.put(`/Notification/${notification.id}`, notification)
  } 

const agent = {
  Account,
  Flight,
  Accomodation,
  AccomodationGrade,
  ReservationRequest,
  Reservation,
  HostGrade,
  NotificationUserSettings,
  Notification
}

export default agent
