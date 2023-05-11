import axios, { AxiosError, AxiosResponse } from "axios";
/*
import { toast } from "react-toastify";
import { router } from "../router/Router";
import { store } from "../store/configureStore";
*/
axios.defaults.baseURL = 'http://localhost:8001/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;
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
    login: (values: any) => requests.post('Account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('Account/currentUser')
}

const Flight = {
    getFlights: () => requests.get('Flights'),
    getFlight: (id: any) => requests.get(`Flights/${id}`),
    createFlight : (flight: any) => requests.post('Flights', flight),
    updateFlight : (flight: any) => requests.put(`Flights/${flight.id}`, flight),
    deleteFlight : (id: any) => requests.delete(`Flights/${id}`),
    getBySearch: (values: any) => requests.get(`Flights/getBySearch${values}`)
}

const Accomodation = {
    getAccomodations: () => requests.get('AccomodationSearch')
}

const agent = {
    Account,
    Flight,
    Accomodation
}

export default agent;