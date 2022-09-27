import './sidebar.css'

export default function Sidebar() {
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
                    <li className="sidebarListItem">Tech</li>
                    <li className="sidebarListItem">Cinema</li>
                    <li className="sidebarListItem">Travel</li>
                    <li className="sidebarListItem">Music</li>
                    <li className="sidebarListItem">Style</li>
                    <li className="sidebarListItem">Sport</li>
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
