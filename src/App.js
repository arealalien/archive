import React from 'react';
import { Route, Routes } from "react-router-dom";
import './css/main.css';
import Home from "./Home";
import Discovery from "./Discovery";
import SignUp from "./SignUp";
import Login from "./Login";
import Search from "./Search";
import Profile from "./Profile"
import Creators from "./Creators"
import Upload from "./Upload"
import Playlist from "./Playlist";
import Video from "./Video";
import Settings from "./Settings";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/discovery" element={<Discovery/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/channel/:username" element={<Profile/>}/>/>
          <Route path="/channel/:username/:page" element={<Profile/>}/>/>
          <Route path="/creators" element={<Creators/>}/>/>
          <Route path="/upload" element={<Upload/>}/>
          <Route path="/playlist" element={<Playlist/>}/>
          <Route path="/video" element={<Video/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/settings/:page" element={<Settings/>} />
      </Routes>
  );
}

export default App;
