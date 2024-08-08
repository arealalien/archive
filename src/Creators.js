import React, {useEffect, useState} from 'react';
import { NavLink } from "react-router-dom";
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import PageShadow from "./components/PageShadow";
import Footer from "./components/Footer";

function Creators() {
    const [creators, setCreators] = useState([]);

    useEffect(() => {
        const fetchCreators = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
                const response = await fetch('http://localhost:5000/creators', {
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
    }, []);

    return (
        <>
            <DocumentTitle title="Archive"/>
            <Navbar searchbar="yes"/>
            <section className="creators">
                <div className="creators-inner view-width">
                    {creators.map((creator, index) => (
                        <NavLink to={`/channel/${creator.name}`} className="creators-inner-creator" key={index}>
                            <div className="creators-inner-creator-inner">
                                {creator.profilePicture && (
                                    <img className="creators-inner-creator-inner-picture"
                                         src={`http://localhost:5000/${creator.profilePicture}`}
                                         alt={`${creator.name}'s profile`}/>
                                )}
                                <p className="creators-inner-creator-inner-name">{creator.displayName}</p>
                            </div>
                            <div className="creators-inner-creator-overlay"></div>
                            {creator.banner && (
                                <img className="creators-inner-creator-background"
                                     src={`http://localhost:5000/${creator.banner}`} alt={`${creator.name}'s banner`}/>
                            )}
                        </NavLink>
                    ))}
                </div>
            </section>
            <PageShadow/>
            <Footer/>
        </>
    );
}

export default Creators;