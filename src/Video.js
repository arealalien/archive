import React from 'react';
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import VideoSec from "./components/videos/VideoSec";
import VideosSec from "./components/videos/VideosSec";
import PageShadow from "./components/PageShadow";
import Footer from "./components/Footer";

function Video() {
    return (
        <>
            <DocumentTitle title="Archive - Video"/>
            <Navbar searchbar="yes"/>
            <section className="video">
                <div className="video-inner view-width">
                    <div className="video-inner-left">
                        <VideoSec/>
                        <section className="videos">
                            <div className="videos-inner videos-inner-3">
                                <VideosSec/>
                            </div>
                        </section>
                    </div>
                    <div className="video-inner-right">
                        <div className="video-inner-right-box">
                            <div className="video-inner-right-box-top">
                                <h3 className="video-inner-right-box-top-title">Photography shoot at night | EP 1</h3>
                            </div>
                            <div className="video-inner-right-box-center">
                                <div className="video-inner-right-box-center-user">
                                    <div className="video-inner-right-box-center-user-container">
                                        <img className="video-inner-right-box-center-user-container-image"
                                             src="https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                             alt=""/>
                                    </div>
                                    <div className="video-inner-right-box-center-user-text">
                                        <h3 className="video-inner-right-box-center-user-text-username">Channel Name</h3>
                                        <p className="video-inner-right-box-center-user-text-date">15M Subscribers</p>
                                    </div>
                                </div>
                                <div className="video-inner-right-box-center-container">
                                    <button className="mainbutton">Subscribe</button>
                                </div>
                            </div>
                            <div className="video-inner-right-box-bottom">

                            </div>
                            <div className="video-inner-right-box-shadow"></div>
                        </div>
                        <div className="video-inner-right-box">
                            <div className="video-inner-right-box-top">
                                <h3 className="video-inner-right-box-top-title">Comments</h3>
                            </div>
                            <div className="video-inner-right-box-center">

                            </div>
                            <div className="video-inner-right-box-bottom">

                            </div>
                            <div className="video-inner-right-box-shadow"></div>
                        </div>
                    </div>
                </div>
            </section>
            <PageShadow/>
            <Footer/>
        </>
    );
}

export default Video;