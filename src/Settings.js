import React, {useContext, useRef, useState} from 'react';
import { AuthContext } from './contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import PageShadow from "./components/PageShadow";
import Footer from "./components/Footer";
import FileUpload from "./components/profile/FileUpload";

function Settings({ page }) {
    const [profilePictureUrl, setProfilePictureUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');
    const { user } = useContext(AuthContext);

    const profilePictureUploadRef = useRef(null);
    const bannerUploadRef = useRef(null);

    const handleProfilePictureUpload = (filePath) => {
        setProfilePictureUrl(`http://localhost:5000/${filePath}`);
    };

    const handleBannerUpload = (filePath) => {
        setBannerUrl(`http://localhost:5000/${filePath}`);
    };

    const renderSettingsContent = () => {
        switch(page) {
            case 'profile':
                return (
                    <div className="settings-inner-right">
                        <div className="settings-inner-right-top">
                            <h1 className="settings-inner-right-top-title">Profile Settings</h1>
                        </div>
                        <div className="settings-inner-right-divider"></div>
                        <div className="settings-inner-right-center">
                            <div className="settings-inner-right-center-picture">
                                <div className="settings-inner-right-center-picture-edit"
                                     onClick={() => profilePictureUploadRef.current.triggerFileInput()}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         height="24px" viewBox="0 0 24 24" version="1.1">
                                        <title>Edit</title>
                                        <g id="edit" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
                                           stroke-linecap="round" stroke-linejoin="round">
                                            <g id="edit-inner" transform="translate(3.500000, 3.500000)"
                                               stroke="#000000" stroke-width="1.5">
                                                <line x1="9.8352" y1="16.0078" x2="16.2122" y2="16.0078" id="Stroke-1"/>
                                                <path
                                                    d="M12.5578,1.3589 L12.5578,1.3589 C11.2138,0.3509 9.3078,0.6229 8.2998,1.9659 C8.2998,1.9659 3.2868,8.6439 1.5478,10.9609 C-0.1912,13.2789 1.4538,16.1509 1.4538,16.1509 C1.4538,16.1509 4.6978,16.8969 6.4118,14.6119 C8.1268,12.3279 13.1638,5.6169 13.1638,5.6169 C14.1718,4.2739 13.9008,2.3669 12.5578,1.3589 Z"
                                                    id="Stroke-3"/>
                                                <line x1="7.0041" y1="3.7114" x2="11.8681" y2="7.3624" id="Stroke-5"/>
                                            </g>
                                        </g>
                                    </svg>
                                    <div className="settings-inner-right-center-picture-edit-shadow"></div>
                                </div>
                                <div className="settings-inner-right-center-picture-container">
                                    <img className="settings-inner-right-center-picture-container-image"
                                         src={profilePictureUrl || (process.env.PUBLIC_URL + "/" + user?.profilePicture)}
                                         alt=""/>
                                </div>
                            </div>
                            <FileUpload ref={profilePictureUploadRef}
                                        uploadUrl={`http://localhost:5000/upload/profile-picture`}
                                        onSuccess={handleProfilePictureUpload}
                                        fileKey="profilePicture"/>
                            <div className="settings-inner-right-center-header">
                                <div className="settings-inner-right-center-header-edit"
                                     onClick={() => bannerUploadRef.current.triggerFileInput()}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         height="24px" viewBox="0 0 24 24" version="1.1">
                                        <title>Edit</title>
                                        <g id="edit" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
                                           stroke-linecap="round" stroke-linejoin="round">
                                            <g id="edit-inner" transform="translate(3.500000, 3.500000)"
                                               stroke="#000000" stroke-width="1.5">
                                                <line x1="9.8352" y1="16.0078" x2="16.2122" y2="16.0078" id="Stroke-1"/>
                                                <path
                                                    d="M12.5578,1.3589 L12.5578,1.3589 C11.2138,0.3509 9.3078,0.6229 8.2998,1.9659 C8.2998,1.9659 3.2868,8.6439 1.5478,10.9609 C-0.1912,13.2789 1.4538,16.1509 1.4538,16.1509 C1.4538,16.1509 4.6978,16.8969 6.4118,14.6119 C8.1268,12.3279 13.1638,5.6169 13.1638,5.6169 C14.1718,4.2739 13.9008,2.3669 12.5578,1.3589 Z"
                                                    id="Stroke-3"/>
                                                <line x1="7.0041" y1="3.7114" x2="11.8681" y2="7.3624" id="Stroke-5"/>
                                            </g>
                                        </g>
                                    </svg>
                                    <div className="settings-inner-right-center-header-edit-shadow"></div>
                                </div>
                                <div className="settings-inner-right-center-header-container">
                                    <img className="editprofile-inner-details-header-container-image"
                                         src={bannerUrl || (process.env.PUBLIC_URL + "/" + user?.banner)} alt=""/>
                                </div>
                            </div>
                            <FileUpload ref={bannerUploadRef}
                                        uploadUrl={`http://localhost:5000/upload/banner`}
                                        onSuccess={handleBannerUpload}
                                        fileKey="banner"/>
                        </div>
                    </div>
                );
            case 'account':
                return (
                    <div className="settings-inner-right">
                        <div className="settings-inner-right-top">
                            <h1 className="settings-inner-right-top-title">Account Settings</h1>
                        </div>
                        <div className="settings-inner-right-divider"></div>
                        <div className="settings-inner-right-center">
                            <div className="settings-inner-right-center-block">
                                <div className="settings-inner-right-center-block-left">
                                    <h2 className="settings-inner-right-center-block-left-title">Public profile</h2>
                                    <p className="settings-inner-right-center-block-left-subtitle">This will be
                                        displayed on your profile</p>
                                </div>
                                <div className="settings-inner-right-center-block-right">
                                    <div className="settings-inner-right-center-block-right-input">
                                        <input className="settings-inner-right-center-block-right-input-inner"
                                               id="displayname" type="text" placeholder={user.displayName}
                                               value={user.displayName} name="displayname"
                                               aria-label=""/>
                                    </div>
                                    <div className="settings-inner-right-center-block-right-input">
                                        <div className="settings-inner-right-center-block-right-input-url">
                                            <p>localhost:3000/</p>
                                        </div>
                                        <input className="settings-inner-right-center-block-right-input-inner url-input"
                                               id="name"
                                               type="text" placeholder={user.name}
                                               value={user.name} name="name"
                                               aria-label=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="settings-inner-right-divider"></div>
                        <div className="settings-inner-right-center">
                            <div className="settings-inner-right-center-block">
                                <div className="settings-inner-right-center-block-left">
                                    <h2 className="settings-inner-right-center-block-left-title">Private details</h2>
                                    <p className="settings-inner-right-center-block-left-subtitle">This will not be
                                        displayed on your profile</p>
                                </div>
                                <div className="settings-inner-right-center-block-right">
                                    <div className="settings-inner-right-center-block-right-input">
                                        <input className="settings-inner-right-center-block-right-input-inner"
                                               id="password" type="text" placeholder="Password"
                                               value="" name="password"
                                               aria-label=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'content':
                return (
                    <div className="settings-inner-right">
                        <div className="settings-inner-right-top">
                            <h1 className="settings-inner-right-top-title">Content Settings</h1>
                        </div>
                        <div className="settings-inner-right-center">

                        </div>
                    </div>
                );
            default:
                return (
                    <div className="settings-inner-right">
                        <div className="settings-inner-right-top">
                            <h1 className="settings-inner-right-top-title">Settings</h1>
                        </div>
                    </div>
                );
        }
    };

    return (
        <>
            <DocumentTitle title="Archive"/>
            <Navbar searchbar="yes"/>
            <section className="settings">
                <div className="settings-inner view-width">
                    <div className="settings-inner-left">
                        <ul className="settings-inner-left-list">
                            <NavLink to="/settings/profile" className="settings-inner-left-list-item">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <title>Star</title>
                                    <g id="star" stroke="none" stroke-width="1" fill="none"
                                       fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                        <g id="star-inner" transform="translate(3.000000, 3.000000)" stroke="#000000"
                                           stroke-width="1.5">
                                            <path
                                                d="M9,0 C6.96384545,0 6.77134103,3.54652262 5.55911318,4.79957421 C4.34688533,6.05262581 0.578198764,4.61991709 0.0545867365,6.84402682 C-0.467925266,9.06927362 2.92235261,9.82428837 3.34036221,11.7334296 C3.76057187,13.6425708 1.68922429,16.3249199 3.45916494,17.6598406 C5.2291056,18.9936242 7.13434937,15.9747022 9,15.9747022 C10.8656351,15.9747022 12.7708788,18.9936242 14.5408195,17.6598406 C16.3107602,16.3249199 14.2405126,13.6425708 14.6596222,11.7334296 C15.0787319,9.82428837 18.4679097,9.06927362 17.9453977,6.84402682 C17.4228857,4.61991709 13.6530991,6.05262581 12.4419713,4.79957421 C11.2297434,3.54652262 11.036139,0 9,0 Z"
                                                id="Stroke-1"/>
                                        </g>
                                    </g>
                                </svg>
                                <p className="settings-inner-left-list-item-name">Profile settings</p>
                            </NavLink>
                            <NavLink to="/settings/account" className="settings-inner-left-list-item">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="24px" height="24px"
                                     viewBox="0 0 24 24" version="1.1">
                                    <title>Profile</title>
                                    <g id="profile" stroke="none" stroke-width="1" fill="none"
                                       fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                        <g id="profile-inner" transform="translate(5.000000, 2.400000)"
                                           stroke-width="1.5">
                                            <path
                                                d="M6.84454545,19.261909 C3.15272727,19.261909 -8.52651283e-14,18.6874153 -8.52651283e-14,16.3866334 C-8.52651283e-14,14.0858516 3.13272727,11.961909 6.84454545,11.961909 C10.5363636,11.961909 13.6890909,14.0652671 13.6890909,16.366049 C13.6890909,18.6658952 10.5563636,19.261909 6.84454545,19.261909 Z"
                                                id="Stroke-1"/>
                                            <path
                                                d="M6.83729838,8.77363636 C9.26002565,8.77363636 11.223662,6.81 11.223662,4.38727273 C11.223662,1.96454545 9.26002565,-1.0658141e-14 6.83729838,-1.0658141e-14 C4.41457111,-1.0658141e-14 2.45,1.96454545 2.45,4.38727273 C2.44184383,6.80181818 4.39184383,8.76545455 6.80638929,8.77363636 C6.81729838,8.77363636 6.82729838,8.77363636 6.83729838,8.77363636 Z"
                                                id="Stroke-3"/>
                                        </g>
                                    </g>
                                </svg>
                                <p className="settings-inner-left-list-item-name">Account settings</p>
                            </NavLink>
                            <NavLink to="/settings/content" className="settings-inner-left-list-item">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="24px" height="24px"
                                     viewBox="0 0 24 24" version="1.1">
                                    <title>Video</title>
                                    <g id="video" stroke="none" stroke-width="1" fill="none"
                                       fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                        <g id="video-inner" transform="translate(2.514381, 5.114095)"
                                           stroke="#000000"
                                           stroke-width="1.5">
                                            <path
                                                d="M13.6370476,4.55866688 C15.4751429,3.10152403 17.9418095,1.69200022 18.4084762,2.19676212 C19.1799048,3.02533355 19.1132381,10.9110478 18.4084762,11.6634288 C17.9799048,12.1300955 15.4941905,10.7205716 13.6370476,9.2729526"
                                                id="Stroke-1"/>
                                            <path
                                                d="M-6.21724894e-15,6.92285714 C-6.21724894e-15,1.73047619 1.7247619,-2.66453526e-15 6.90095238,-2.66453526e-15 C12.0761905,-2.66453526e-15 13.8009524,1.73047619 13.8009524,6.92285714 C13.8009524,12.1142857 12.0761905,13.8457143 6.90095238,13.8457143 C1.7247619,13.8457143 -6.21724894e-15,12.1142857 -6.21724894e-15,6.92285714 Z"
                                                id="Stroke-3"/>
                                        </g>
                                    </g>
                                </svg>
                                <p className="settings-inner-left-list-item-name">Content</p>
                            </NavLink>
                        </ul>
                    </div>
                    {renderSettingsContent()}
                </div>
            </section>
            <PageShadow/>
            <Footer/>
        </>
    );
}

export default Settings;