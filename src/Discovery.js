import React, { useState } from 'react';
import ScrollBar from './components/ScrollBar';
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import VideosSec from "./components/videos/VideosSec";
import PageShadow from "./components/PageShadow";
import Footer from "./components/Footer";
import SideBarLeft from "./components/SideBarLeft";
import SideBarRight from "./components/SideBarRight";

function Discovery() {
    const [isSidebarMenuVisible, setSidebarMenuVisible] = useState(false);

    const toggleSidebarMenu = () => {
        setSidebarMenuVisible(prevState => !prevState);
    };

    return (
        <>
            <DocumentTitle title="Discovery - Archive"/>
            <Navbar searchbar="yes" toggleSidebarMenu={toggleSidebarMenu} />
            <div className="page">
                <SideBarLeft/>
                <ScrollBar className="page-center">
                    <div>
                        <p>Discovery - playlists</p>
                    </div>
                    <section className="videos">
                        <div className="videos-inner videos-inner-4 view-width">
                            <VideosSec/>
                        </div>
                    </section>
                    <Footer/>
                </ScrollBar>
                <SideBarRight isMenuVisible={isSidebarMenuVisible} />
            </div>
            <PageShadow/>
        </>
    );
}

export default Discovery;