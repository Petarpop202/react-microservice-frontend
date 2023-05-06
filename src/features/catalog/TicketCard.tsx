import { Card, CardMedia, CardContent, Typography, CardActions, Button, CardHeader, Avatar } from "@mui/material";

export default function TicketCard(){
    return (
        <Card>
          <CardHeader 
              avatar = {
                <Avatar sx={{bgcolor: 'secondary.main'}}>
                  L
                </Avatar>
              }
              title = "Lisbon"
              titleTypographyProps={{
                sx: {fontWeight: 'bold', color: 'primary.dark'}
              }}
          />
      <CardMedia
        sx={{ height: 140}}
        image="http://picsum.photos/900"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom  variant="h5">
          129$
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Lisbon is the capital and largest city of Portugal
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to card</Button>
        <Button size="small">View more</Button>
      </CardActions>
    </Card>
    )
}