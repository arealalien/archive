import React, { useState } from 'react';
import ScrollBar from './components/ScrollBar';
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import PageShadow from "./components/PageShadow";
import Footer from "./components/Footer";
import SideBarLeft from "./components/SideBarLeft";
import SideBarRight from "./components/SideBarRight";
import CreatorsSec from "./components/creator/CreatorsSec";

function Creators() {
    const [isSidebarMenuVisible, setSidebarMenuVisible] = useState(false);

    const toggleSidebarMenu = () => {
        setSidebarMenuVisible(prevState => !prevState);
    };

    return (
        <>
            <DocumentTitle title="Archive"/>
            <Navbar searchbar="yes" toggleSidebarMenu={toggleSidebarMenu} />
            <div className="page">
                <SideBarLeft/>
                <ScrollBar className="page-center">
                    <section className="creators">
                        <div className="creators-inner view-width">
                            <CreatorsSec/>
                        </div>
                    </section>
                </ScrollBar>
                <SideBarRight isMenuVisible={isSidebarMenuVisible}/>
            </div>
            <PageShadow/>
            <Footer/>
        </>
    );
}

export default Creators;