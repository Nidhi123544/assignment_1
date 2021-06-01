const dbc = require('../mongodatabase');
const userValitation = require('../validation/userValidation');
const responseMixin = require('../responseStatus');
const csv = require('csvtojson')
const uuid = require('uuid')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config')

const registerUser = async (body) => {
    try {
        let { error } = userValitation.userObject(body);
        if (error) {
            throw error.details[0].message;
        }
        let { displayName, email, password, confirmPassword, phone } = body
        const conn = await dbc.dbConn();
        const checkUser = await conn.collection('users').findOne({ email })
        if (checkUser) {
            throw "Email id already exist."
        }
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        password = await bcrypt.hash(password, salt);
        const insertUser = await conn.collection("users").insert({
            displayName, email, password, phone, apikey: uuid.v4(), joinedAt: Date.now()
        })
        return responseMixin.success("User Registered Successfully", insertUser)
    } catch (error) {
        return responseMixin.error(error.message, error)
    }
}


const loginUser = async (body) => {
    try {
        const conn = await dbc.dbConn();
        let { email, password } = body
        let user = await conn.collection("users").findOne({ email });
        if (user) {
            // check user password with hashed password stored in the database
            const validPassword = await bcrypt.compare(password, user.password);
            if(!validPassword) throw "Password doesn't match."
            let token = jwt.sign({ id: user.apikey }, config.jwt_secrete);
            return responseMixin.success("Login Successfully", { token, user})
        } else {
            throw "Email id doesn't exist"
        }
    } catch (error) {
        return responseMixin.error(error)
    }
}

const fetchUserByApikey = async (apikey)=>{
    const conn = await dbc.dbConn();
    return await conn.collection("users").findOne({ apikey });
}
const putUser = async (body) => {
    const conn = await dbc.dbConn();
    const { fname, address } = body
    const updateUser = await conn.collection('users').updateOne({
        fname
    }, {
        "$set": {
            address
        }
    });
    console.log(updateUser)
    return updateUser
}


const fetchAllUsers = async (body) => {
    try {
        console.log(body)
        let { pageNumber, pageSize, email } = body
        pageNumber = parseInt(pageNumber)
        pageSize = parseInt(pageSize)
        const conn = await dbc.dbConn();
        let query = {}, acceptedUser = [];
        const fetchMyAcceptedRequest = await conn.collection("follow").find({ followByEmailId: email, status: "accepted" }).toArray();
        //console.log(fetchMyAcceptedRequest)
        if (fetchMyAcceptedRequest.length > 0) {
            acceptedUser = fetchMyAcceptedRequest.map(acc => {
                return { email: { '$ne': acc.followToEmailId } }
            })
        }
        console.log(acceptedUser)
        const fetchMyRequested = await conn.collection("follow").find({ followToEmailId: email, status: "accepted" }).toArray();
        if (fetchMyRequested.length > 0) {
            acceptedUser = fetchMyRequested.map(acc => {
                return { email: { '$ne': acc.followByEmailId } }
            })
        }

        acceptedUser.push({ email: { '$ne': email } })
        query['$and'] = acceptedUser
        let fetchalluserList = await conn.collection("users").find(query).skip(pageNumber * pageSize).limit(pageSize).toArray();
        let fetchMyPendingRequest = await conn.collection("follow").find({ followByEmailId: email, status: "pending" }).toArray();
        if (fetchMyPendingRequest.length > 0) {
            fetchMyPendingRequest = fetchMyPendingRequest.map(pendingRequest => {
                return pendingRequest.followToEmailId
            });
            fetchalluserList = fetchalluserList.map(u => {
                if (fetchMyPendingRequest.indexOf(u.email) !== -1) {
                    u.pendingRequest = true
                    return u
                }
                return u
            })
        }

        return responseMixin.success(" Fetching All User  Successfully", fetchalluserList)
    } catch (error) {
        console.log(error)
        return responseMixin.error("Server Error", error)
    }
}
const fetchAllFriend = async (body) => {
    let { email, pageNumber, pageSize } = body;
    pageNumber = parseInt(pageNumber)
    pageSize = parseInt(pageSize)
    const conn = await dbc.dbConn();
    let emailIds = new Set()
    let fetchAllRequest = await conn.collection("follow").find({
        "$or": [
            { followByEmailId: email },
            { followToEmailId: email }
        ], status: "accepted"
    }).toArray();
    fetchAllRequest.map(req => {
        emailIds.add(req.followToEmailId)
        emailIds.add(req.followByEmailId)
    })
    emailIds = Array.from(emailIds).filter(e => e !== email);
    let findFriend = await conn.collection("users").find({ email: { "$in": emailIds } }).toArray();
    return responseMixin.success(" Fetching All User  Successfully", findFriend)
}

