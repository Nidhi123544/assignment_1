import React, { useContext } from 'react';
import toastr from 'toastr';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import userReducer from '../../../redux/actions/authReducer'
import{ LoginForm} from '../../../components/Forms/LoginForm';
import { AuthContext, initialState } from '../../../context/authContext'

const useStyles = ((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

const Login = ({ classes, userReducer }) => {
  const [state, setAuthState] = useContext(AuthContext)
  const { email, password } = state;
  
  const onSubmit = () => {
    if (!email || !password) {
      return toastr.warning("Please Enter Email and Password")
    }
    userReducer.loginUser({ email, password })
    setAuthState(initialState)
  }

  return (
    <LoginForm onSubmit={onSubmit} classes={classes} />
  );
}

export default withStyles(useStyles)(connect(
  state => ({}),
  dispatch => ({
    userReducer: userReducer.getActions(dispatch)
  })
)(Login))