import './posts.css'
import Post from "../post/Post"


export default function Posts(props) {                      // here we could have writte '{posts}' directly instead of 'props'...same thing

    return (
        <div className='posts' >
            {props.posts.map((p, i) => {                         /* we always need a return statement in map fn...please read below comments  */
                return <Post post={p} key={i} />                        /* the "post" we passed as prop is different from the other post */
            })}
        </div>
    )
}

// we could have written below code instead of above
//      {posts.map(e => (
//          <Post/>
//      ))}
// note 1...in above code direct props name is written
//      2...in the map fn we have not written the return statement b/c we have wrapped <Post/> in paranthesis,
//          instead of curly braces which means whatever is on paranthesis after map fn is returned.