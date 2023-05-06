import { LockOutlined } from "@mui/icons-material";
import { Container, Paper, Avatar, Typography, Box, TextField, Grid } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    return (
        <Container component={Paper} maxWidth='sm' sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                />
                <Grid container>
                    <Grid item>
                        <Link to='/login' style={{ textDecoration: 'none' }}>
                            {"Already have an account? Sign In"}
                        </Link>
                    </Grid>
                </Grid>
        </Container>
    );
}