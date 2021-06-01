import React, { useEffect } from 'react'
import ApplicationRouter from './containers/Pages/Application/ApplicationRouter';
import AuthRouter from './containers/Pages/Auth/AuthRouter';
import './styles/toastr.css';
import './styles/common.css';
import { connect } from "react-redux";
import userReducer from './redux/actions/authReducer'
import { AuthProvider } from './context/authContext';

const App = ({userReducer, user}) => {

  useEffect(() => {
      userReducer.authCheckUser();
  }, [user===null])

  if (user) {
    return <ApplicationRouter />
  }
  return <AuthProvider>
    <AuthRouter />
  </AuthProvider>
}

export default connect(
  state => ({
    user: state.get('auth').user
  }),
  dispatch => ({
    userReducer: userReducer.getActions(dispatch)
  })
)(App)


