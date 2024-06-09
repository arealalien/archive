import React from 'react';
import './css/main.css';

// Components
import Navbar from "./components/Navbar";

function SignUp() {
    return (
        <>
            <Navbar searchbar="no" />
            <section className="signup">
                <div className="signup-inner view-width">
                    <div className="signup-inner-left">
                        <div className="signup-inner-left-container">
                            <div className="signup-inner-left-container-info">
                                <p className="signup-inner-left-container-info-text">Already have an account?</p>
                                <button className="blackbutton">Login here!<div className="blackbutton-shadow"></div></button>
                            </div>
                            <div className="signup-inner-left-container-overlay"></div>
                            <img className="signup-inner-left-container-background"
                                 src="https://images.unsplash.com/photo-1690796033760-790beb3b7506?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                 alt=""/>
                        </div>
                    </div>
                    <div className="signup-inner-right">

                    </div>
                </div>
            </section>
        </>
    );
}

export default SignUp;