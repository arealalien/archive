import React, { useState } from 'react';
import ScrollBar from './components/ScrollBar';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import VideosSec from "./components/videos/VideosSec";
import PageShadow from "./components/PageShadow";
import SideBarLeft from "./components/SideBarLeft";
import SideBarRight from "./components/SideBarRight";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

function Search() {
    const query = useQuery().get('query');
    const [isSidebarMenuVisible, setSidebarMenuVisible] = useState(false);

    const toggleSidebarMenu = () => {
        setSidebarMenuVisible(prevState => !prevState);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
            <DocumentTitle title="Archive"/>
            <Navbar searchbar="yes" toggleSidebarMenu={toggleSidebarMenu} />
            <div className="page">
                <SideBarLeft/>
                <ScrollBar className="page-center">
                    <section className="search videos">
                        <div className="videos-inner videos-inner-4 view-width">
                            <VideosSec search={query}/>
                        </div>
                    </section>
                </ScrollBar>
                <SideBarRight isMenuVisible={isSidebarMenuVisible} />
            </div>
            <PageShadow/>
            </motion.div>
        </>
    );
}

export default Search;