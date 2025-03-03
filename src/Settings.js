import React, {useContext, useRef, useState, useEffect} from 'react';
import { AuthContext } from './contexts/AuthContext';
import { NavLink, useParams } from 'react-router-dom';
import ScrollBar from './components/ScrollBar';
import { motion } from 'framer-motion';
import ColorThief from 'colorthief';
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import PageShadow from "./components/PageShadow";
import Footer from "./components/Footer";
import FileUpload from "./components/profile/FileUpload";
import SideBarLeft from "./components/SideBarLeft";
import SideBarRight from "./components/SideBarRight";

function Settings() {
    const { user } = useContext(AuthContext);
    const { page } = useParams();

    const [profilePictureUrl, setProfilePictureUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(user ? user.name : '');
    const [displayName, setDisplayName] = useState(user ? user.displayName : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [isSidebarMenuVisible, setSidebarMenuVisible] = useState(false);
    const [isSettingsMenuVisible] = useState(true);

    const bannerRef = useRef(null);

    useEffect(() => {
        if (bannerRef.current) {
            const imgElement = bannerRef.current;
            if (!user) return;
            const colorThief = new ColorThief();

            const updateBackgroundColor = () => {
                const palette = colorThief.getPalette(imgElement);

                // Choose the dark color from the palette
                const darkColor = palette.reduce((prev, curr) => {
                    const prevLuminance = 0.2126 * prev[0] + 0.7152 * prev[1] + 0.0722 * prev[2];
                    const currLuminance = 0.2126 * curr[0] + 0.7152 * curr[1] + 0.0722 * curr[2];
                    return currLuminance < prevLuminance ? curr : prev;
                }, palette[0]);

                // Calculate the luminance of the selected color
                const luminance = 0.2126 * darkColor[0] + 0.7152 * darkColor[1] + 0.0722 * darkColor[2];

                // Determine the alpha value based on luminance
                let alpha = 1;
                if (luminance > 160) {
                    alpha = 0.5;
                } else if (luminance > 140) {
                    alpha = 0.7;
                } else if (luminance > 120) {
                    alpha = 0.9;
                }

                // Apply the dark color directly as the background with the adjusted alpha
                const colorString = `rgba(${darkColor.join(',')}, ${alpha})`;
                const gradient = `linear-gradient(180deg, ${colorString} 0, rgba(${darkColor.join(',')}, 0) 75em)`;

                document.querySelector(".page-center").style.background = gradient;
                document.querySelector(".sidebar-right").style.background = gradient;
            };

            imgElement.addEventListener('load', updateBackgroundColor);

            if (imgElement.complete) {
                updateBackgroundColor();
            }

            return () => {
                imgElement.removeEventListener('load', updateBackgroundColor);
            };
        }
    }, [user]);

    const toggleSidebarMenu = () => {
        setSidebarMenuVisible(prevState => !prevState);
    };

    const profilePictureUploadRef = useRef(null);
    const bannerUploadRef = useRef(null);

    if (!user) {
        return <section className="loading">
            <div className="loading-box"><p className="loading-box-text">Loading</p></div>
        </section>;
    }

    const handleProfilePictureUpload = (filePath) => {
        setProfilePictureUrl(`http://localhost:5000/${filePath}`);
    };

    const handleBannerUpload = (filePath) => {
        setBannerUrl(`http://localhost:5000/${filePath}`);
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const renderSettingsContent = () => {
        switch(page) {
            case 'profile':
                return (
                    <div className="settings-inner-right">
                        <div className="settings-inner-right-top">
                            <h1 className="settings-inner-right-top-title">Profile Settings</h1>
                        </div>
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
                            <div className="settings-inner-right-top-buttons">
                                <button className="blackbutton">Cancel
                                    <div className="backbutton-shadow"></div>
                                </button>
                                <button className="mainbutton" type="submit">Save</button>
                            </div>
                        </div>
                        <div className="settings-inner-right-center">
                        <div className="settings-inner-right-center-block">
                                <div className="settings-inner-right-center-block-left">
                                    <h2 className="settings-inner-right-center-block-left-title">Public details</h2>
                                    <p className="settings-inner-right-center-block-left-subtitle">This will be
                                        displayed on your profile</p>
                                </div>
                                <div className="settings-inner-right-center-block-right">
                                    <div className="settings-inner-right-center-block-right-input">
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
                                        <input className="settings-inner-right-center-block-right-input-inner"
                                               id="displayname" type="text" placeholder="Displayname"
                                               value={displayName} onChange={(e) => setDisplayName(e.target.value)}
                                               name="displayname"
                                               aria-label=""/>
                                    </div>
                                    <div className="settings-inner-right-center-block-right-input">
                                        <div className="settings-inner-right-center-block-right-input-url">
                                            <p>localhost:3000/</p>
                                        </div>
                                        <input className="settings-inner-right-center-block-right-input-inner url-input"
                                               id="name"
                                               type="text" placeholder="@username"
                                               value={name} onChange={(e) => setName(e.target.value)} name="name"
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
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             width="24px" height="24px"
                                             viewBox="0 0 24 24" version="1.1">
                                            <title>Message</title>
                                            <g id="message" stroke="none" stroke-width="1" fill="none"
                                               fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                                <g id="message-inner" transform="translate(2.452080, 2.851980)"
                                                   stroke-width="1.5">
                                                    <path
                                                        d="M15.0928322,6.167017 C15.0928322,6.167017 11.8828071,10.0196486 9.53493746,10.0196486 C7.18807029,10.0196486 3.941955,6.167017 3.941955,6.167017"
                                                        id="Stroke-1"/>
                                                    <path
                                                        d="M1.04805054e-13,9.11679198 C1.04805054e-13,2.27869674 2.38095238,8.8817842e-15 9.52380952,8.8817842e-15 C16.6666667,8.8817842e-15 19.047619,2.27869674 19.047619,9.11679198 C19.047619,15.9538847 16.6666667,18.233584 9.52380952,18.233584 C2.38095238,18.233584 1.04805054e-13,15.9538847 1.04805054e-13,9.11679198 Z"
                                                        id="Stroke-3"/>
                                                </g>
                                            </g>
                                        </svg>
                                        <input className="settings-inner-right-center-block-right-input-inner"
                                               id="email" type="email" placeholder="Email"
                                               value={email} onChange={(e) => setEmail(e.target.value)} name="email"
                                               aria-label=""/>
                                    </div>
                                    <div className="settings-inner-right-center-block-right-input settings-password">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             width="24px" height="24px"
                                             viewBox="0 0 24 24" version="1.1">
                                            <title>Hide</title>
                                            <g id="hide" stroke="none" stroke-width="1" fill="none"
                                               fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                                <g id="hide-inner" transform="translate(2.000000, 3.500000)"
                                                   stroke-width="1.5">
                                                    <path
                                                        d="M4.42,14.2298 C2.19,12.7698 0.75,10.5698 0.75,8.6398 C0.75,5.3598 4.89,1.3398 10,1.3398 C12.09,1.3398 14.03,2.0098 15.59,3.0498"
                                                        id="Stroke-1"/>
                                                    <path
                                                        d="M17.8497,5.1102 C18.7407,6.2402 19.2597,7.4902 19.2597,8.6402 C19.2597,11.9202 15.1097,15.9402 9.9997,15.9402 C9.0897,15.9402 8.2007,15.8102 7.3697,15.5802"
                                                        id="Stroke-3"/>
                                                    <path
                                                        d="M7.7657,10.867 C7.1707,10.278 6.8377,9.475 6.8406799,8.638 C6.8367,6.893 8.2487,5.475 9.9947,5.47199104 C10.8347,5.47 11.6407,5.803 12.2347,6.397"
                                                        id="Stroke-5"/>
                                                    <path
                                                        d="M13.1095,9.1991 C12.8755,10.4911 11.8645,11.5041 10.5725,11.7411"
                                                        id="Stroke-7"/>
                                                    <line x1="17.8917" y1="0.7499" x2="2.1177" y2="16.5239"
                                                          id="Stroke-9"/>
                                                </g>
                                            </g>
                                        </svg>
                                        <input className="settings-inner-right-center-block-right-input-inner"
                                               id="password" type="password" placeholder="Password"
                                               value={password} onChange={(e) => setPassword(e.target.value)}
                                               name="password"
                                               aria-label=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="settings-inner-right-divider"></div>
                        <div className="settings-inner-right-center">
                            <div className="settings-inner-right-center-block">
                                <div className="settings-inner-right-center-block-left">
                                    <h2 className="settings-inner-right-center-block-left-title">Get verified
                                        <img className="verified-icon" src={process.env.PUBLIC_URL + `/images/verified.svg`} alt=""/>
                                    </h2>
                                    <p className="settings-inner-right-center-block-left-subtitle">How to get this cool
                                        badge on your profile?</p>
                                    <p className="settings-inner-right-center-block-left-subtitle">Make sure you meet
                                        the requirements!</p>
                                    <button className="mainbutton" disabled>Apply now!</button>
                                </div>
                                <div className="settings-inner-right-center-block-right">
                                    <div className="settings-inner-right-center-block-right-line">
                                        <p className="settings-inner-right-center-block-right-line-title">Post at least <span>5</span> videos</p>
                                        <div className="settings-inner-right-center-block-right-line-progressbar">
                                            <div style={{width: 100 + '%'}}
                                                 className="settings-inner-right-center-block-right-line-progressbar-progress"></div>
                                        </div>
                                    </div>
                                    <div className="settings-inner-right-center-block-right-line">
                                        <p className="settings-inner-right-center-block-right-line-title">Minimum
                                            of <span>100</span> total video views</p>
                                        <div className="settings-inner-right-center-block-right-line-progressbar">
                                            <div style={{width: 43 + '%'}}
                                                 className="settings-inner-right-center-block-right-line-progressbar-progress"></div>
                                        </div>
                                    </div>
                                    <div className="settings-inner-right-center-block-right-line">
                                        <p className="settings-inner-right-center-block-right-line-title">Must have at
                                            least <span>10</span> subscribers</p>
                                        <div className="settings-inner-right-center-block-right-line-progressbar">
                                            <div style={{width: 80 + '%'}}
                                                 className="settings-inner-right-center-block-right-line-progressbar-progress"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="settings-inner-right-divider"></div>
                        <div className="settings-inner-right-center">
                            <div className="settings-inner-right-center-buttons">
                                <button className="blackbutton">Cancel
                                    <div className="backbutton-shadow"></div>
                                </button>
                                <button className="mainbutton" type="submit">Save</button>
                            </div>
                        </div>
                    </div>
                );
            case 'layout':
                return (
                    <div className="settings-inner-right">
                        <div className="settings-inner-right-top">
                            <h1 className="settings-inner-right-top-title">Layout Settings</h1>
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
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
            <DocumentTitle title={`Archive - ` + capitalizeFirstLetter(page) + ` Settings`}/>
            <Navbar searchbar="yes" toggleSidebarMenu={toggleSidebarMenu}/>
            <div className="page">
                <SideBarLeft/>
                <ScrollBar className="page-center">
                    <section className="settings">
                        <img className="settings-background view-width"
                             src={(process.env.PUBLIC_URL + "/" + user?.banner)} alt=""/>
                        <div className="settings-inner view-width">
                            <img className="settings-inner-background"
                                 src={(process.env.PUBLIC_URL + "/" + user?.banner)} alt="" ref={bannerRef}/>
                            {renderSettingsContent()}
                        </div>
                    </section>
                    <Footer/>
                </ScrollBar>
                <SideBarRight isMenuVisible={isSidebarMenuVisible} isSettingsVisible={isSettingsMenuVisible} />
            </div>
            <PageShadow/>
            </motion.div>
        </>
    );
}

export default Settings;