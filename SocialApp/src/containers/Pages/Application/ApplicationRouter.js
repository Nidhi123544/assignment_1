import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Headers from '../Heders/Header'
import Profile from '../Profile/Profile';
import UserSuggestion from '../UserSuggestion/UserSuggestion';
import { UserSuggestionProvide } from '../../../context/userSuggestion';
import { ProfileProvider } from '../../../context/profileContext';

class ApplicationRouter extends Component {
    render() {
        return (
            <section  className='applicationPage' style={{ padding: '0px', margin: '0px', boxSizing: 'border-box' }}>
                <UserSuggestionProvide>
                <ProfileProvider>
                <Router>
                    <Headers />
                    <Switch>
                        <Route path='/app' exact component={UserSuggestion} />
                        <Route path='/app/profile/' exact component={Profile} />
                        <Redirect to="/app" />
                    </Switch>
                </Router>
                </ProfileProvider>
                </UserSuggestionProvide>
            </section>
        )
    }
}
export default ApplicationRouter;
