const dbc = require('../mongodatabase')
const responseMixin= require('../responseStatus')
const uuid =require('uuid')
const followUser = async(body)=>{
    try{
        const { followBy, followByEmailId,followTo,followToEmailId,followAt,status,acceptedAt} = body
        const followId=uuid.v4()
        const conn = await dbc.dbConn();
        const followuser =await conn.collection("follow").insertOne({
            followBy,
            followByEmailId,
            followTo,
            followToEmailId,
            followAt:Date.now(),
            status,
            acceptedAt:Date.now(),
            followId
        })
        return responseMixin.success("sent friend request",followuser)   
    }catch(error){
        return responseMixin.error("Server Error",error)
    }
}
const deleteFollower = async (body) => {
    try{
    const conn = await dbc.dbConn()
    const {followByEmailId, followToEmailId} = body
    const delFollowerUser = await conn.collection('follow').deleteOne({followByEmailId,followToEmailId})
    return responseMixin.success("cancelled friend request",delFollowerUser)   
    }catch(error){
        console.log(error)
        return responseMixin.error(" server error",error)    
    }
    
}

const followPendingAccept = async(body) =>{
    try{
    let { pageNumber,pageSize,email} = body
    pageNumber=parseInt(pageNumber)
    pageSize=parseInt(pageSize)
    const conn = await dbc.dbConn();
    let pendingRequest=[];
    const fetchAcceptedRequest=await conn.collection("follow").find({followToEmailId:email,status:"pending"}).toArray();
    if(fetchAcceptedRequest.length>0){
        pendingRequest=fetchAcceptedRequest.map(acc=>{
            return acc.followByEmailId
        })
    }
    let fetchalluseracceptedList = await conn.collection("users").find({email:{'$in':pendingRequest}}).skip(pageNumber*pageSize).limit(pageSize).toArray();
    return responseMixin.success("accept friend request",fetchalluseracceptedList)
    }catch(error){
        return responseMixin.error("Server Error",error)
    }
}

const updateFollowRequest = async (body) => {
    try{
    const conn = await dbc.dbConn()
    const {followByEmailId, followToEmailId} = body
    const updateFollowerUser = await conn.collection('follow').updateOne({followByEmailId,followToEmailId},{'$set':{status:'accepted'}})
    return responseMixin.success(" Accepted Request Successfully",updateFollowerUser)   
    }catch(error){
        console.log(error)
        return responseMixin.error(" server error",error)    
    } 
}

module.exports={followUser,deleteFollower,followPendingAccept,updateFollowRequest}