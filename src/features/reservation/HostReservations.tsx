import { Button, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Reservation } from "../../app/models/Reservation";
import { ReservationRequest } from "../../app/models/ReservationRequest";
import agent from "../../app/api/agent";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";

export default function HostReservations() {

    const {user} = useAppSelector(state => state.acount); 

    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [reservationRequests, setReservationRequests] = useState<ReservationRequest[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (user?.userRole === "HOST") {
            agent.Reservation.getReservations()
                .then((response) => setReservations(response))
                .catch((error) => console.log(error))

            agent.ReservationRequest.getReservationRequests()
                .then((response) => setReservationRequests(response))
                .catch((error) => console.log(error))
        }else {
            navigate('/catalog')
        }
    }, [])

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

    const handleReservationRequestStatus = (id : string, newStatus: number) => {
        agent.ReservationRequest.getReservationRequest(id)
            .then((response) => {
                let updatedReservation : ReservationRequest = response
                updatedReservation.status = newStatus;
                agent.ReservationRequest.updateReservationRequest(updatedReservation)
                    .then(() => {
                            agent.Reservation.getReservations()
                                .then((response) => setReservations(response))
                                .catch((error) => console.log(error))

                            agent.ReservationRequest.getReservationRequests()
                                .then((response) => setReservationRequests(response))
                                .catch((error) => console.log(error))
                        })
                    .catch((error) => console.log(error))
            })
            .catch((error) => console.log(error))
    }

    return (
        <Paper sx={{mb: 2, padding: 2}}>
            <Typography variant="h3">
                Reservations
            </Typography>     
            <table>
                <thead>
                    <th>Guest</th>
                    <th>Created</th>
                    <th>Number of guests</th>
                    <th>Start date</th>
                    <th>End date</th>
                </thead>
                <tbody>
                    {reservations.map((res) => (
                        <tr key={res.id}>
                            <td>{res.guestUsername}</td>
                            <td>{new Date(res.created).toLocaleDateString() + " " + new Date(res.created).toLocaleTimeString()}</td>
                            <td>{res.numberOfGuests}</td>
                            <td>{new Date(res.startDate).toLocaleDateString() + " " + new Date(res.startDate).toLocaleTimeString()}</td>
                            <td>{new Date(res.endDate).toLocaleDateString() + " " + new Date(res.endDate).toLocaleTimeString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Typography variant="h3" sx={{mt: 4}}>
                Reservation requests
            </Typography> 
            <table>
                <thead>
                    <th>Guest</th>
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
                            <td>{res.guestUsername}</td>
                            <td>{new Date(res.created).toLocaleDateString() + " " + new Date(res.created).toLocaleTimeString()}</td>
                            <td>{res.numberOfGuests}</td>
                            <td>{new Date(res.startDate).toLocaleDateString() + " " + new Date(res.startDate).toLocaleTimeString()}</td>
                            <td>{new Date(res.endDate).toLocaleDateString() + " " + new Date(res.endDate).toLocaleTimeString()}</td>
                            <td>{getStatus(res.status)}</td>
                            <td>
                            {(res.status === 1) ? 
                                (
                                    <>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            size="large"
                                            onClick={() => handleReservationRequestStatus(res.id, 0)}
                                            fullWidth
                                            >
                                            Approve
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="large"
                                            onClick={() => handleReservationRequestStatus(res.id, 2)}
                                            fullWidth
                                            >
                                            Reject
                                        </Button>
                                    </>
                                )
                            : ""}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Paper>
    )
}