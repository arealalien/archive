import React from 'react';
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import VideosSec from "./components/videos/VideosSec";
import PageShadow from "./components/PageShadow";
import Footer from "./components/Footer";

function Home() {
    return (
        <>
            <DocumentTitle title="Archive"/>
            <Navbar searchbar="yes"/>
            <Header/>
            <section className="videos">
                <div className="videos-inner videos-inner-4 view-width">
                    <VideosSec/>
                </div>
            </section>
            <PageShadow/>
            <Footer/>
        </>
    );
}

export default Home;