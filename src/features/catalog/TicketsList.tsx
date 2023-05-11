import { Grid, List } from "@mui/material";
import TicketCard from "./TicketCard";
import { Accomodation } from "../../app/models/Accomodation";

interface Props {
    accomodations: Accomodation[]
    setAccomodations: any
    capacity: number
}

export default function TicketsList({accomodations, setAccomodations, capacity} : Props){
    return (
        <Grid container spacing={4}>
            {accomodations.map(accomodation => (
                <Grid item xs={4} key={accomodation.id}>
                    <TicketCard accomodation={accomodation} setAccomodations={setAccomodations} capacity={capacity}/>
                </Grid>
            ))}
        </Grid>
    )
}