import React, { Component, useContext } from 'react'
import '../../../styles/Profile.css';
import ProfilePicture from '../../../components/Profile/ProfilePicture';
import ProfileAbout from '../../../components/Profile/ProfileAbout';
import {
    Button, Menu, MenuItem, Grid, Paper, Card, CardContent, Typography, Avatar, DialogContent, IconButton, CardActions, List, ListItem, ListItemText, DialogTitle, Divider, Tooltip
} from '@material-ui/core'
import toastr from 'toastr';
import { connect } from 'react-redux'
import userReducer from '../../../redux/actions/authReducer'
import { Edit } from '@material-ui/icons';
import config from '../../../utils/config';
import { ProfileContext } from '../../../context/profileContext';


const Profile = ({ user, userReducer }) => {
    const [state, setState] = useContext(ProfileContext)

    const updatProfilePicture=(e)=>{
        const formData= new FormData();
        formData.append("profileImage", e.target.files[0])
        formData.append("apikey", user.apikey)
        userReducer.updatProfilePicture(formData)
    }
    return (
        <div className="profile" style={{ marginTop: "50px" }}>
            <Paper style={{ padding: "20px", width: "50%" }}>
                <DialogTitle>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h6">Profile Details</Typography>
                        <IconButton><Edit /></IconButton>
                    </div>
                </DialogTitle>
                <Grid container justify="center">
                    <Grid item sm={12}>
                        <div style={{ padding: "10px", display: "flex", justifyContent: "center" }}>
                            {user.profileUrl && 
                            <Button variant="contained" component="label">
                                <Avatar style={{ width: "10rem", height: "10rem" }} src={`${config.backendUrl}/${user.profileUrl}`}/>
                                    <input type="file" hidden onChange={updatProfilePicture} />
                                </Button>}
                            {!user.profileUrl &&
                                <Button variant="contained" component="label">
                                <Avatar style={{ width: "10rem", height: "10rem", fontSize: "6rem" }}>
                                    {user.displayName[0]}
                                    <input type="file" hidden onChange={updatProfilePicture} />
                                </Avatar>
                                </Button>
                            }
                        </div>
                        <div><Divider /></div>
                    </Grid>
                    <Grid item sm={12}>
                        <DialogContent>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Full Name"
                                        secondary={user.displayName}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Date of birth"
                                        secondary={user.dob ? user.dob : "N/A"}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Email Id"
                                        secondary={user.email}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Phone number"
                                        secondary={user.phone}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="About me"
                                        secondary={user.aboutMe ? user.aboutMe : "N/A"}
                                    />
                                </ListItem>
                            </List>
                        </DialogContent>
                    </Grid>
                </Grid>

            </Paper>
        </div>
    )
}
export default connect(
    state => ({
        user: state.get('auth').user
    }),
    dispatch => ({
        userReducer: userReducer.getActions(dispatch)
    })
)(Profile)


