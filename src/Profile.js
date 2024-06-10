import React from 'react';
import './css/main.css';

// Components
import Navbar from "./components/Navbar";
import ProfileSec from "./components/profile/ProfileSec";
import PageShadow from "./components/PageShadow";
import Footer from "./components/Footer";

function Profile() {
    return (
        <>
            <Navbar searchbar="yes"/>
            <ProfileSec/>
            <PageShadow/>
            <Footer/>
        </>
    );
}

export default Profile;