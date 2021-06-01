import React, { createContext, useState } from 'react';

export const ProfileContext = createContext();

export const initialState = {
    dob: '',
    aboutMe: '',
    displayName:'',
    phone:'',
    files:[]
}
export const ProfileProvider = (props) => {
    const [state, setState] = useState({ ...initialState })
    return <ProfileContext.Provider value={[state, setState]}>
        {props.children}
    </ProfileContext.Provider>
}