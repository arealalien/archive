import React from 'react';
import { Route, Routes } from "react-router-dom";
import './css/main.css';
import Home from "./Home";
import SignUp from "./SignUp";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUp/>}/>
      </Routes>
  );
}

export default App;
