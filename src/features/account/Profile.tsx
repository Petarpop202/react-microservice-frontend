import { useEffect, useState } from "react";
import { Switch } from "@mantine/core"
import { Container, Paper, Typography, Box, Grid, Button } from "@mui/material";
import agent from "../../app/api/agent";
import { User } from "../../app/models/User";
import { router } from "../../app/router/Router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState(user?.username ?? '');
  const [name, setName] = useState(user?.name ?? '');
  const [surname, setSurname] = useState(user?.surname ?? '');
  const [address, setAddress] = useState(user?.address ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [password, setPassword] = useState(user?.password ?? '');
  const [role, setRole] = useState(user?.userRole ?? '');

  const [notifSettingsId, setNotifSettingsId] = useState('');
  const [showResReqCreated, setShowResReqCreated] = useState<boolean>();
  const [showResCanceled, setShowResCanceled] = useState<boolean>();
  const [showHostGraded, setShowHostGraded] = useState<boolean>();
  const [showAccomGraded, setShowAccomGraded] = useState<boolean>();
  const [showSuperHost, setShowSuperHost] = useState<boolean>();
  const [showResReqReply, setShowResReqReply] = useState<boolean>();

  const [editMode, setEditMode] = useState(false);
  const { setValue } = useForm({
    mode: 'onTouched'
})


  useEffect(() => {
    setIsSubmitting(true);
    agent.Account.currentUser()
    .then(response => {
        getNotificationUserSettings(response.id);
        setUser(response);
        setUsername(response.username ?? '');
        setName(response.name ?? '');
        setSurname(response.surname ?? '');
        setAddress(response.address ?? '');
        setEmail(response.email ?? '');
        setPassword(response.password ?? '');
        setRole(response.userRole ?? '');
      })
      .catch(error => console.log(error))
      .finally(() => setIsSubmitting(false));
  }, []);

  const handleUpdateProfile = () => {
    setIsSubmitting(true);
    agent.Account.updateUser({ username, name, surname, address, email, role, password })
    .then(response => {
        setUser(response);
        setUsername(response.username ?? '');
        setName(response.name ?? '');
        setSurname(response.surname ?? '');
        setAddress(response.address ?? '');
        setEmail(response.email ?? '');
        setPassword(response.password ?? '');
        setRole(response.userRole ?? '');
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsSubmitting(false);
        setEditMode(false);
      });
  };

  const handleDeleteProfile = () => {
    setIsSubmitting(true);
    agent.Account.delete(user?.email)
      .then(() => {
        router.navigate('/');
      })
      .catch(error => console.log(error))
      .finally(() => setIsSubmitting(false));
  };

  const handleEditProfile = () => {
    setName(user?.name ?? '');
    setSurname(user?.surname ?? '');
    setAddress(user?.address ?? '');
    setEmail(user?.email ?? '');
    setPassword(user?.password ?? '');
    setRole(user?.userRole ?? '');
    setEditMode(true);
  };

  const getNotificationUserSettings = (id: any) => {
    agent.NotificationUserSettings.getByUser(id)
      .then((response) => {
        setNotifSettingsId(response.id)
        setShowResReqCreated(response.showReservationRequestCreated);
        setShowResCanceled(response.showReservationCanceled);
        setShowHostGraded(response.showHostGraded);
        setShowAccomGraded(response.showAccomodationGraded);
        setShowSuperHost(response.showSuperHost);
        setShowResReqReply(response.showReservationRequestReply);
      })
      .catch((error) => {
        console.log(error)
      })
    agent.Reservation.isSuperHost(id)
    .then((response) =>{
      if(response)
        toast.success("Host is super Host!");
      else toast.error("Host is not super Host!");
    })
  }

  const updateNotificationUserSettings = () => {
    let newSettings = {
      id: notifSettingsId,
      userId: user?.id,
      showReservationRequestCreated: showResReqCreated,
      showReservationCanceled: showResCanceled,
      showHostGraded: showHostGraded,
      showAccomodationGraded: showAccomGraded,
      showSuperHost: showSuperHost,
      showReservationRequestReply: showResReqReply
    }
    agent.NotificationUserSettings.updateUserSettings(newSettings)
      .then((response) => {
        toast.success("Successfully updated notification settings!")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Container component={Paper} maxWidth='sm' sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
        My Profile
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={3} sx={{ mb: 3 }}>

        {!editMode ? (
            <>
            <Grid item xs={4}>
              <Typography component="div" variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Username:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography component="div" variant="subtitle1">
                {user?.username}
              </Typography>
            </Grid>
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
          </>
        ) : (
            <>
            <Grid item xs={4}>
                <Typography component="div" variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Username:
                </Typography>
            </Grid>
            <Grid item xs={8}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Grid>
            <Grid item xs={4}>
                <Typography component="div" variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Name:
                </Typography>
            </Grid>
            <Grid item xs={8}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </Grid>
            <Grid item xs={4}>
                <Typography component="div" variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Surname:
                </Typography>
            </Grid>
            <Grid item xs={8}>
            <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
            </Grid>
            <Grid item xs={4}>
                <Typography component="div" variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Address:
                </Typography>
            </Grid>
            <Grid item xs={8}>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </Grid>
            <Grid item xs={4}>
                <Typography component="div" variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Email:
                </Typography>
            </Grid>
            <Grid item xs={8}>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Grid>
            <Grid item xs={4}>
                <Typography component="div" variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Role:
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
            </Grid>
            <Grid item xs={4}>
                <Typography component="div" variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Password:
                </Typography>
            </Grid>
            <Grid item xs={8}>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Grid>
        </>
        )}
          
        </Grid>
        <Button
          variant="contained"
          sx = {{mt: 3, marginRight: '120px'}}
          onClick={editMode ? handleUpdateProfile : () => setEditMode(true)}
        >
          {editMode ? "Accept" : "Edit Profile"}
        </Button>
        
        <Button 
            variant="contained" 
            sx = {{mt: 3, marginLeft: '200px'}}
            color="error" 
            onClick={handleDeleteProfile}
        >
        Delete</Button>

      </Box>

      <Typography variant="h5" sx={{mt: 4}}>
        Notification Settings
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={3} sx={{ mt: 1, mb: 3 }}>
          {user?.userRole === 'HOST' &&
            <>
              <Grid item xs={12}>
                <Switch
                  label="Show Reservation Request Created"
                  checked={showResReqCreated}
                  onChange={(e) => setShowResReqCreated(!showResReqCreated)}
                />
              </Grid>
              <Grid item xs={12}>
                <Switch
                  label="Show Reservation Canceled"
                  checked={showResCanceled}
                  onChange={(e) => setShowResCanceled(!showResCanceled)}
                />
              </Grid>
              <Grid item xs={12}>
                <Switch
                  label="Show Host Graded"
                  checked={showHostGraded}
                  onChange={(e) => setShowHostGraded(!showHostGraded)}
                />
              </Grid>
              <Grid item xs={12}>
                <Switch
                  label="Show Accomodation Graded"
                  checked={showAccomGraded}
                  onChange={(e) => setShowAccomGraded(!showAccomGraded)}
                />
              </Grid>
              <Grid item xs={12}>
                <Switch
                  label="Show Super Host"
                  checked={showSuperHost}
                  onChange={(e) => setShowSuperHost(!showSuperHost)}
                />
              </Grid>
            </>
          }
          {user?.userRole === 'GUEST' && 
            <Grid item xs={12}>
              <Switch
                label="Show Reservation Request Reply"
                checked={showResReqReply}
                onChange={(e) => setShowResReqReply(!showResReqReply)}
              />
            </Grid>
          }
        </Grid>
        <Button variant="contained" color="success" sx={{mt: 2}} onClick={updateNotificationUserSettings} fullWidth>Save</Button>
      </Box>
    </Container>
  );
}