const fetchMutalFiend = async () => {

}
const regUser = async () => {
    try {
        let filepath = '/home/reverie-pc/Documents/myproject/python/Userdetails.csv'
        const jsonArray = await csv().fromFile(filepath);
        // console.log(jsonArray);
        const apiId = uuid.v4()
        const conn = await dbc.dbConn();
        const dummyObj = {
            "email": "",
            "password": "$2b$10$ox4RCslCgC7JBxeANh/aCe.y9yu5LwXhw8Ss5Xp5VHCVo4pK5Fs.K",
            "role": "freelancer",
            "phone": "",
            "skypeId": "",
            "otherContact": "",
            "apikey": "",
            "displayName": "",
            "displayImage": "",
            "coverImage": "",
            "organisationName": "",
            "birthday": "",
            "about": "",
            "billingAddress": "",
            "services": [],
            "languageService": [],
            "active": true,
            "bankDetails": {
                "accountNumber": {
                    "value": "",
                    "required": true
                },
                "accountType": {
                    "value": "",
                    "required": true
                },
                "bankName": {
                    "value": "",
                    "required": true
                },
                "accountName": {
                    "value": "",
                    "required": true
                },
                "ifscCode": {
                    "value": "",
                    "required": true
                },
                "micrCode": {
                    "value": "",
                    "required": false
                },
                "swiftCode": {
                    "value": "",
                    "required": false
                }
            },
            "educationDetails": [],
            "subjectMatterExpertise": [],
            "kycDetails": {
                "panCard": {
                    "documentUrl": "",
                    "documentNumber": "",
                    "required": true,
                    "status": ""
                },
                "roc": {
                    "documentUrl": "",
                    "documentNumber": "",
                    "required": true,
                    "status": ""
                },
                "gst": {
                    "documentUrl": "",
                    "documentNumber": "",
                    "required": true,
                    "status": ""
                },
                "aadhaar": {
                    "documentUrl": "",
                    "documentNumber": "",
                    "required": true,
                    "status": ""
                },
                "contract": {
                    "documentUrl": "",
                    "documentNumber": "",
                    "required": true,
                    "status": ""
                },
                "cancelledCheck": {
                    "documentUrl": "",
                    "documentNumber": "",
                    "required": true,
                    "status": ""
                }
            },
            "kycDocumentStatus": "",
            "rejectedDocuments": [],
            "razorPayDetails": "",
            "loggedIn": false,
            "accountValidity": "",
            "basicAccess": false,
            "marketplaceAccess": false,
            "marketplaceRating": 0,
            "createdOn": 1602262502542,
            "currentPlan": "",
            "kycVerified": false,
            "region": {
                "name": "India",
                "dialCode": "91",
                "countryCode": "in",
                "format": "+.. .....-....."
            },
            "availableCredit": "2000",
            "pricingPlan": {
                "planType": "trial",
                "creditNewWord": 0,
                "costs": 0,
                "createdAt": 1602262502374,
                "updatedOn": 1602262502374,
                "expires": false,
                "planValidity": 1617987198871,
                "credits": "2000",
                "language": 2
            }
        }
        let arr = []
        let exist = []
        for (let u of jsonArray) {
            let emailExist = await conn.collection('users').find({ email: u.email }).toArray()
            let phoneExits = await conn.collection('users').find({ phone: u.phone }).toArray()
            if (emailExist.length > 0 || phoneExits.length > 0) {
                exist.push({ u })
            }
            if (emailExist.length === 0 && phoneExits.length === 0) {
                let obj = Object.assign({}, dummyObj);
                obj["email"] = u.email
                obj["phone"] = u.phone
                obj["apikey"] = apiId
                arr.push(obj);
            }
        }

        console.log("new", arr.length)
        console.log("exist", exist.length);

        console.log(exist);


        return arr
    } catch (error) {
        console.log(error)
    }
}

const updateProfileImage =async(body, file)=>{
try {
    const {apikey}= body;
    const conn = await dbc.dbConn();
    await conn.collection("users").updateOne({apikey},{"$set":{profileUrl:file.path}})
    let user= await conn.collection("users").findOne({ apikey });
    return responseMixin.success("Profile picture updated successfully",user)
} catch (error) {
   return responseMixin.error(error)
}

}

module.exports = { registerUser, loginUser, putUser, fetchAllUsers, regUser, fetchAllFriend,fetchUserByApikey, updateProfileImage };