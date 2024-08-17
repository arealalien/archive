import React, { useState } from 'react';
import ScrollBar from './components/ScrollBar';
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import PicturesSec from "./components/pictures/PicturesSec";
import PageShadow from "./components/PageShadow";
import Footer from "./components/Footer";
import SideBarLeft from "./components/SideBarLeft";
import SideBarRight from "./components/SideBarRight";

function Pictures() {
    const [isSidebarMenuVisible, setSidebarMenuVisible] = useState(false);

    const toggleSidebarMenu = () => {
        setSidebarMenuVisible(prevState => !prevState);
    };

    return (
        <>
            <DocumentTitle title="Archive - Pcitures"/>
            <Navbar searchbar="yes" toggleSidebarMenu={toggleSidebarMenu} />
            <div className="page">
                <SideBarLeft/>
                <ScrollBar className="page-center">
                    <PicturesSec/>
                </ScrollBar>
                <SideBarRight isMenuVisible={isSidebarMenuVisible} />
            </div>
            <PageShadow/>
        </>
    );
}

export default Pictures;