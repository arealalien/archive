import React, { useState } from 'react';
import ScrollBar from './components/ScrollBar';
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import UploadForm from "./components/upload/UploadForm";
import SideBarLeft from "./components/SideBarLeft";
import SideBarRight from "./components/SideBarRight";

function Upload() {
    const [isSidebarMenuVisible, setSidebarMenuVisible] = useState(false);

    const toggleSidebarMenu = () => {
        setSidebarMenuVisible(prevState => !prevState);
    };

    return (
        <>
            <DocumentTitle title="Archive - Upload"/>
            <Navbar searchbar="yes" toggleSidebarMenu={toggleSidebarMenu} />
            <div className="page">
                <SideBarLeft/>
                <ScrollBar className="page-center">
                    <UploadForm/>
                </ScrollBar>
                <SideBarRight isMenuVisible={isSidebarMenuVisible} />
            </div>
        </>
    );
}

export default Upload;