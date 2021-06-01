import React, { Component, useContext } from 'react'
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Typography, Avatar } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { AuthContext } from '../../context/authContext';

export const RegisterForm = ({ onSubmit, classes }) => {
    const [state, setAuthState] = useContext(AuthContext);
    const { displayName, email, password, phone, confirmPassword } = state
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}> <LockOutlinedIcon /> </Avatar>
                <Typography component="h1" variant="h5">Sign up</Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        label="Name*"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        value={displayName}
                        onChange={(e) => setAuthState({ ...state, displayName: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={email}
                        label="Email Id"
                        onChange={(e) => setAuthState({ ...state, email: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Phone Number"
                        value={phone}
                        onChange={(e) => setAuthState({ ...state, phone: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        value={password}
                        margin="normal"
                        required
                        label="Password"
                        fullWidth
                        type="password"
                        onChange={(e) => setAuthState({ ...state, password: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setAuthState({ ...state, confirmPassword: e.target.value })}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e => onSubmit())}
                    >
                        Sign Up
                            </Button>
                    <Grid container justify="center">
                        <Grid item>
                            <Link href="/" variant="body2">Already have an account? Sign in </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}
