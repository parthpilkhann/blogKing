import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home"
import Single from "./pages/single/Single"
import Write from "./pages/write/Write"
import Settings from "./pages/settings/Settings"
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

//notice the path in single, we will feed the post id to it(which post to be shown),
// note that single is just a page but we are actually using the singlePost component to show the post
function App() {
  const { user } = useContext(Context);

  return (
    <Router>
      <Topbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/post/:postId" element={<Single />} />                 {/* 'postId' written after colon is counted as variable and we did not write exact path bc of the same(it would keep changing with every different post id)*/}
        <Route exact path="/write" element={user ? <Write /> : <Register />} />
        <Route exact path="/settings" element={user ? <Settings /> : <Register />} />
        <Route exact path="/login" element={user ? <Home /> : <Login />} />
        <Route exact path="/register" element={user ? <Home /> : <Register />} />
      </Routes>
    </Router>
  );
}

export default App;