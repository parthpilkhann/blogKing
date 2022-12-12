import { Link } from 'react-router-dom'
import './login.css'
import axios from 'axios';
import { useRef, useContext } from 'react';
import { Context } from '../../context/Context';

// iss app ke 90% features use krne k liye hmara logged in hona jruri h, and user loggen in h ya nhi?.. 
//iss information ko components tak pohonchaane k liye we will use context api
// useContext hook lets u use a prop deep inside components so that we dont have to pass the props deep down one after another.


export default function Login() {

    const userRef = useRef();                               // a hook really similar to useState hook, the only diff is that it doesnot render the component when updated... see-- https://www.youtube.com/watch?v=t2ypzz6gJm0
    const passwordRef = useRef();                           // these are written in the input tags, they work as onChange...
    const { dispatch, isFetching, error } = useContext(Context);        // here we have imported dispatch, isFetching, user from Context which is called using 'useContext' hook... this hooks purpose is to call the 'Context' (from Context.jsx), where we need to use it.

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch({ type: 'LOGIN_START' });                              // we set the our states(user, isFetching etc..) to what is defined in "LOGIN-START"
        try {
            const res = await axios.post("/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value
            });
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });             // if there is an error in the request then the catch block will execute, if not then it would mean 'LOGIN_SUCESS' is called (from Reducer and the states are updated accordingly)... alse remember we defined a payload as well, we will update the payload value to res.data 
        } catch (err) {
            dispatch({ type: 'LOGIN_FAILURE' });
        }
    };

    return (
        <div className='login' >
            <span className="loginTitle">Login</span>
            <form className='loginForm'
                onSubmit={handleSubmit}
            >
                <label>Username</label>
                <input type="text"
                    placeholder='Enter your username'
                    ref={userRef}
                />
                <label>Password</label>
                <input
                    type="password"
                    placeholder='Enter password'
                    ref={passwordRef}
                />
                <button className='loginBtn' type='submit' disabled={isFetching} >Login</button>
                {error && <span style={{ color: "red", marginLeft: "13px", marginTop: "8px" }} >Something went wrong!</span>}
            </form>
            <button className='registerBtn' ><Link className='link' to='/register' >Register</Link></button>
        </div>
    )
}
