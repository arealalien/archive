import React from 'react';
import './css/main.css';

// Components
import Navbar from "./components/Navbar";
import ProfileSec from "./components/ProfileSec";
import VideosSec from "./components/VideosSec";
import PageShadow from "./components/PageShadow";
import Footer from "./components/Footer";

function Profile() {
    return (
        <>
            <Navbar searchbar="yes"/>
            <ProfileSec/>
            <VideosSec startcolums="3"/>
            <PageShadow/>
            <Footer/>
        </>
    );
}

export default Profile;