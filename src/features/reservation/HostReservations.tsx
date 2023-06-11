import { Button, Paper, Tab, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
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
            {reservations.length ? <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Guest</TableCell>
                        <TableCell>Created</TableCell>
                        <TableCell>Number of guests</TableCell>
                        <TableCell>Start date</TableCell>
                        <TableCell>End date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reservations.map((res) => (
                        <TableRow key={res.id}>
                            <TableCell>{res.guestUsername}</TableCell>
                            <TableCell>{new Date(res.created).toLocaleDateString() + " " + new Date(res.created).toLocaleTimeString()}</TableCell>
                            <TableCell>{res.numberOfGuests}</TableCell>
                            <TableCell>{new Date(res.startDate).toLocaleDateString() + " " + new Date(res.startDate).toLocaleTimeString()}</TableCell>
                            <TableCell>{new Date(res.endDate).toLocaleDateString() + " " + new Date(res.endDate).toLocaleTimeString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            : <Typography variant="subtitle1">No reservations</Typography>}
            <Typography variant="h3" sx={{mt: 4}}>
                Reservation requests
            </Typography> 
            {reservationRequests.length ? <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Guest</TableCell>
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
                            <TableCell>{res.guestUsername}</TableCell>
                            <TableCell>{new Date(res.created).toLocaleDateString() + " " + new Date(res.created).toLocaleTimeString()}</TableCell>
                            <TableCell>{res.numberOfGuests}</TableCell>
                            <TableCell>{new Date(res.startDate).toLocaleDateString() + " " + new Date(res.startDate).toLocaleTimeString()}</TableCell>
                            <TableCell>{new Date(res.endDate).toLocaleDateString() + " " + new Date(res.endDate).toLocaleTimeString()}</TableCell>
                            <TableCell>{getStatus(res.status)}</TableCell>
                            <TableCell>
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
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            : <Typography variant="subtitle1">No reservation requests</Typography>}
        </Paper>
    )
}