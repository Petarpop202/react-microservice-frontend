import { Button, Menu, Fade, MenuItem } from "@mui/material";
import React from "react";
import { signOut } from "../../features/account/AccountSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { NavLink } from "react-router-dom";

export default function SignedInMenu() {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector((state: { acount: any; }) => state.acount);
    
    // const signOut = () => {
    //     localStorage.removeItem('user');
    //     location.reload();        
    //     router.navigate('/');        
    // }
    
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                sx={{typography: 'h6'}}
                color='inherit'
                 onClick={handleClick}>
                {user?.email}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem component={NavLink} to='/profile'>Profile</MenuItem>
                <MenuItem onClick={() => dispatch(signOut())}>Logout</MenuItem>
            </Menu>
        </>
    );
    
}