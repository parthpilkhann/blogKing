import { Link } from 'react-router-dom'
import './register.css'

export default function Register() {
    return (
        <div className='register' >
            <span className="registerTitle">Register</span>
            <form className='registerForm'>
            <label htmlFor="">Username</label>
                <input type="text" placeholder='Enter Username' />
                <label htmlFor="">Email</label>
                <input type="text" placeholder='Enter your email' />
                <label htmlFor="">Password</label>
                <input type="password" placeholder='Enter password' />
                <button className='registerButton' >Register</button>
            </form>
            <button className='registerLoginButton' ><Link className='link' to='/Login' >Login</Link></button>
        </div>
    )
}
