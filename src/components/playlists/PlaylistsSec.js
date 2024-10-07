import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import { NavLink } from "react-router-dom";

const PlaylistsSec = ({ videoCreator, creator }) => {
    const [playlists, setPlaylists] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const token = localStorage.getItem('token');
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

    const filteredPlaylists = playlists.filter(playlist =>
        creator.id === user.id || playlist.visibility === 1
    );

    return (
        <>
            {filteredPlaylists.length > 0 ? (
                filteredPlaylists.map((playlist, index) => (
                    <NavLink to={`/playlist?list=${playlist.playlistUrl}`} key={index} className="playlists-grid-inner-item">
                        <div className="playlists-grid-inner-item-top">
                            <img className="playlists-grid-inner-item-top-image" src={`${process.env.PUBLIC_URL}/${playlist.playlistImg}`} alt=""/>
                        </div>
                        <div className="playlists-grid-inner-item-bottom">
                            <p className="playlists-grid-inner-item-bottom-title">{playlist.name}</p>
                            <p className="playlists-grid-inner-item-bottom-subtitle">
                                <span>{playlist.creator.name}</span>
                                {playlist.creator?.verified === 1 ? (
                                    <img src={process.env.PUBLIC_URL + `/images/verified.svg`} alt=""/>
                                ) : null}
                            </p>
                        </div>
                    </NavLink>
                ))
            ) : (
                <p>No playlists found</p>
            )}
        </>
    );
};

export default PlaylistsSec;