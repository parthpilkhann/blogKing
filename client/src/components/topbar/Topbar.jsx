import './topbar.css'
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Topbar() {
    const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:5000/images/"

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
    }

    // in the link tag we had to write 'style={{textDecoration:"none", color: "inherit"}}' bc it is basically a anchor tag which is turned into Link and 
    //it has default properties, to remove those we added none, and for the color we inherited that from its parent.
    // we could do the same thing by universally declaring a class called 'link' and writing the above style in that
    // and placing it in index.html which will make it global and we wont have to write the styles again and again.

    // in logout line we will show the logout btn only when user is logged in.

    // same thing will be done for the profilepic (i.e image tag), if there is no user logged in then 
    //we will add list items (login and register), jisko ham same class names denge jo home, about vagera ki h, taki font copy hojaye.

    return (
        <div className='top' >
            <div className='topLeft'>
                <i className="topIcon fa-brands fa-square-facebook"></i>
                <i className="topIcon fa-brands fa-square-twitter"></i>
                <i className="topIcon fa-brands fa-square-pinterest"></i>
                <i className="topIcon fa-brands fa-square-instagram"></i>
            </div>

            <div className='topCenter'>
                <ul className='topList'>
                    <li className='topListItem'><Link className='link' to='/' >HOME</Link></li>
                    <li className='topListItem'><Link className='link' to='/about' >ABOUT</Link></li>
                    <li className='topListItem'><Link className='link' to='/contact' >CONTACT</Link></li>
                    <li className='topListItem'><Link className='link' to='/write' >WRITE</Link></li>
                    <li className='topListItem' onClick={handleLogout} > {user && 'LOGOUT'}</li>
                </ul>
            </div>
            <div className='topRight'>
                {
                    user ? <Link to="/settings" ><img className='topImage' alt='' src={PF + user.profilePic} /></Link>
                        : (<ul className='topList' >
                            <li className='topListItem'><Link className='link' style={{ fontSize: '15px' }} to='/login' >LOGIN</Link></li>
                            <li className='topListItem' ><Link className='link' style={{ fontSize: '15px' }} to='register' >REGISTER</Link></li>
                        </ul>)
                }
                <i className=" searchIcon fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    )
}
