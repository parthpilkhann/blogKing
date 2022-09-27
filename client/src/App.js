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
const user = false;

//notice the path in single, we will feed the post id to it(which post to be shown),
// note that single is just a page but we are actually using the singlePost component to show the post
function App() {
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/post:postId" element={<Single />} />
        <Route exact path="/write" element={ user? <Write /> : <Register/>} />
        <Route exact path="/settings" element={ user? <Settings /> : <Register/>} />
        <Route exact path="/login" element={user ? <Home/> : <Login />} />
        <Route exact path="/register" element={user ? <Home/> : <Register />} />
      </Routes>
    </Router>
  );
}

export default App;