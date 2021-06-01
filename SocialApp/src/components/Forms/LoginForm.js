import React, { useContext } from 'react';
import {
  Avatar,Button, TextField, CssBaseline, Grid,Typography,Container, Link
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { AuthContext } from '../../context/authContext';


export const LoginForm = (props) => {
  const { onSubmit, classes } = props
  const [state, setAuthState] = useContext(AuthContext);
  const { email, password } = state;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar>
        <Typography component="h1" variant="h5">Sign in</Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            value={email}
            fullWidth
            onChange={(e)=>setAuthState({...state, email:e.target.value})}
            label="Email Address"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={(e)=>setAuthState({...state, password:e.target.value})}
            label="Password"
            type="password"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={()=>onSubmit()}
            className={classes.submit}
          >
            Sign In
                </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
