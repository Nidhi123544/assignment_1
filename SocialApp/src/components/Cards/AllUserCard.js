import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    Button,
    CardHeader, Avatar, Card, CardActions
} from '@material-ui/core'


class AllUserCard extends Component {
    constructor(props) {
        super(props)
        this.followRequest = this.followRequest.bind(this)
        this.deleteUserFollow = this.deleteUserFollow.bind(this)
    }
    followRequest(e) {
        const userEmail = e.currentTarget.id
        const { myalluserpost, sendFollowUserRequest, user } = this.props
        const followUser = myalluserpost.filter(u => u.email === userEmail)
        const sendObj = {
            "followBy": user.displayName,
            "followByEmailId": user.email,
            "followTo": followUser[0].displayName,
            "followToEmailId": followUser[0].email,
            "status": "pending",
        }
        sendFollowUserRequest(sendObj)
    }
    deleteUserFollow() {
        const { followUser, deleteFollowUser } = this.props
        deleteFollowUser(followUser.email)
    }
    render() {
        const { followUser } = this.props

        return (
            <div style={{ display: "flex", flexDirection: 'row' }}>
                <CardHeader
                style={{width:"100%"}}
                    avatar={
                        <Avatar aria-label="recipe" style={{ textTransform: 'capitalize' }}>
                            {followUser.displayName ? followUser.displayName[0] : 'N/A'}
                        </Avatar>
                    }
                    title={followUser.displayName}
                    subheader={followUser.email}
                    action={
                        <div style={{padding:"20px"}}>
                            {!followUser.pendingRequest && <Button
                                id={followUser.email}
                                color="primary"
                                variant="outlined"
                                size="small"
                                onClick={(e) => this.followRequest(e)}
                            >
                                Send Request
                                                </Button>}

                            {followUser.pendingRequest && <Button
                                id={followUser.email}
                                variant="outlined"
                                style={{color:"red"}}
                                size="small"
                                onClick={this.deleteUserFollow}
                            >
                                Cancle Request
                            </Button>}
                        </div>}
                />
            </div>

        )
    }
}
export default connect(state => ({
    user: state.get('auth').user,
    myalluserpost: state.get('auth').myalluserpost
})
    , dispatch => ({


    }))(AllUserCard)
