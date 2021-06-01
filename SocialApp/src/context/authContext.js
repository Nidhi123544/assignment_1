import React,{createContext, useState} from 'react'

export const AuthContext = createContext();

export const initialState={
    displayName:'',
    email:'',
    phone:null,
    password:'',
    confirmPassword:''
}

export const AuthProvider =(props)=>{

    const [state, setAuthState]= useState({...initialState})

    return (
        <AuthContext.Provider     value={[state, setAuthState]}>
            {props.children}
        </AuthContext.Provider>
    )
}