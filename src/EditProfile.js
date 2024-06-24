import React, {useContext} from 'react';
import { AuthContext } from './contexts/AuthContext';
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import PageShadow from "./components/PageShadow";
import Footer from "./components/Footer";
import EditProfileHeader from "./components/profile/EditProfileHeader";

function EditProfile() {
    const { user } = useContext(AuthContext);

    return (
        <>
            <DocumentTitle title="Archive - Edit Profile"/>
            <Navbar searchbar="yes"/>
            <section className="editprofile">
                <div className="editprofile-inner view-width">
                    <EditProfileHeader username={user?.name}/>
                </div>
            </section>
            <PageShadow/>
            <Footer/>
        </>
    );
}

export default EditProfile;