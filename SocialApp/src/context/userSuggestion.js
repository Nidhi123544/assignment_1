import React, { createContext, useState } from 'react';

export const UserSuggestionContext = createContext();

export const initialState = {
    pageNumber: 0,
    pageSize: 2,
    postPageNumber:0,
    postPageSize:10,
    data: false,
    message: '',
    expanded: false,
    files:[]
}
export const UserSuggestionProvide = (props) => {
    const [state, setState] = useState({ ...initialState })
    return <UserSuggestionContext.Provider value={[state, setState]}>
        {props.children}
    </UserSuggestionContext.Provider>
}