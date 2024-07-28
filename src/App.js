import React from 'react';
import { Route, Routes } from "react-router-dom";
import './css/main.css';
import Home from "./Home";
import SignUp from "./SignUp";
import Login from "./Login";
import Search from "./Search";
import Profile from "./Profile"
import EditProfile from "./EditProfile"
import Creators from "./Creators"
import Upload from "./Upload"
import Pictures from "./Pictures";
import Video from "./Video";
import Settings from "./Settings";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/channel/:username" element={<Profile/>}/>/>
          <Route path="/channel/:username/videos" element={<Profile page="videos"/>}/>/>
          <Route path="/channel/:username/pictures" element={<Profile page="pictures"/>}/>/>
          <Route path="/channel/:username/playlists" element={<Profile page="playlists"/>}/>/>
          <Route path="/editprofile" element={<EditProfile/>}/>
          <Route path="/creators" element={<Creators/>}/>/>
          <Route path="/upload" element={<Upload/>}/>
          <Route path="/pictures" element={<Pictures/>}/>
          <Route path="/video" element={<Video/>}/>
          <Route path="/settings" element={<Settings page="account"/>}/>
          <Route path="/settings/profile" element={<Settings page="profile"/>}/>
          <Route path="/settings/account" element={<Settings page="account"/>}/>
          <Route path="/settings/content" element={<Settings page="content"/>}/>
      </Routes>
  );
}

export default App;
