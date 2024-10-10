import React, { useState } from 'react';
import ScrollBar from './components/ScrollBar';
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import PageShadow from "./components/PageShadow";
import SideBarLeft from "./components/SideBarLeft";
import SideBarRight from "./components/SideBarRight";

function NotFound() {
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
                    <section className="notfound">
                        <div className="notfound-inner view-width">
                            <img className="notfound-inner-image" src={process.env.PUBLIC_URL + `/images/404.png`}
                                 alt=""/>
                        </div>
                    </section>
                </ScrollBar>
                <SideBarRight isMenuVisible={isSidebarMenuVisible}/>
            </div>
            <PageShadow/>
        </>
    );
}

export default NotFound;