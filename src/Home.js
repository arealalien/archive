import React from 'react';
import './css/main.css';

// Components
import Navbar from "./components/Navbar";
import VideosSec from "./components/VideosSec";
import PageShadow from "./components/PageShadow";

function Home() {
    return (
        <>
            <Navbar searchbar="yes"/>
            <VideosSec/>
            <PageShadow/>
        </>
    );
}

export default Home;