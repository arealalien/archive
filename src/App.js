import React from 'react';
import { Route, Routes } from "react-router-dom";
import './css/main.css';
import Home from "./Home";
import SignUp from "./SignUp";
import Login from "./Login";
import Profile from "./Profile"
import EditProfile from "./EditProfile"
import Upload from "./Upload"
import Pictures from "./Pictures";
import Video from "./Video";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile/:username" element={<Profile/>}/>/>
          <Route path="/editprofile" element={<EditProfile/>}/>
          <Route path="/upload" element={<Upload/>}/>
          <Route path="/pictures" element={<Pictures/>}/>
          <Route path="/video" element={<Video/>}/>
      </Routes>
  );
}

export default App;
