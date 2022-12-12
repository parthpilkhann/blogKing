// these are the different functions that gets run according to the the situation(on start of fn --LoginStart,,, on successful login--LoginSuccess,,, on failure--LoginFailure)
// basically these are the functions which are called according to the cases present in reducer.jsx , 
// in functions me properties defined h jo reducer.jsx me call ki jaengi... (ex- action.payload)(yha payload ki value 'user' h (jo hme backend se milegi)) 
// https://www.pluralsight.com/guides/how-to-write-redux-reducer 

export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START"                              // thse are the properties of the 'action' (parametr in reducer) 
})

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
})

export const LoginFailure = () => ({
    type: "LOGIN_FAILURE"
})
export const Logout = () => ({
    type: "LOGOUT"
})
export const UpdateStart = (userCredentials) => ({
    type: "UPDATE_START"                              // thse are the properties of the 'action' (parametr in reducer) 
})

export const UpdateSuccess = (user) => ({
    type: "UPDATE_SUCCESS",
    payload: user,
})

export const UpdateFailure = () => ({
    type: "UPDATE_FAILURE"
})



