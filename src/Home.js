import React from 'react';
import './css/main.css';

// Components
import Navbar from "./components/Navbar";
import VideosSec from "./components/VideosSec";
import PageShadow from "./components/PageShadow";
import Footer from "./components/Footer";

function Home() {
    return (
        <>
            <Navbar searchbar="yes"/>
            <section className="videos">
                <div className="videos-inner videos-inner-4 view-width">
                    <VideosSec/>
                </div>
            </section>
            <PageShadow startcolums="4"/>
            <Footer/>
        </>
    );
}

export default Home;