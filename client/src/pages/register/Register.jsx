import { useState } from 'react'
import { Link } from 'react-router-dom'
import './register.css'
import axios from "axios"

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post("/auth/register", {
                username,
                password,
                email
            })
            res.data && window.location.replace("/login")
        } catch (error) {
            setError(true)
        }
    }

    return (
        <div className='register' >
            <span className="registerTitle">Register</span>
            <form className='registerForm' onSubmit={handleSubmit}>
                <label htmlFor="">Username</label>
                <input type="text" placeholder='Enter Username' onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="">Email</label>
                <input type="text" placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="">Password</label>
                <input type="password" placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />
                <button className='registerButton' type='submit' >Register</button>
                {error && <span style={{ color: "red", marginLeft: "13px", marginTop: "8px" }} >Something went wrong!</span>}
            </form>
            <button className='registerLoginButton' ><Link className='link' to='/Login' >Login</Link></button>
        </div>
    )
}
// while registering a form keep these few things in mind, in inputs use onChange,
//  which will return the value written in the textbox in real-time.
//the button used to submit the form should be given a type='submit'.
// for handling the submit, the onSubmit fn should be used which is to be written in the form tag itself.