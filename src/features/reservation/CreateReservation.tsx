import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Accomodation } from "../../app/models/Accomodation";
import agent from "../../app/api/agent";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useAppSelector } from "../../app/store/configureStore";

export default function CreateReservation() {

    const {id} = useParams();
    const {user} = useAppSelector(state => state.acount); 
    const [accomodation, setAccomodation] = useState<Accomodation>();
    const navigate = useNavigate();

    const [resStartDate, setResStartDate] = useState(new Date());
    const [resEndDate, setResEndDate] = useState(new Date());
    const [resNumberOfGuests, setResNumberOfGuests] = useState<number>(1);

    const handleResStartDateChange = (value : any) => {
        setResStartDate(value);
    };

    const handleResEndDateChange = (value : any) => {
        setResEndDate(value);
    };

    const handleResNumberOfGuestsChange = (event: any) => {
        setResNumberOfGuests(event.target.value);
    };

    useEffect(() => {
        agent.Accomodation.getAccomodation(id)
            .then(response => setAccomodation(response))
            .catch(error => console.log(error))
    }, [])

    const handleSubmit = (event : any) => {
        event.preventDefault();

        let newStatus = accomodation?.isAutomaticConfirm ? 0 : 1;

        let newReservationRequest = {
            created: new Date(),
            startDate: resStartDate,
            endDate: resEndDate,
            numberOfGuests: resNumberOfGuests,
            status: newStatus,
            accomodationId: accomodation?.id,
            guestUsername: user?.userName
        }

        agent.ReservationRequest.createReservationRequest(newReservationRequest)
            .then(() => navigate('/catalog'))
            .catch(error => console.log(error))
    };

    return (
        <Paper sx={{mb: 2, padding: 2}}>
            <Typography gutterBottom variant="h2">
                Create Reservation
            </Typography>
            <Typography variant="h5">
                Accomodation <b>{accomodation?.name}</b> is available from 
                <b>{accomodation ? " " + new Date(accomodation.availableFromDate).toLocaleDateString() + " " + new Date(accomodation.availableFromDate).toLocaleTimeString() : ""}</b> to  
                <b>{accomodation ? " " + new Date(accomodation.availableToDate).toLocaleDateString() + " " + new Date(accomodation.availableToDate).toLocaleTimeString() : ""}</b>
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                        type="number"
                        InputProps={{ inputProps: {min: 1} }}
                        label="Number of guests"
                        value={resNumberOfGuests}
                        onChange={handleResNumberOfGuestsChange}
                        margin="normal"
                        fullWidth
                        required
                    />
                <Grid sx={{mb: 2, border: 1, borderColor: "gray", padding: 2}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label="Start Date"
                        value={resStartDate}
                        minDate={accomodation?.availableFromDate}
                        maxDate={resEndDate}
                        onChange={handleResStartDateChange}
                        slotProps={{ textField: { fullWidth: true, margin: "normal", required: true } }}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label="End Date"
                        value={resEndDate}
                        minDate={resStartDate}
                        maxDate={accomodation?.availableToDate}
                        onChange={handleResEndDateChange}
                        slotProps={{ textField: { fullWidth: true, margin: "normal", required: true} }}
                    />
                </LocalizationProvider>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    size="large"
                    sx={{mb: 2, mt: 2}}
                    fullWidth
                >
                    Create
                </Button>
                <Button
                    component={NavLink}
                    to="/catalog"
                    variant="contained"
                    color="error"
                    size="large"
                    sx={{mb: 2}}
                    fullWidth
                >
                    Cancel
                </Button>
            </form>
        </Paper>
    )
}