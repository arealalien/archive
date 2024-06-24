import React from 'react';
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import PageShadow from "./components/PageShadow";
import Footer from "./components/Footer";

function Upload() {

    return (
        <>
            <DocumentTitle title="Archive - Upload"/>
            <Navbar searchbar="yes"/>

            <PageShadow/>
            <Footer/>
        </>
    );
}

export default Upload;