import React, { useState, useEffect } from "react";

const PlaylistsSec = ({ videoCreator }) => {
    const [playlists, setPlaylists] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
                const response = await fetch(`http://localhost:5000/playlists?creator=${encodeURIComponent(videoCreator)}`, {
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
    }, [videoCreator]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            {playlists.length > 0 ? (
                playlists.map((playlist, index) => (
                    <div key={index} className="playlists-grid-inner-item">
                        <div className="playlists-grid-inner-item-left">
                            <div className="playlists-grid-inner-item-left-button">
                                <svg className="video-play-play" id="Xnix_Line_Play"
                                     data-name="Xnix/Line/Play" width="24" height="24" viewBox="0 0 24 24">
                                    <path id="Vector"
                                          d="M.35,6.285,4.647.6a1.412,1.412,0,0,1,2.3,0l4.7,5.69A1.676,1.676,0,0,1,10.5,9H1.5A1.676,1.676,0,0,1,.35,6.285Z"
                                          transform="translate(16 6) rotate(90)" fill="none" stroke="#000"
                                          stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                                </svg>
                            </div>
                            <div className="playlists-grid-inner-item-left-overlay"></div>
                            <img className="playlists-grid-inner-item-image" src="" alt=""/>
                        </div>
                        <div className="playlists-grid-inner-item-right">
                            <p>{playlist.name}</p>
                            <p>{playlist.creator.name}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No playlists found</p>
            )}
        </>
    );
};

export default PlaylistsSec;