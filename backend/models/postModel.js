const dbc = require('../mongodatabase');
const responseMixin = require('../responseStatus');
const uuid = require('uuid')
const commentModel = require('./commentModel');

const createPost = async (body, file) => {
    try {
        const { displayName, email, message, comments } = body
        const postId = uuid.v4()
        const commentID = uuid.v4()
        const conn = await dbc.dbConn();
        const postUser = await conn.collection("posts").insertOne({
            displayName, email, message, comments, likes:[], images:[], tags:[], shares:[],
            imageUrl: file ? file.path:null, likeCount:0, commentCount:0, postId, commentID, createdAt: Date.now()
        })
        return responseMixin.success("User Posting Successfully", postUser)
    } catch (error) {
        return responseMixin.error("Server Error", error)
    }
}

const fetchPostByEmailId = async (body) => {
    try {
        console.log(body)
        let { email, pageNumber, pageSize } = body
        pageNumber = parseInt(pageNumber)
        pageSize = parseInt(pageSize)
        const conn = await dbc.dbConn();
        const fetchPosts = await conn.collection("posts").find({ email }).sort({ _id: -1 }).skip(pageNumber * pageSize).limit(pageSize).toArray();
        return responseMixin.success(" Fetching User Posting Successfully", fetchPosts)
    } catch (error) {
        return responseMixin.error("Server Error", error)
    }
}

const fetchPosts = async (body) => {
    try {
        console.log(body)
        let { pageNumber, pageSize } = body
        pageNumber = parseInt(pageNumber)
        pageSize = parseInt(pageSize)
        const conn = await dbc.dbConn();
        const fetchPosts = await conn.collection("posts").find({}).sort({ _id: -1 }).skip(pageNumber * pageSize).limit(pageSize).toArray();
        return responseMixin.success(" Fetching User Posting Successfully", fetchPosts)
    } catch (error) {
        return responseMixin.error("Server Error", error)
    }
}

const updatePostLike = async (body) => {
    try {
        const conn = await dbc.dbConn();
        const { postId, likesBy } = body // postID and likesBy come from postman
        const { displayName, email, likeAt } = likesBy
        const updateUserPost = await conn.collection('posts').updateOne(
            { postId },
            {
                "$inc": { likeCount: 1 },
                "$push": {
                    "likes": {
                        email,
                        displayName,
                        likeAt
                    }
                }
            })
        return responseMixin.success("Liked", updateUserPost)

    } catch (error) {
        console.log(error)
        return responseMixin.error("Server Error")
    }
}

const updateCommentPost = async (body) => {
    try {
        const { postId, commentBy } = body
        const { displayName, email, commentMessage } = commentBy
        const conn = await dbc.dbConn();
        const addComment = await commentModel.createPostComment({
            postId, displayName, email, commentMessage,
        })
        await conn.collection('posts').updateOne({ postId }, { "$inc": { commentCount: 1 } })
        return responseMixin.success("Commented", addComment)
    } catch (error) {
        console.log(error)
        return responseMixin.error("Server Error", error)
    }
}

const deletePost = async (body) => {
    try {
        console.log(body)
        const conn = await dbc.dbConn();
        const { postId } = body;
        const delPost = await conn.collection('posts').deleteOne({ postId })
        return responseMixin.success("Post deleted successfully", delPost)
    } catch (error) {
        console.log(error);
        return responseMixin.error("Server error", error)
    }
}

module.exports = { createPost, fetchPostByEmailId, fetchPosts, updatePostLike, updateCommentPost, deletePost }
