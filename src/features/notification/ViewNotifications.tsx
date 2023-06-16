import { Box, Button, Paper, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, Typography } from "@mui/material";
import { ContextType, useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { Notification } from "../../app/models/Notification";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import { TabContext, TabPanel } from "@mui/lab";

export default function ViewNotification() {
    const {user} = useAppSelector(state => state.acount); 

    const [unreadNotifications, setUnreadNotifications] = useState<Notification[]>([]);
    const [allNotifications, setAllNotification] = useState<Notification[]>([]);
    const [tabValue, setTabValue] = useState('1');

    const navigate = useNavigate();
    
    useEffect(() => {
        if (user?.id === undefined){
            return;
        }
        getUnreadNotifs(user?.id);
        getAllNotifs(user?.id);
    }, [])
    
    const getUnreadNotifs = (id : any) => {
        agent.Notification.getUnreadByUser(id)
        .then((response) => {
            setUnreadNotifications(response)
        })
        .catch((error) => console.log(error))
    } 
    
    const getAllNotifs = (id: any) => {
        agent.Notification.getAllByUser(id)
            .then((response) => setAllNotification(response))
            .catch((error) => console.log(error))    
    }

    const handleTabChange = (event: any, newValue: any) => {
        setTabValue(newValue);
    }

    const markNotifAsRead = (id: any) => {
        agent.Notification.getById(id)
            .then((response) => {
                let updatedNotification : Notification = response
                updatedNotification.isRead = true;
                agent.Notification.updateNotification(updatedNotification)
                    .then((response) => {
                        getUnreadNotifs(user?.id);
                        getAllNotifs(user?.id);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <Paper sx={{mb: 2, padding: 2}}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
                        <Tab label="Unread" value="1" />
                        <Tab label="All" value="2" />
                    </Tabs>
                </Box>
                <TabPanel value="1">
                    {unreadNotifications.length ? <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Created</TableCell>
                                <TableCell>Text</TableCell>
                                <TableCell>Mark as read</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {unreadNotifications.map((notif) => (
                                <TableRow key={notif.id}>
                                    <TableCell>{new Date(notif.created).toLocaleDateString() + " " + new Date(notif.created).toLocaleTimeString()}</TableCell>
                                    <TableCell>{notif.text}</TableCell>
                                    <TableCell><Button variant="outlined" onClick={() => markNotifAsRead(notif.id)}>Mark as Read</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    : <Typography variant="subtitle1">No unread notifications</Typography>}
                </TabPanel>
                <TabPanel value="2">
                    {allNotifications.length ? <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Created</TableCell>
                                <TableCell>Text</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allNotifications.map((notif) => (
                                <TableRow key={notif.id}>
                                    <TableCell>{new Date(notif.created).toLocaleDateString() + " " + new Date(notif.created).toLocaleTimeString()}</TableCell>
                                    <TableCell>{notif.text}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    : <Typography variant="subtitle1">No notifications</Typography>}
                </TabPanel>
            </TabContext>
        </Paper>
    )
}