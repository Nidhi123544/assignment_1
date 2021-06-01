const MongpClient=require("mongodb").MongoClient
const MongoUrl = "mongodb://localhost:27017"

module.exports={
    dbConn:function(){
        return new Promise((resolve,reject)=>{
            MongpClient.connect(MongoUrl,{ useUnifiedTopology: true },(error,db)=>{
                if(error) reject(error)
                const dbc=db.db("myproject")
                resolve(dbc)
            })
        })
    }
}