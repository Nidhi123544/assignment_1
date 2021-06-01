const dbc = require('../mongodatabase');
const responseMixin= require('../responseStatus');
const uuid =require('uuid')

const createPostComment = async (body) => {
    try {
        const {postId, displayName,email,commentMessage } = body
        const commentId=uuid.v4()
        const conn=await dbc.dbConn();
        const commentPost = await conn.collection("comments").insertOne({ 
            displayName, 
            email,
            postId,
            commentId,
            commentMessage,
            likeCount:0,
            likes:[],
            commentAt:Date.now()
        })
        return commentPost   
    } catch (error) {
        console.log(error);
        return responseMixin.error("Server Error",error)
    }
}
const fetchPostComment = async (body) => {
    try {
        const { postId } = body
        const conn=await dbc.dbConn();
        const commentList = await conn.collection("comments").find({postId}).sort({_id:-1}).toArray();
        return responseMixin.success("Comments lists",commentList)   
    } catch (error) {
        console.log(error);
        return responseMixin.error("Server Error",error)
    }
}

module.exports ={createPostComment, fetchPostComment}
