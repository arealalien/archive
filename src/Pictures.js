import React from 'react';
import './css/main.css';

// Components
import Navbar from "./components/Navbar";
import PicturesSec from "./components/pictures/PicturesSec";
import PageShadow from "./components/PageShadow";
import Footer from "./components/Footer";

function Pictures() {
    return (
        <>
            <Navbar searchbar="yes"/>
            <PicturesSec/>
            <PageShadow/>
            <Footer/>
        </>
    );
}

export default Pictures;