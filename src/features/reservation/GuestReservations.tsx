import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Reservation } from "../../app/models/Reservation";
import { ReservationRequest } from "../../app/models/ReservationRequest";
import agent from "../../app/api/agent";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";

export default function GuestReservations() {

    const {user} = useAppSelector(state => state.acount); 

    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [reservationRequests, setReservationRequests] = useState<ReservationRequest[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (user?.userRole === "GUEST") {

            agent.Reservation.getReservationsByGuestUsername(user?.username)
                .then((response) => setReservations(response))
                .catch((error) => console.log(error))

            agent.ReservationRequest.getReservationRequestsByGuestUsername(user?.username)
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

    const handleReservationDelete = (id : string) => {
        agent.Reservation.deleteReservation(id)
            .then(() => {
                agent.Reservation.getReservationsByGuestUsername(user?.username)
                .then((response) => setReservations(response))
                .catch((error) => console.log(error))
            })
            .catch(error => console.log(error))
    }

    const handleReservationRequestDelete = (id : string) => {
        agent.ReservationRequest.deleteReservationRequest(id)
            .then(() => {
                agent.ReservationRequest.getReservationRequestsByGuestUsername(user?.username)
                .then((response) => setReservationRequests(response))
                .catch((error) => console.log(error))
            })
            .catch(error => console.log(error))
    }

    const getNextDay = () => {
        let date = new Date()
        date.setHours(date.getHours() + 2)
        return new Date(date.setDate(date.getDate() + 1))
    }

    return (
        <Paper sx={{mb: 2, padding: 2}}>
            <Typography variant="h3">
                My reservations
            </Typography>     
            {reservations.length > 0 ? <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Created</TableCell>
                        <TableCell>Number of guests</TableCell>
                        <TableCell>Start date</TableCell>
                        <TableCell>End date</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reservations.map((res) => (
                        <TableRow key={res.id}>
                            <TableCell>{new Date(res.created).toLocaleDateString() + " " + new Date(res.created).toLocaleTimeString()}</TableCell>
                            <TableCell>{res.numberOfGuests}</TableCell>
                            <TableCell>{new Date(res.startDate).toLocaleDateString() + " " + new Date(res.startDate).toLocaleTimeString()}</TableCell>
                            <TableCell>{new Date(res.endDate).toLocaleDateString() + " " + new Date(res.endDate).toLocaleTimeString()}</TableCell>
                            <TableCell>
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
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            : <Typography variant="subtitle1">No reservations</Typography>}
            <Typography variant="h3" sx={{mt: 4}}>
                My reservation requests
            </Typography> 
            {reservationRequests.length ? <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Created</TableCell>
                        <TableCell>Number of guests</TableCell>
                        <TableCell>Start date</TableCell>
                        <TableCell>End date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reservationRequests.map((res) => (
                        <TableRow key={res.id}>
                            <TableCell>{new Date(res.created).toLocaleDateString() + " " + new Date(res.created).toLocaleTimeString()}</TableCell>
                            <TableCell>{res.numberOfGuests}</TableCell>
                            <TableCell>{new Date(res.startDate).toLocaleDateString() + " " + new Date(res.startDate).toLocaleTimeString()}</TableCell>
                            <TableCell>{new Date(res.endDate).toLocaleDateString() + " " + new Date(res.endDate).toLocaleTimeString()}</TableCell>
                            <TableCell>{getStatus(res.status)}</TableCell>
                            <TableCell>
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
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            :
            <Typography variant="subtitle1">No reservation requests</Typography>}
        </Paper>
    )
}