import { Button, Paper, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { Reservation } from "../../app/models/Reservation";
import { ReservationRequest } from "../../app/models/ReservationRequest";
import agent from "../../app/api/agent";
import { User } from "../../app/models/User";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";

export default function GuestReservations() {

    const {user} = useAppSelector(state => state.acount); 

    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [reservationRequests, setReservationRequests] = useState<ReservationRequest[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {

        console.log(user);
        if (user?.userRole === "GUEST") {

            agent.Reservation.getReservationsByGuestUsername(user?.userName)
                .then((response) => setReservations(response))
                .catch((error) => console.log(error))

            agent.ReservationRequest.getReservationRequestsByGuestUsername(user?.userName)
                .then((response) => setReservationRequests(response))
                .catch((error) => console.log(error))

        }else {
            navigate('/catalog')
        }
    }, [])

    const columns = [
        { field: "accomodationId", headerName: "Accomodation Name" },
        { field: "created", headerName: "Created at" },
        { field: "numberOfGuests", headerName: "Number of guests" },
        { field: "startDate", headerName: "Start Date" },
        { field: "endDate", headerName: "End Date" },
        { field: "status", headerName: "Status" }
   ]

    const getStatus = (param : number) => {
        switch(param){
            case 0:
                return 'APPROVED'
            case 1:
                return 'PENDING'
            default:
                return 'REJECTED'
        }
    }

    const handleReservationDelete = (id : string) => {
        agent.Reservation.deleteReservation(id)
            .then(() => {
                agent.Reservation.getReservationsByGuestUsername(user?.userName)
                .then((response) => setReservations(response))
                .catch((error) => console.log(error))
            })
            .catch(error => console.log(error))
    }

    const handleReservationRequestDelete = (id : string) => {
        agent.ReservationRequest.deleteReservationRequest(id)
            .then(() => {
                agent.ReservationRequest.getReservationRequestsByGuestUsername(user?.userName)
                .then((response) => setReservationRequests(response))
                .catch((error) => console.log(error))
            })
            .catch(error => console.log(error))
    }

    const getNextDay = () => {
        let date = new Date()
        return new Date(date.setDate(date.getDate() + 1))
    }

    return (
        <Paper sx={{mb: 2, padding: 2}}>
            <Typography variant="h3">
                My reservations
            </Typography>     
            <table>
                <thead>
                    <th>Created</th>
                    <th>Number of guests</th>
                    <th>Start date</th>
                    <th>End date</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    {reservations.map((res) => (
                        <tr key={res.id}>
                            <td>{new Date(res.created).toLocaleDateString() + " " + new Date(res.created).toLocaleTimeString()}</td>
                            <td>{res.numberOfGuests}</td>
                            <td>{new Date(res.startDate).toLocaleDateString() + " " + new Date(res.startDate).toLocaleTimeString()}</td>
                            <td>{new Date(res.endDate).toLocaleDateString() + " " + new Date(res.endDate).toLocaleTimeString()}</td>
                            <td>
                                {(new Date(res.startDate) > getNextDay()) ?
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="large"
                                        onClick={() => handleReservationDelete(res.id)}
                                        fullWidth
                                        >
                                        Delete
                                    </Button>
                                : ""}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Typography variant="h3" sx={{mt: 4}}>
                My reservation requests
            </Typography> 
            <table>
                <thead>
                    <th>Created</th>
                    <th>Number of guests</th>
                    <th>Start date</th>
                    <th>End date</th>
                    <th>Status</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    {reservationRequests.map((res) => (
                        <tr key={res.id}>
                            <td>{new Date(res.created).toLocaleDateString() + " " + new Date(res.created).toLocaleTimeString()}</td>
                            <td>{res.numberOfGuests}</td>
                            <td>{new Date(res.startDate).toLocaleDateString() + " " + new Date(res.startDate).toLocaleTimeString()}</td>
                            <td>{new Date(res.endDate).toLocaleDateString() + " " + new Date(res.endDate).toLocaleTimeString()}</td>
                            <td>{getStatus(res.status)}</td>
                            <td>
                            {(res.status === 1) ? 
                                <Button
                                    variant="contained"
                                    color="error"
                                    size="large"
                                    onClick={() => handleReservationRequestDelete(res.id)}
                                    fullWidth
                                    >
                                    Delete
                                </Button>
                            : ""}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Paper>
    )
}