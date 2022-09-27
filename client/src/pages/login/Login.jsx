import { Link } from 'react-router-dom'
import './login.css'

export default function Login() {
    return (
        <div className='login' >
            <span className="loginTitle">Login</span>
                <form className='loginForm'>
                    <label htmlFor="">Email</label>
                    <input type="text" placeholder='Enter your email' />
                    <label htmlFor="">Password</label>
                    <input type="password" placeholder='Enter password' />
                    <button className='loginBtn' >Login</button>
                </form>
            <button className='registerBtn' ><Link className='link' to='/register' >Register</Link></button>
        </div>
    )
}
