import Sidebar from '../../components/sidebar/Sidebar'
import './settings.css'

export default function Settings() {
    return (
        <div className='settings' >
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className='settingsTitleUpdate' >Update Account</span>
                    <span className='settingsTitleDelete' >Delete Account</span>
                </div>
                <form className="settingsForm">
                    <div className="settingsPP">
                        <img className='settingsPPImage' src="https://media.istockphoto.com/photos/studio-shot-of-an-attractive-young-woman-posing-against-a-grey-picture-id1367668208?s=612x612" alt="not found" />
                        <label htmlFor="settingsPPIcon"><i className=" settingsPPIcon fa-solid fa-user"></i></label>
                        <input type="file" className="settingsPPIcon" id="settingsPPIcon" style={{ display: "none" }} />
                    </div>
                    <div className="settingsUpAcc">
                        <label >Username</label>
                        <input placeholder="Parth" type="text" name="text" className="settingsField" />
                        <label >Email</label>
                        <input placeholder="parth@gmail.com" type="email" name="email" className="settingsField" />
                        <label >Password</label>
                        <input placeholder="more than 8 letters" type="password" name="password" className="settingsField" />
                    </div>
                    <button className='updateBtn' type='submit' >Update</button>
                </form>
            </div>
            <Sidebar />
        </div>
    )
}
