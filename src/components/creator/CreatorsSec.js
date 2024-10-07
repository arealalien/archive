import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";

function CreatorsSec({ user }) {
    const [creators, setCreators] = useState([]);

    useEffect(() => {
        const fetchCreators = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
                let url = 'http://localhost:5000/creators';

                if (user) {
                    url = `http://localhost:5000/creators?user=${user}`;
                }

                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch creators');
                }

                const data = await response.json();
                setCreators(data);
            } catch (error) {
                console.error('Error fetching creators:', error);
            }
        };

        fetchCreators();
    }, [user]);

    return (
        <>
            {creators.map((creator, index) => (
                <NavLink to={`/channel/${creator.name}`} className="creators-inner-creator" key={index}>
                    <div className="creators-inner-creator-inner">
                        {creator.profilePicture && (
                            <img className="creators-inner-creator-inner-picture"
                                 src={`http://localhost:5000/${creator.profilePicture}`}
                                 alt={`${creator.name}'s profile`}/>
                        )}
                        <div>
                            <p className="creators-inner-creator-inner-name">
                                <span>{creator.displayName}</span>
                                {creator?.verified === 1 ? (
                                    <img src={process.env.PUBLIC_URL + `/images/verified.svg`} alt=""/>
                                ) : null}
                            </p>
                            <p className="creators-inner-creator-inner-username">
                                @{creator.name}
                            </p>
                        </div>
                    </div>
                    <div className="creators-inner-creator-overlay"></div>
                    {creator.banner && (
                        <img className="creators-inner-creator-background"
                             src={`http://localhost:5000/${creator.banner}`}
                             alt={`${creator.name}'s banner`}/>
                    )}
                </NavLink>
            ))}
        </>
    );
}

export default CreatorsSec;