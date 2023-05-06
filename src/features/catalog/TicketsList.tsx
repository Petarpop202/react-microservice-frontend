import { Grid, List } from "@mui/material";
import TicketCard from "./TicketCard";

export default function TicketsList(){
    return (
        <Grid container spacing={4}>
            <Grid item xs={4}>
                <TicketCard />
            </Grid>
        </Grid>
    )
}