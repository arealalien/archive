import React from 'react';
import './css/main.css';

// Components
import Navbar from "./components/Navbar";
import VideosSec from "./components/VideosSec";

function Home() {
    return (
        <>
            <Navbar/>
            <VideosSec/>
            <div className="pageshadow"></div>
        </>
    );
}

export default Home;