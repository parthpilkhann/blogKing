import { useEffect } from "react";
import { createContext, useReducer } from "react"
import Reducer from "./Reducer";
// note that the main purpose of this whole context api is to pass on the information to any component, wherever it may be.
// the information will be about user (if it is logged in or not),(the username of user) etc which will be used in various components (like write etc.) in our app

// the context api is like a better version of using useState is bulk, ex- we made context,actions,reducer etc. files
// but we could also write the states present in iNITIAL_STATE as:->
// const [user, setUser] = useState(null);
// const [isFetching, setIsFetching] = useState(false);
// const [error, setError] = useState(false);
// and then drill these as props in the components., but we used context api instead

const INITIAL_STATE = {             //initial state is defined here... the argument 'state' in reducer.jsx refers to these states namely(user, isFetching, Error).. when reducer if called for the first time these states has values=initialvalue
    //and when we click login we'll change these states accordingly if we fail the process or pass the process.. and those actions will be stored in action.jsx
    user: JSON.parse(localStorage.getItem("user")) || null,             // we are fetching it from local storage, bc down in useEffect whwnever new user logs in or user gets changed, it gets stored in localStorage from where it can be fetched (see Login.jsx)...note thta if there is nothing in local storage then the value is null.                 
    isFetching: false,
    error: false
}

export const Context = createContext(INITIAL_STATE);


export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);           //this hook is similar to useState, basically this hook takes the INITIAL_STATE and passes it to state parameter in Reducer fn, and whenever and wherever the dispatch is used then the reducer runs and returns the updated state.

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))            // logging in with user is not enough, we need to store it in local storage so that incase we have logged in and if we refresh then we can fetch the user from local storage.
    }, [state.user])                                                        // above in INITIAL_STATE we have already set the user to null(default case), now if someone logs in, dispatch are run(refer login.jsx) and the state.user is changed, which causes this useEffect to fire and change the user...this user can now be accessed from anywhere using context.(ex--in app.js )

    return (
        <Context.Provider value={{                                          // this contextProvider tag is wrapped around the highest tag in heirarchy(<App/> in index.js, or everything in app.js) and all the values are passed down to everything present( basically it is done so that anybody can access these values ) 
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch                                              // dispatch's purpose is to trigger the state change (ex- we want to change state from INITIAL_STATE to LOGIN-START... we will write--> dispatch({ type: "LOGIN_START" });   )
        }} >
            {children}</Context.Provider>                       // IMP NOTE--> this Context.provider is different from ContextProvider that we wrap around app.js
    )
}


