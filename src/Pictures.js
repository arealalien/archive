import React from 'react';
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import PicturesSec from "./components/pictures/PicturesSec";
import PageShadow from "./components/PageShadow";
import Footer from "./components/Footer";

function Pictures() {
    return (
        <>
            <DocumentTitle title="Archive - Pcitures"/>
            <Navbar searchbar="yes"/>
            <PicturesSec/>
            <PageShadow/>
            <Footer/>
        </>
    );
}

export default Pictures;