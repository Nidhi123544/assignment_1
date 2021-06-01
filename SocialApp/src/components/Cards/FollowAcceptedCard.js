import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    Button,
    CardHeader, Avatar
} from '@material-ui/core'


class FollowAcceptedCard extends Component {
    constructor(props) {
        super(props)
        this.acceptFollowrequest = this.acceptFollowrequest.bind(this)
    }

    acceptFollowrequest(e) {
        const userEmail = e.currentTarget.id
        const { acceptRequest } = this.props
        acceptRequest(userEmail)
    }

    render() {
        const { pendingRequest } = this.props
        return (
            <div >
                <div style={{ alignContent: "end" }}>
                    <CardHeader
                        style={{ width: "100%" }}
                        avatar={
                            <Avatar aria-label="recipe" style={{ textTransform: 'capitalize' }}>
                                {pendingRequest.displayName ? pendingRequest.displayName[0] : 'N/A'}
                            </Avatar>
                        }
                        title={pendingRequest.displayName}
                        subheader={pendingRequest.email}
                        action={
                            <div style={{ padding: "20px" }}>
                                <Button
                                    id={pendingRequest.email}
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    onClick={(e) => this.acceptFollowrequest(e)}
                                >
                                    Accept
                                            </Button>

                                <Button
                                    variant="outlined"
                                    style={{color:"red", marginLeft:"5px"}}
                                    size="small"
                                >
                                    Decline
                                        </Button>
                            </div>}
                    />
                </div>
            </div>

        )
    }
}
export default connect(state => ({
    user: state.get('auth').user,
    myalluserpost: state.get('auth').myalluserpost,
    pendingfollowers: state.get('auth').pendingfollowers,
})
    , dispatch => ({


    }))(FollowAcceptedCard)
