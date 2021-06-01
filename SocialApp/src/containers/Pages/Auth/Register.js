/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from 'react';
import toastr from 'toastr';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import userReducer from '../../../redux/actions/authReducer'
import { RegisterForm } from '../../../components/Forms/RegisterForm';
import { AuthContext, initialState } from '../../../context/authContext';
import { useHistory } from 'react-router-dom';


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

const Register = ({ userReducer, classes }) => {
  const [state, setAuthState] = useContext(AuthContext);
  const { displayName, email, phone, password, confirmPassword } = state;
  const history = useHistory();

  const onSubmit = () => {

    if (!displayName || !email || !phone || !password || !confirmPassword) {
      return toastr.warning("Input field cannot be empty.")
    }
    if (password !== confirmPassword) {
      return toastr.warning("Confirm password must be same as password.")
    }
    if (phone.length !== 10) {
      return toastr.warning('Phone number must be 10 digit number.')
    }
    userReducer.registerUser(state)
      .then(res => {
        if (res.success) {
          setAuthState(initialState);
          history.push('/');
        }
      });
  }

  return (
    <RegisterForm onSubmit={onSubmit} email={email} classes={classes} />
  );
}

export default withStyles(useStyles)(connect(
  state => ({}),
  dispatch => ({
    userReducer: userReducer.getActions(dispatch)
  })
)(Register))