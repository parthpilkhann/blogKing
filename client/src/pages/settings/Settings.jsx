import Sidebar from '../../components/sidebar/Sidebar'
import './settings.css'
import { useContext, useState } from 'react'
import { Context } from '../../context/Context';
import axios from 'axios';

export default function Settings() {
    const [file, setFile] = useState(null);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:5000/images/"


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" })
        const updatedUser = {
            userId: user._id,
            username: username,
            password: password,
            email: email,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.photo = filename;
            try {
                await axios.post("/upload", data)
            } catch (err) { }
        }
        try {
            const res = await axios.put("/users/" + user._id, updatedUser)
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
        }
    }


    return (
        <div className='settings' >
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className='settingsTitleUpdate' >Update Account</span>
                    <span className='settingsTitleDelete' >Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit} >
                    <div className="settingsPP">
                        <img className='settingsPPImage' src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="not found" />
                        <label htmlFor="settingsPPIcon"><i className=" settingsPPIcon fa-solid fa-user"></i></label>
                        <input type="file" className="settingsPPIcon" id="settingsPPIcon" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <div className="settingsUpAcc">
                        <label >Username</label>
                        <input placeholder={user.username} type="text" className="settingsField" onChange={(e) => setUsername(e.target.value)} />
                        <label >Email</label>
                        <input placeholder={user.email} type="email" className="settingsField" onChange={(e) => setEmail(e.target.value)} />
                        <label >Password</label>
                        <input type="password" className="settingsField" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className='updateBtn' type='submit' >Update</button>
                    {success && <span style={{ color: "green", textAlign: "center", marginTop: "20px" }} >Profile Updated</span>}
                </form>
            </div>
            <Sidebar />
        </div>
    )
}
