import { Card, CardMedia, CardContent, Typography, CardActions, Button, CardHeader, Avatar } from "@mui/material";
import { Accomodation } from "../../app/models/Accomodation";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";

interface Props {
  accomodation: Accomodation
  setAccomodations: any
  capacity: number
}


export default function TicketCard({accomodation, setAccomodations, capacity} : Props){
  
const setFlights = () => {
  agent.Accomodation.getAccomodations()
    .then(response => setAccomodations(response))
}  
  
  return (
      <Card>
      <CardHeader 
          avatar = {
            <Avatar sx={{bgcolor: 'primary.main'}}>
              {accomodation.name[0]}
            </Avatar>
          }
          title ={`${accomodation.name}`}
          titleTypographyProps={{
            sx: {fontWeight: 'bold', color: 'primary.dark'}
          }}
      />
  <CardMedia
    sx={{ height: 140}}
    image={`http://picsum.photos/${Math.floor((Math.random() + 1) * 500)}`}
  />
  <CardContent>
  <Typography gutterBottom  variant="h5">
        {accomodation.address.city}
    </Typography>
    <Typography gutterBottom  variant="subtitle2">
        ${accomodation.price} night
    </Typography>
    { capacity > 1 &&
      <Typography gutterBottom  variant="h6">
          ${accomodation.price * capacity} for {capacity} visitors
      </Typography>
    }
    <Typography variant="subtitle1">
      Capacity: <b>{capacity}</b> visitors
    </Typography>
    <Typography variant="subtitle1">
      Description: {accomodation.description}
    </Typography>
    <Typography variant="body1" color="text.secondary">
      <>
      </>
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small" component={Link} to={`/checkout`}>Purchase</Button>
    <Button size="small" component={Link} to={`/catalog`} >View more</Button>
  </CardActions>
</Card>
    )
}