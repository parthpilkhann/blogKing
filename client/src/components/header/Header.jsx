import './header.css'

export default function Header() {
    return (
        <div className='header'>
            <div className="headerTitles">
                <span className='headerTextSm'>React</span>
                <span className='headerTextLg'>Blog</span>
            </div>
            <img className='headerImage' src="https://images.pexels.com/photos/67517/pexels-photo-67517.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="not found" />
        </div>
    )
}
