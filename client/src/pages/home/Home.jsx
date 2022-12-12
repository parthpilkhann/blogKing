import './home.css'
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import { useEffect, useState } from 'react';
import axios from "axios";
import { useLocation } from "react-router-dom"

export default function Home() {
    const [posts, setPosts] = useState([]);
    const { search } = useLocation();             //here we have extracted the search property directly from the object that the useLocation returns , which is 'search', which returns stuff after the "?" 
    console.log({ search });


    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get('/posts' + search);         // here we have added search afterward bc earlier it used to give all the posts whereas now it will posts of the username and if search is empty string, then all of them.
            console.log(res);
            setPosts(res.data);
        }
        fetchPosts();
    }, [search]);

    return (
        <div>
            <Header />
            <div className='home' >
                <Posts posts={posts} />
                <Sidebar />
            </div>
        </div>
    )
}
