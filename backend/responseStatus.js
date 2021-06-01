

const success =(message,data)=>{
    return {
        success:true,
        message:message,
        data:data
    }
}



const error = (message,data)=>{
    return {
        success:false,
        message:message,
        data:data
    }
}

module.exports={success, error}; 