import React from 'react';
import { useParams } from 'react-router-dom';
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import ProfileHeader from "./components/profile/ProfileHeader";
import ProfileSec from "./components/profile/ProfileSec";
import PageShadow from "./components/PageShadow";
import Footer from "./components/Footer";

function Profile() {
    const { username } = useParams();

    return (
        <>
            <DocumentTitle title={username + ` - Archive`}/>
            <Navbar searchbar="yes"/>
            <section className="profile">
                <div className="profile-inner view-width">
                    <ProfileHeader username={username} />
                    <ProfileSec />
                </div>
            </section>
            <PageShadow/>
            <Footer/>
        </>
    );
}

export default Profile;