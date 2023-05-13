import { createBrowserRouter } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import Catalog from "../../features/catalog/Catalog";
import HometPage from "../../features/home/HomePage";
import App from "../layout/App";
import CreateReservation from "../../features/reservation/CreateReservation";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HometPage />},
            {path: 'catalog', element: <Catalog />},
            {path: 'about', element: <AboutPage />},
            {path: 'login', element: <Login />},
            {path: 'register', element: <Register />},
            {path: 'new-reservation/:id', element: <CreateReservation/>}
        ]

    }
])