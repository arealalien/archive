import React from 'react';
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import ProfileSec from "./components/profile/ProfileSec";
import PageShadow from "./components/PageShadow";
import Footer from "./components/Footer";

function Profile() {
    return (
        <>
            <DocumentTitle title="Archive - Profile"/>
            <Navbar searchbar="yes"/>
            <ProfileSec/>
            <PageShadow/>
            <Footer/>
        </>
    );
}

export default Profile;