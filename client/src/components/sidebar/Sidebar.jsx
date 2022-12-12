import { useEffect, useState } from 'react'
import './sidebar.css'
import axios from "axios";
import { Link } from "react-router-dom"

export default function Sidebar() {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const fetchCat = async () => {
            const res = await axios.get('/categories');
            setCategories(res.data);
        }
        fetchCat();
    }, [categories]);

    return (
        <div className='sidebar' >
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT</span>
                <img className='sidebarImage' src="https://images.pexels.com/photos/13615406/pexels-photo-13615406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Not found" />
                <p className='sidebarText' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sit consectetur eum numquam, unde adipisci aspernatur vitae. Enim quo deleniti corrupti reprehenderit hic natus at, asperiores eum perferendis nemo quisquam.</p>
            </div>
            <div className="sidebarItem">
                <span className='sidebarTitle'>CATEGORIES</span>
                <ul className="sidebarList">
                    {categories.map((c, i) => {
                        return (
                            <Link className='link' key={i} to={`/?cat=${c.name}`} >
                                <li className="sidebarListItem">{c.name}</li>
                            </Link>
                        )
                    })}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CONTACT</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fa-brands fa-square-facebook"></i>
                    <i className="sidebarIcon fa-brands fa-square-twitter"></i>
                    <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
                    <i className="sidebarIcon fa-brands fa-square-instagram"></i>
                </div>
            </div>
        </div>
    )
}
