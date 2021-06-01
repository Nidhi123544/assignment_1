import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    Button,
    CardHeader, Avatar
} from '@material-ui/core'


class FriendCard extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        const { friend } = this.props
        return (
            <div >
                <div style={{ alignContent: "end" }}>
                    <CardHeader
                        style={{ width: "100%" }}
                        avatar={
                            <Avatar aria-label="recipe" style={{ textTransform: 'capitalize' }}>
                                {friend.displayName ? friend.displayName[0] : 'N/A'}
                            </Avatar>
                        }
                        title={friend.displayName}
                        subheader={friend.email}
                        action={
                            <div style={{ padding: "20px" }}>
                                <Button
                                    variant="outlined"
                                    style={{color:"red"}}
                                    size="small"
                                    disabled={true}
                                >
                                    Remove
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
    , dispatch => ({}))(FriendCard)
