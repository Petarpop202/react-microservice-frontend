import { Button, Grid } from "@mui/material"
import SearchBar from "./SearchBar"
import TicketsList from "./TicketsList"
import { Accomodation } from "../../app/models/Accomodation"
import { useEffect, useState } from "react"
import agent from "../../app/api/agent"
import { NavLink } from "react-router-dom"
import { AccomodationSearch } from "../../app/models/AccomodationSearch"
import { useAppSelector } from "../../app/store/configureStore"

export default function Catalog() {
  const [accomodations, setAccomodations] = useState<AccomodationSearch[]>([])
  const [capacity, setCapacity] = useState<number>(0)
  useEffect(() => {
    agent.Accomodation.getAccomodations()
      .then((response) => setAccomodations(response))
      .catch((error) => console.log(error))
  }, [])

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <SearchBar
          setFilteredFlights={setAccomodations}
          setTickets={setCapacity}
        />
      </Grid>
      <Grid item xs={9}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mb: 3 }}
          component={NavLink}
          to="/create-accomodation"
        >
          Create flight
        </Button>
        <TicketsList
          accomodations={accomodations}
          setAccomodations={setAccomodations}
          capacity={capacity}
        />
      </Grid>
    </Grid>
  )
}
