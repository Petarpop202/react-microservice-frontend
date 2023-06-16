import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";
import agent from "../api/agent";

const midLinks = [
    {title: 'catalog', path: '/catalog'},
    {title: 'about', path: '/about'},
]

const guestMidLinks = [
    {title: 'catalog', path: '/catalog'},
    {title: 'reservations', path: '/guest-reservations'}
]

const hostMidLinks = [
    {title: 'catalog', path: '/catalog'},
    {title: 'reservations', path: '/host-reservations'}
]

const rightLinks = [
    {title: 'login', path: '/login'},
    {title: 'register', path: '/register'},
]

const navStyles = {
    color: 'inherit',
    textDecoration: 'none', 
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active':{
        color: 'text.secondary'
    }
}

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

export default function Header({darkMode, handleThemeChange}: Props) {

    const [isLogged, setIsLogged] = useState<boolean>(false);
    const {user} = useAppSelector(state => state.acount);

    const [numOfNotifs, setNumOfNotifs] = useState<number>(0);

    useEffect(() => {
        if (user?.id == null){
            setNumOfNotifs(0)
            return;
        }

        agent.Notification.getUnreadByUser(user?.id)
            .then((response) => {
                setNumOfNotifs(response.length)
            })

    }, [user])
    
    return (
        <AppBar position='static' sx={{mb: 4}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

                <Box display='flex' alignItems='center'>
                    <Typography variant='h6' component={NavLink} 
                        to='/'
                        sx={navStyles}    
                    >
                        BOOKING-MATE
                    </Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange}/>
                </Box>
            
                {user?.userRole === "GUEST" ?
                    <List sx={{display: 'flex'}}>
                        {guestMidLinks.map(({title, path}) =>(
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                : (
                    user?.userRole === "HOST" ?
                        <List sx={{display: 'flex'}}>
                        {hostMidLinks.map(({title, path}) =>(
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                            ))}
                        </List>
                    :
                        <List sx={{display: 'flex'}}>
                            {midLinks.map(({title, path}) =>(
                                <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={navStyles}
                                >
                                    {title.toUpperCase()}
                                </ListItem>
                            ))}
                        </List>
                )
                }

                <Box display='flex' alignItems='center'>
                    <IconButton component={NavLink} to='/notifications' size='large' edge='start' color='inherit' sx={{mr: 2}}>
                            {numOfNotifs > 0 ? 
                                <Badge badgeContent={numOfNotifs} color="secondary">
                                    <NotificationsActiveIcon />
                                </Badge>
                                : <NotificationsIcon/>
                            }
                    </IconButton>

                    {
                    user ? (<SignedInMenu/>)
                    : (
                        <List sx={{display: 'flex'}}>
                        {rightLinks.map(({title, path}) =>(
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                    )}
                    
                    </Box>
            </Toolbar>
        </AppBar>
    )
}