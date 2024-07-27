import React, {useContext} from 'react';
import { AuthContext } from './contexts/AuthContext';
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import PageShadow from "./components/PageShadow";
import Footer from "./components/Footer";

function Settings() {
    const { user } = useContext(AuthContext);

    let banner;

    if (user) {
        banner = `${process.env.PUBLIC_URL}/${user.banner}`;
    }

    return (
        <>
            <DocumentTitle title="Archive"/>
            <Navbar searchbar="yes"/>
            <section className="settings">
                <div className="settings-inner view-width">
                    <div className="settings-inner-left">
                        <ul className="settings-inner-left-list">
                            <li className="settings-inner-left-list-item">
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
                            </li>
                            <li className="settings-inner-left-list-item active">
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
                            </li>
                            <li className="settings-inner-left-list-item">
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
                            </li>
                        </ul>
                    </div>
                    <div className="settings-inner-right">
                        <div className="settings-inner-right-top">
                            <h1 className="settings-inner-right-top-title">Profile Settings</h1>
                        </div>
                    </div>
                </div>
            </section>
            <PageShadow/>
            <Footer/>
        </>
    );
}

export default Settings;