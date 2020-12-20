import React, {useContext, useReducer} from "react"


// INITIAL STATE

const initialState = {
    url: 'http://localhost:3000',
    token: null,
    username: null
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
                newState = {...state, token: null, username: null, notes: null}
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

