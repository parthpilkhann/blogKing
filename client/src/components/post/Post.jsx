import "./post.css"
import { Link } from "react-router-dom";

export default function Post() {
    return (
        <div className="post" >
            <img className="postImage" src="https://images.pexels.com/photos/13461809/pexels-photo-13461809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Not found" />
            <div className="postInfo">
                <div className="postCats">
                    <span className="postCat">Music</span>
                    <span className="postCat">Life</span>
                </div>
                <span className="postTitle"><Link className='link' to='/post:postId'>Lorem ipsum dolor sit.</Link></span>
                <hr />
                <span className="postDate">1 hour ago</span>
                <p className="postDesc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nulla nostrum autem libero pariatur maiores officiis consequuntur ipsum quasi fugiat numquam sunt sit necessitatibus id distinctio placeat consequatur illo quas, totam similique quibusdam molestiae quaerat minima dignissimos. Libero consequuntur excepturi commodi ut, quia nobis accusamus reiciendis, esse veniam adipisci debitis dolore rem, molestias aliquid magni aliquam. Nemo libero perferendis corrupti quibusdam, laborum alias explicabo debitis facere maxime, ex praesentium nesciunt aut recusandae minus aspernatur culpa reprehenderit deleniti mollitia quos perspiciatis? Consectetur dolores corporis beatae cumque, non cum eaque!</p>
            </div>
        </div>
    )
}
