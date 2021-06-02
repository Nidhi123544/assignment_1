/* eslint-disable jsx-a11y/alt-text */
import { Divider, Grid, IconButton, Paper, TextField, Typography, Button, Avatar } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import '../../../styles/Profile.css';
import { connect } from 'react-redux';
import AllUserCard from '../../../components/Cards/AllUserCard';
import userReducer from '../../../redux/actions/authReducer';
import followReducer from '../../../redux/actions/followReducer';
import FollowAcceptedCard from '../../../components/Cards/FollowAcceptedCard';
import FriendCard from '../../../components/Cards/FriendCard';
import { CreateNewFolder } from '@material-ui/icons';
import MyPostCard from '../../../components/Cards/MyPostCard';
import postsReducer from '../../../redux/actions/postReducer';
import toastr from 'toastr';
import { UserSuggestionContext, initialState } from '../../../context/userSuggestion';



const UserSuggestion = ({
    userReducer, user, newSuggestion, followReducer, newFriendRequest, friendList, myallpost, myposts,
    postsReducer
}) => {
    const [state, setState] = useContext(UserSuggestionContext)
    const fetchUserList = () => {
        userReducer.fetchAllUserPosts({ email: user.email, pageNumber: 0, pageSize: 2 });
    }
    const fetchUserFriendRequest = () => {
        followReducer.fetchPendingRequestFollowers({ email: user.email, pageNumber: 0, pageSize: 100 });
    }

    const fetchMyFriendList = () => {
        userReducer.fetchMyFriendList({ email: user.email, pageNumber: 0, pageSize: 100 });
    }

    useEffect(() => {
        fetchUserList()
        fetchUserFriendRequest();
        fetchMyFriendList();
        onGetMyPosts();
    }, []);

    const sendFriendRequest = (body) => {
        followReducer.sendFollowRequest(body).then(res => {
            if (res.success) fetchUserList();
        })
    }
    const deleteFriedRequest = (userEmailId) => {
        followReducer.deleteFollower({ followToEmailId: userEmailId, followByEmailId: user.email }).then(res => {
            if (res.success) {
                fetchUserList();
            }
        })
    }


    const acceptRequest = (requestEmailId) => {
        followReducer.acceptFollowRequest({ followToEmailId: user.email, followByEmailId: requestEmailId }).then(res => {
            if (res.success) {
                fetchUserFriendRequest();
                fetchMyFriendList();
                fetchUserList();
            }
        })
    }

    const onCreatePosts = () => {
        const { message, files } = state;
        if (!message) return toastr.warning("Please enter something in the to posts.");
        const formData=new FormData();
        formData.append("displayName", user.displayName)
        formData.append("email", user.email)
        formData.append("message", message)
        formData.append("images",files[0])
        postsReducer.createPosts(formData).then(res => {
            if (res && res.success) {
                setState({...initialState});
                onGetMyPosts();
            }
        });
    }
    //fetch all posts
    const onGetMyPosts = () => {
        postsReducer.fetchAllPosts({
            email: user.email, pageNumber: state.postPageNumber, pageSize: state.postPageSize
        });
    }

    // On click like icons from child component MyPostCard 
    const onAddLike = (postId) => {
        let findPost = myallpost.filter(p => p.postId === postId);
        if (findPost.length > 0) {
            let checkLikeExits = findPost[0].likes.filter(l => l.email === user.email);
            if (checkLikeExits.length > 0) return
        }
        postsReducer.likePost({
            postId, likesBy: { email: user.email, displayName: user.displayName, likeAt: Date.now() }
        }).then(res => res.success ? onGetMyPosts() : null)
    }

    const deleteUserPost = (postId) => {
        postsReducer.deletePost({ postId }).then(res => res.success ? onGetMyPosts() : null)
    }

    return <div className="profile">
        <Grid container justify="center" spacing={8}>
            <Grid item sm={12} xs={12} md={4} lg={3}>
                <Paper style={{ padding: "20px" }}>
                    <Typography>My Friend List ({friendList.length})</Typography>
                    <br />
                    <Divider />
                    <br />
                    <div>
                        <div>
                            {friendList.length > 0 && friendList.map(friend => <FriendCard
                                key={friend._id}
                                friend={friend}
                            />
                            )}
                            {friendList.length === 0 && <div style={{ textAlign: "center" }}>
                                <Typography>No friend are found..</Typography></div>}
                        </div>
                    </div>
                </Paper>
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={6}>
                <Paper style={{ padding: "20px" }}>
                    <Typography>New Friend Suggestion ({newSuggestion.length}) </Typography>
                    <br />
                    <Divider />
                    <br />
                    <div>
                        {newSuggestion.length > 0 && newSuggestion.map(newUser => <AllUserCard
                            key={newUser._id}
                            followUser={newUser}
                            sendFollowUserRequest={sendFriendRequest}
                            deleteFollowUser={deleteFriedRequest}
                        />
                        )}
                        {newSuggestion.length === 0 && <div style={{ textAlign: "center" }}>
                            <Typography>No user suggestion found..</Typography></div>}
                    </div>
                </Paper>
                <div style={{ marginTop: "20px" }}>
                    <Paper style={{ padding: '20px', boxShadow: 'none' }}>
                        <IconButton style={{ padding: '5px', color: "#5b78c7", cursor: "none" }} >
                            <CreateNewFolder />
                        </IconButton>
                        <Typography variant="button" style={{ paddingLeft: "5px", color: "#5b78c7" }} gutterBottom>
                            Post something in your mind.
                                </Typography>
                        <Divider />
                        <div style={{ padding: '20px' }}>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                value={state.message}
                                style={{ width: "100%" }}
                                onChange={e => setState({ ...state, message: e.target.value })}
                                rows={4}
                                placeholder="Write something in like to share"
                                variant="outlined"
                            />
                            <div style={{ marginTop: '10px', alignContent: "end", textAlign:"start" }}>
                                <Button variant="contained" color="primary" onClick={(e) => onCreatePosts(e)} >Publish</Button>
                                <Button variant="contained" color="secondary" component="label" style={{ marginLeft: "5px", alignContent: "end" }}>
                                    Add Photo
                                <input type="file" hidden onChange={(e) => {
                                    state.files.length < 1 ? setState({ ...state, files: e.target.files }) : toastr.warning("You can't upload more that one file.")
                                    }} />
                                </Button>
                                <Button>
                                {state.files && state.files.length > 0 && 
                                         <Avatar src={URL.createObjectURL(state.files[0])} style={{ borderRadius:'0px', marginLeft: "5px" }}  />
                                }
                                </Button>
                            </div>
                        </div>
                    </Paper>
                </div>
                <div style={{ marginTop: "20px" }}>
                    {myallpost.length > 0 && myallpost.map(post => (
                        <MyPostCard
                            key={post.postId}
                            post={post}
                            onAddLike={onAddLike}
                            postsReducer={postsReducer}
                            onGetMyPosts={onGetMyPosts}
                            deleteUserPost={deleteUserPost}
                        />
                    ))}
                </div>

            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={3}>
                <Paper style={{ padding: "20px" }}>
                    <Typography>Friend Request ({newFriendRequest.length}) </Typography>
                    <br />
                    <Divider />
                    <br />
                    <div>
                        {newFriendRequest.length > 0 && newFriendRequest.map(pendingRequest => <FollowAcceptedCard
                            key={pendingRequest._id}
                            pendingRequest={pendingRequest}
                            acceptRequest={acceptRequest}
                        />
                        )}
                        {newFriendRequest.length === 0 && <div style={{ textAlign: "center" }}>
                            <Typography>No Request found..</Typography></div>}
                    </div>
                </Paper>
            </Grid>
        </Grid>
    </div>
}

export default connect(
    state => ({
        user: state.get('auth').user,
        newSuggestion: state.get('auth').myalluserpost,
        newFriendRequest: state.get('follows').pendingfollowers,
        friendList: state.get('auth').friendList,
        myallpost: state.get('posts').myallpost
    }),
    dispatch => ({
        userReducer: userReducer.getActions(dispatch),
        followReducer: followReducer.getActions(dispatch),
        postsReducer: postsReducer.getActions(dispatch)
    })
)(UserSuggestion);