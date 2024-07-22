import React from 'react';
import { useLocation } from 'react-router-dom';

import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import VideosSec from "./components/videos/VideosSec";
import PageShadow from "./components/PageShadow";
import Footer from "./components/Footer";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

function Search() {
    const query = useQuery().get('query');

    return (
        <>
            <DocumentTitle title="Archive"/>
            <Navbar searchbar="yes"/>
            <section className="search videos">
                <div className="videos-inner videos-inner-4 view-width">
                    <VideosSec search={query}/>
                </div>
            </section>
            <PageShadow/>
            <Footer/>
        </>
    );
}

export default Search;