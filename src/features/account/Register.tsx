import { LockOutlined } from "@mui/icons-material";
import { Container, Paper, Avatar, Typography, Box, TextField, Grid, FormControlLabel, Checkbox, RadioGroup, Radio } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";

export default function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid }, setValue } = useForm({
        mode: 'onTouched'
    })

    const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('userRole', event.target.value);
    };
    
    function handleApiErrors(errors: any) {
        console.log(errors);
        if (errors) {
            errors.forEach((error: string, index: number) => {
                if (error.includes('Password')) {
                    setError('password', { message: error })
                } else if (error.includes('Email')) {
                    setError('email', { message: error })
                } else if (error.includes('Username')) {
                    setError('username', { message: error })
                }
            });
        }
    }

    return (
        <Container component={Paper} maxWidth='sm' sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component="form"
                noValidate sx={{ mt: 1 }}
                onSubmit={handleSubmit(data => agent.Account.register(data)
                    .then(() => {
                        toast.success('Registration successful - you can now login');
                        navigate('/login');
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
                     label="Email"
                     {...register('email', { required: 'Email is required' })}
                     error={!!errors.email}
                     helperText={errors?.email?.message as string}
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
                <TextField
                   margin="normal"
                   required
                   fullWidth
                   label="Name"
                   autoFocus
                   {...register('name', { required: 'Name is required' })}
                   error={!!errors.name}
                   helperText={errors?.name?.message as string}
                />
                <TextField
                   margin="normal"
                   required
                   fullWidth
                   label="Surname"
                   autoFocus
                   {...register('surname', { required: 'Surname is required' })}
                   error={!!errors.surname}
                   helperText={errors?.surname?.message as string}
                />
                <TextField
                   margin="normal"
                   required
                   fullWidth
                   label="Address"
                   autoFocus
                   {...register('address', { required: 'Address is required' })}
                   error={!!errors.address}
                   helperText={errors?.address?.message as string}
                />
                
                
                <RadioGroup aria-label="userRole" name="userRole" defaultValue="guest" onChange={handleRoleChange}>
                    <FormControlLabel value="HOST" control={<Radio />} label="Host" />
                    <FormControlLabel value="GUEST" control={<Radio />} label="Guest" />
                </RadioGroup>

                <LoadingButton loading={isSubmitting} type="submit"
                    disabled={!isValid}
                    fullWidth
                    variant="contained"                    
                    sx={{ mt: 3, mb: 2 }}>
                    Register
                </LoadingButton>

                <Grid container>
                    <Grid item>
                        <Link to='/login' style={{ textDecoration: 'none' }}>
                            {"Already have an account? Sign In"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

