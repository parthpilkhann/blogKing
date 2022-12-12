import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom'
import './singlePost.css'
import { Context } from '../../context/Context';

export default function SinglePost() {
    const location = useLocation();                         // this returns the current url
    const path = location.pathname.split('/')[2];           // here we took out the id of the post from the current url
    const [post, setPost] = useState({});
    const PF = "http://localhost:5000/images/"          // this is the same thing tht we did in post.jsx, we accessed the image from images folder and displayed it here...refer api...index.js and post,jsx for more
    const { user } = useContext(Context);               // to access the current logged in user.
    const [title, setTitle] = useState("");             // these three variables are for updating post.
    const [description, setDescription] = useState("");
    const [updateMode, setUpdateMode] = useState(false);        // whn this is true we will be able to edit the title and description..for details refer thhe h1 below.


    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get("/posts/" + path);
            setPost(res.data);                            // the post variable is updated with data from the response of new post
            setTitle(res.data.title)                      // the title variable is updated with title from the res and that is shown in the title...and when we click edit it is shown by default in the input tag, the main use of this variable is to show the value of input tag by default.
            setDescription(res.data.description)
        }
        fetchPost();
    }, [path]);                                 // if the path changes the useEffect is triggered and the

    const handleDelete = async () => {
        try {
            await axios.delete("/posts/" + path, {
                data: { username: user.username }
            });
            window.location.replace("/");
        } catch (err) { }
    }

    const handleUpdate = async () => {
        try {
            await axios.put("/posts/" + path, {
                username: user.username,            // if the names are same they can also be written as title, description, etc.
                title: title,
                description: description
            });
            setUpdateMode(false);
        } catch (err) { }
    }

    return (
        <div className='singlePost' >
            <div className="singlePostWrapper">
                {post.photo && <img
                    src={PF + post.photo}
                    alt="not found"
                    className='singlePostImage'
                />}
                {updateMode ? <input className='singlePostTitleInput' type="text" value={title} autoFocus onChange={(e) => { setTitle(e.target.value) }} /> : (      /* here if the update Mode is true then we get inputTag in which our old title is already written and if not then the normal h1 is shown. */
                    <h1 className='singlePostTitle'>
                        {title}
                        {post.username === user?.username &&             /* if the username of post fetched from db is equal to the user that is logged in...then show these edit and delete buttons....also the purpose of ? is that if there is no  user it will not look at the username. */
                            <div className="singlePostEdit">
                                <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)} ></i> {/* first i had written 'onClick={setUpdateMode(true)}' which caused the input tag on start of the page, after using arrow fn we made sure that it binds to onClick action and does not get renderd right away...thus always use functions while using event handlers to avoid the execution at the time of rendering... https://stackoverflow.com/questions/62930655/whats-the-difference-between-onclick-function-and-onclick-functi */}
                                <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete} ></i>
                            </div>
                        }
                    </h1>
                )}
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author :
                        <Link className='link' to={`/?user=${post.username}`}><b>{post.username}</b></Link>         {/* imp note-- when clicked on the username we will be directed to the url="http...3000/?user={post.username}", now in home.jsx this username will then be extracted from url and all the posts of this username will be fetched (in home.jsx)whose logic is already written in our backend. */}
                    </span>                                                                                          {/* it was important to write '?user=' bc we are using useLocation in home.jsx and extracting everything from our url itself.  */}
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ? (<textarea className="singlePostDescInput" value={description} onChange={(e) => { setDescription(e.target.value) }} />)
                    : (
                        <p className='singlePostDesc' >{description}</p>
                    )}
                {updateMode && <button className='singlePostUpdateBtn' onClick={handleUpdate} >Update</button>}
            </div>
        </div>
    )
}

