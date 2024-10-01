import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import ScrollBar from './components/ScrollBar';
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import VideosSec from "./components/videos/VideosSec";
import PageShadow from "./components/PageShadow";
import SideBarLeft from "./components/SideBarLeft";
import SideBarRight from "./components/SideBarRight";

function Discovery() {
    const [isSidebarMenuVisible, setSidebarMenuVisible] = useState(false);
    const [playlists, setPlaylists] = useState([]);

    const toggleSidebarMenu = () => {
        setSidebarMenuVisible(prevState => !prevState);
    };

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:5000/discoveryplaylists`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch videos');
                }
                const data = await response.json();
                setPlaylists(data.map(playlist => ({
                    ...playlist
                })));
            } catch (error) {
                console.error('Error fetching video data:', error);
            }
        };

        fetchPlaylists();
    }, []);

    return (
        <>
            <DocumentTitle title="Discovery - Archive"/>
            <Navbar searchbar="yes" toggleSidebarMenu={toggleSidebarMenu} />
            <div className="page">
                <SideBarLeft/>
                <ScrollBar className="page-center">
                    <div className="discovery">
                        <section className="videos playlists-grid">
                            <div className="videos-top view-width">
                                <h3 className="videos-top-title">Playlists for you</h3>
                            </div>
                            <div className="videos-inner videos-inner-4 playlists-grid-inner view-width">
                                {playlists.length > 0 ? (
                                    playlists.map((playlist, index) => (
                                        <NavLink to={`/playlist?list=${playlist.playlistUrl}`} key={index}
                                                 className="playlists-grid-inner-item">
                                            <div className="playlists-grid-inner-item-top">
                                                <img className="playlists-grid-inner-item-top-image"
                                                     src={`${process.env.PUBLIC_URL}/${playlist.playlistImg}`}
                                                     alt=""/>
                                            </div>
                                        </NavLink>
                                    ))
                                ) : (
                                    <p>No playlists found</p>
                                )}
                            </div>
                        </section>
                        <section className="videos">
                            <div className="videos-top view-width">
                                <h3 className="videos-top-title">Videos</h3>
                            </div>
                            <div className="videos-inner videos-inner-4 view-width">
                                <VideosSec/>
                            </div>
                        </section>
                    </div>
                </ScrollBar>
                <SideBarRight isMenuVisible={isSidebarMenuVisible}/>
            </div>
            <PageShadow/>
        </>
    );
}

export default Discovery;