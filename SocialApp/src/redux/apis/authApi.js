import axios from 'axios'
import config from '../../utils/config'

export async function registerUser(body){
    return axios.post(`${config.backendUrl}/users/register`,body)
}

export async function loginUser(body){
    return axios.post(`${config.backendUrl}/users/login`,body)
}
export async function updatProfilePicture(formData){
    debugger
    return axios.post(`${config.backendUrl}/users/update/profile/picture`,formData)
}
export async function authCheck(){
    return axios.post(`${config.backendUrl}/users/auth/check`, null,{ 
        headers:{ token: window.localStorage.getItem("myproject") }
    })
}


export async function fetchAllUserPosts(params){
    return axios.get(`${config.backendUrl}/users/${params.email}/${params.pageNumber}/${params.pageSize}`)
}

export async function fetchMyFriendList(params){
    return axios.get(`${config.backendUrl}/users/friend/${params.email}/${params.pageNumber}/${params.pageSize}`)
}
