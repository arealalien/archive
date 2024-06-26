import React from 'react';
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import UploadForm from "./components/upload/UploadForm";

function Upload() {

    return (
        <>
            <DocumentTitle title="Archive - Upload"/>
            <Navbar searchbar="yes"/>
            <UploadForm/>
        </>
    );
}

export default Upload;