import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import toastr from 'toastr';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import ForgetPasswordForm from '../../../components/Forms/ForgetPasswordForm'


const useStyles = ((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class ForgetPassword extends React.Component{
  constructor(props){
    super(props)
    this.state={
      email:"",
      password:""
    }
  }
  render(){
    const {classes}=this.props
    return (
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={9} className={classes.image} />
        <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square>
          <div className={classes.paper}>
          <ForgetPasswordForm classes={classes}/>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)( connect(
  state=>({}),
  dispatch=>({ })
  )(ForgetPassword))