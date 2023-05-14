import { LockOutlined } from "@mui/icons-material";
import { Container, Paper, Avatar, Typography, Box, TextField, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store/configureStore";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import { signInUser } from "./AccountSlice";
import { LoadingButton } from "@mui/lab";

export default function Login() {
    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'onTouched'
    })
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <Container component={Paper} maxWidth='sm' sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" 
                noValidate sx={{ mt: 1 }}
                onSubmit={handleSubmit(data => agent.Account.login(data)
                    .then(() => {                       
                        dispatch(signInUser(data));
                        navigate('/');
                    })
                    .catch(() => {
                        toast.error('Invalid parameters!')
                    }))}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    autoFocus
                    {...register('username', { required: 'Username is required' })}
                    error={!!errors.username}
                    helperText={errors?.username?.message as string}
                />
                <TextField
                     margin="normal"
                     required
                     fullWidth
                     label="Password"
                     type="password"
                     {...register('password', { required: 'Username is required' })}
                     error={!!errors.password}
                     helperText={errors?.password?.message as string}
                />
                <LoadingButton loading={isSubmitting} type="submit"
                    disabled={!isValid}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}>
                    Sign in
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to='/register' style={{ textDecoration: 'none' }}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}