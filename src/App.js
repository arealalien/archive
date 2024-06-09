import React from 'react';
import { Route, Routes } from "react-router-dom";
import './css/main.css';
import Home from "./Home";
import SignUp from "./SignUp";
import Login from "./Login";
import Profile from "./Profile";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
      </Routes>
  );
}

export default App;
