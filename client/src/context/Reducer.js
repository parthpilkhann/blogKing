// useReducer hook is used when our multiple pecies of state rely on complex logic to change, hence to handle all of them we use switch statements, 
// basically it is an alternative to useState...in this we can define multiple states all at once and use switch cases for updating them

const Reducer = (state, action) => {            // when reducer is firsst called it has the INITIAL_STATE(defined in context) and when we recieve the state in parameters it looks for the case in switch statement which matches our state.
    switch (action.type) {                      // action is an object
        case "LOGIN_START":                        // if this case matches, the states defined in INITIAL_STATE will change to below.
            return {
                user: null,
                isFetching: true,               // as the name suggests this state will be used to check if the page or value still being fetched.will be used in putting a spinner
                error: false
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,           //hmne yha user ki state update krke action.payload ke equal krdi (action.payload means login ke baad jo user ka naam hme backend se milega)
                isFetching: false,
                error: false
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true
            }
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false
            }
        case "UPDATE_START":
            return {
                ...state,                   // everything will be the same as initial state, except isFetching
                isFetching: true
            }
        case "UPDATE_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false
            }
        case "UPDATE_FAILURE":
            return {
                user: state.user,
                isFetching: false,
                error: true
            }
        default:
            return state;               // if none of the above case matches the state from parameters the reducer returns the state which it got in parameters, as it is
    }
};
export default Reducer;         // now this functio can be used in Context.js