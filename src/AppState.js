import React, {useContext, useReducer} from "react"


// INITIAL STATE
// https://gamergazeboapi.herokuapp.com
// http://localhost:3000
const initialState = {
    url: 'https://gamergazeboapi.herokuapp.com',
    token: null,
    username: null,
    user_id: 0
}


/////

//Reducer
////////////
//action = {type: "", payload: }
const reducer = (state, action) => {
        let newState;
        switch (action.type) {
            case "auth":
                newState = {...state, ...action.payload};
                return newState
                break;
            case "logout":
                newState = {...state, token: null, username: null}
                window.localStorage.removeItem("auth")
                return newState;
                break;
            default:
                return state;
                break;
        }
}
/////////////////////
//APP CONTEXT///

const AppContext = React.createContext(null)

export const AppState = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <AppContext.Provider value ={{state, dispatch}}>
        {props.children}
    </AppContext.Provider>
}

//////////////
//useAppState Hook
/////////////

export const useAppState = () => {
    return React.useContext(AppContext)
}

