import React from 'react';
import { NavLink } from "react-router-dom";
import './css/main.css';

// Components
import Navbar from "./components/Navbar";

function Login() {
    return (
        <>
            <Navbar searchbar="no" />
            <section className="signup">
                <div className="signup-inner view-width">
                    <div className="signup-inner-left">
                        <div className="signup-inner-left-container">
                            <div className="signup-inner-left-container-info">
                                <p className="signup-inner-left-container-info-text">Don't have an account yet?</p>
                                <NavLink to="/signup" className="blackbutton">Sign up here!<div className="blackbutton-shadow"></div></NavLink>
                            </div>
                            <div className="signup-inner-left-container-overlay"></div>
                            <img className="signup-inner-left-container-background"
                                 src="https://images.unsplash.com/photo-1690796033760-790beb3b7506?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                 alt=""/>
                        </div>
                    </div>
                    <div className="signup-inner-right">
                        <form className="signup-inner-right-form" action="">
                            <div className="signup-inner-right-form-top">
                                <h1 className="signup-inner-right-form-top-title">Login</h1>
                            </div>
                            <fieldset className="signup-inner-right-form-center">
                                <div className="signup-inner-right-form-center-container">
                                    <label className="signup-inner-right-form-center-container-label">Password*</label>
                                    <div className="signup-inner-right-form-center-container-input">
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
                                        <input id="username" type="text" placeholder="Username"
                                               name="username" aria-label="" required/>
                                    </div>
                                </div>
                                <div className="signup-inner-right-form-center-container">
                                    <label className="signup-inner-right-form-center-container-label">Password*</label>
                                    <div className="signup-inner-right-form-center-container-input">
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
                                        <input id="password" type="password" placeholder="Password"
                                               name="password" aria-label="" required/>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset className="signup-inner-right-form-bottom">
                                <button className="mainbutton">Login</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;