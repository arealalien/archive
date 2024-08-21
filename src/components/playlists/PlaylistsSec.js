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
                    <div key={index} className="playlist-item">
                        <p>{playlist.name}</p>
                        <p>{playlist.creator.name}</p>
                    </div>
                ))
            ) : (
                <p>No playlists found</p>
            )}
        </>
    );
};

export default PlaylistsSec;