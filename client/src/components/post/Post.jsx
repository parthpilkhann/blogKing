import "./post.css"
import { Link } from "react-router-dom";

export default function Post({ post }) {
    const PF = "http://localhost:5000/images/"

    return (
        <div className="post" >
            {post.photo && <img className="postImage" src={PF + post.photo} alt="Not found" />}
            <div className="postInfo">
                <div className="postCats">
                    {post.categories.map((c, i) => {
                        return <span key={c.name + i} className="postCat">{c.name}</span>
                    })}
                </div>
                <Link className='link' to={`/post/${post._id}`}>
                    <span className="postTitle">{post.title}</span>
                </Link>
                <hr />
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
                <p className="postDesc">{post.description}</p>
            </div>
        </div>
    )
}
