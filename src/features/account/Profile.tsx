import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/store/configureStore";
import { Container, Paper, Typography, Box, Grid, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { User } from "../../app/models/User";
import { router } from "../../app/router/Router";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsSubmitting(true);
    agent.Account.currentUser()
      .then(response => setUser(response))
      .catch(error => console.log(error))
      .finally(() => setIsSubmitting(false));
  }, []);

  const handleDeleteProfile = () => {
    setIsSubmitting(true);
    agent.Account.delete(user?.email)
      .then(() => {
        router.navigate('/');
      })
      .catch(error => console.log(error))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <Container component={Paper} maxWidth='sm' sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
        My Profile
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={4}>
            <Typography component="div" variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Name:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography component="div" variant="subtitle1">
              {user?.name}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography component="div" variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Surname:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography component="div" variant="subtitle1">
              {user?.surname}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography component="div" variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Address:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography component="div" variant="subtitle1">
              {user?.address}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography component="div" variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Email:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography component="div" variant="subtitle1">
              {user?.email}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography component="div" variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Role:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography component="div" variant="subtitle1">
              {user?.userRole}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography component="div" variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Password:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography component="div" variant="subtitle1">
              ********
            </Typography>
          </Grid>
          
        </Grid>
        <Button
          variant="contained"
          sx = {{mt: 3, marginRight: '120px'}}
          onClick={() => { /* handle update profile */ }}
        >
          Update Profile
        </Button>
        
        <Button 
            variant="contained" 
            sx = {{mt: 3, marginLeft: '200px'}}
            color="error" 
            onClick={handleDeleteProfile}
        >
        Delete</Button>

      </Box>
    </Container>
  );
}
