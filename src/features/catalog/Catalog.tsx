import { Button, Grid } from "@mui/material";
import SearchBar from "./SearchBar";
import TicketsList from "./TicketsList";
import { Accomodation } from "../../app/models/Accomodation";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";

export default function Catalog() {

    const [accomodations, setAccomodations] = useState<Accomodation[]>([]);
    const [capacity, setCapacity] = useState<number>(0);

    useEffect(() => {
        agent.Accomodation.getAccomodations()
            .then(response => setAccomodations(response))
            .catch(error => console.log(error))
    }, [])

    return (
        <Grid container spacing={4}>
            <Grid item xs={3}>
                <SearchBar/>
            </Grid>
            <Grid item xs={9}>
            <TicketsList accomodations={accomodations} setAccomodations={setAccomodations} capacity={capacity}/>
            </Grid>
        </Grid>
    )
}