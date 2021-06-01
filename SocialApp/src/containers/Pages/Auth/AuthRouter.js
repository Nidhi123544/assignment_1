import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
// import ResetPassword from './ResetPassword';
// import ForgetPassword from './ForgetPassword';
import { AuthProvider } from '../../../context/authContext'

class AuthRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact strict component={Login} />
                <Route path="/register" exact strict component={Register} />
                {/* <Route path="/reset/pass" exact strict component={ResetPassword}/> */}
                {/* <Route path="/forget/pass" exact strict component={ForgetPassword}/> */}
                <Redirect to='/' />
            </Switch>
        )
    }
}

export default AuthRouter;
