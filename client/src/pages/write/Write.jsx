import axios from 'axios';
import { useState, useContext } from 'react'
import './write.css'
import { Context } from "../../context/Context"

export default function Write() {

    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            description
        };
        if (file) {                                     // this file is the photo which will be submitted from the '+' btn (type is submit)on the page, it will have a file name.
            const data = new FormData();                // it creates an empty form object, it provides a way to easily construct a set of key-value pair,which can easily be sent using fetch or XMLHttprequest or can be passed directly to urlparams, it can have different operations like append, delete, get,getall etc... https://developer.mozilla.org/en-US/docs/Web/API/FormData
            const filename = Date.now() + file.name;    // they are added to make the name unique
            data.append("name", filename);              // key-name...value-filename
            data.append("file", file);                  // key-file...value-the(.jpg or .png etc.) file
            newPost.photo = filename;                   // this filename could also have been added to newPost in above code, but then the if statement would not have any significance.
            try {
                await axios.post("/upload", data)
            } catch (err) { }
        }
        try {
            const res = await axios.post("/posts", newPost)             // here res is recorded in variable and when someone clicks publish, we want to transfer control to the single post page whose url will be-->
            window.location.replace("/post/" + res.data._id)            // here the url will be the /post/24243432423... where the no. is the id of the particular entry.
        } catch (err) { }
    }

    return (
        <div className='write' >
            <form className="writeForm" onSubmit={handleSubmit} >
                {file &&
                    <img className='writeFormImage' src={URL.createObjectURL(file)} alt="not found" />         /* this fn returns a string containing a url which uniquely identifies the object in the browser. https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL */
                }
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="fileInputIcon fa-solid fa-file-circle-plus"></i>
                    </label>
                    <input className='chooseFile' type="file" id='fileInput' style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />      {/* here in onChange the file is set to the first element in the files array, and since there is only one file being uploaded hence only that file is used. */}
                    <input className='writeInput' type="text" placeholder='Enter Title' autoFocus={true} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="writeFormGroup">
                    <textarea placeholder='Tell Your Story...' type="text" className="writeInput writeText" onChange={e => setDescription(e.target.value)} ></textarea>
                </div>
                <button className='writeSubmit' type='submit' >Publish</button>
            </form>
        </div>
    )
}
