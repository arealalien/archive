import React from "react";
import {NavLink} from "react-router-dom";

const PicturesSec  = () => {
    return (
        <section className="pictures">
            <div className="pictures-inner view-width">
                <div className="pictures-inner-left">
                    <li className="profile-inner-content-left-list">
                        <ul className="profile-inner-content-left-list-item">
                            <NavLink to="" className="profile-inner-content-left-list-item-link">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <title>Heart</title>
                                    <g id="heart" stroke="none" stroke-width="1" fill="none"
                                       fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                        <g id="heart-inner" transform="translate(2.550170, 3.550158)"
                                           stroke-width="1.5">
                                            <path
                                                d="M0.371729633,8.89614246 C-0.701270367,5.54614246 0.553729633,1.38114246 4.07072963,0.249142462 C5.92072963,-0.347857538 8.20372963,0.150142462 9.50072963,1.93914246 C10.7237296,0.0841424625 13.0727296,-0.343857538 14.9207296,0.249142462 C18.4367296,1.38114246 19.6987296,5.54614246 18.6267296,8.89614246 C16.9567296,14.2061425 11.1297296,16.9721425 9.50072963,16.9721425 C7.87272963,16.9721425 2.09772963,14.2681425 0.371729633,8.89614246 Z"
                                                id="Stroke-1"/>
                                            <path
                                                d="M13.23843,4.013842 C14.44543,4.137842 15.20043,5.094842 15.15543,6.435842"
                                                id="Stroke-3"/>
                                        </g>
                                    </g>
                                </svg>
                                <span>Follwing</span>
                            </NavLink>
                        </ul>
                        <ul className="profile-inner-content-left-list-item">
                            <NavLink to="" className="profile-inner-content-left-list-item-link">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <title>Chart</title>
                                    <g id="chart" stroke="none" stroke-width="1" fill="none"
                                       fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                        <g id="chart-inner" transform="translate(2.300000, 2.300000)"
                                           stroke-width="1.5">
                                            <line x1="5.18305279" y1="7.960947" x2="5.18305279" y2="14.6546312"
                                                  id="Stroke-1"/>
                                            <line x1="9.73684179" y1="4.757368" x2="9.73684179" y2="14.6552627"
                                                  id="Stroke-2"/>
                                            <line x1="14.2156838" y1="11.498211" x2="14.2156838" y2="14.6550531"
                                                  id="Stroke-3"/>
                                            <path
                                                d="M-3.55271368e-14,9.73684211 C-3.55271368e-14,2.43473684 2.43473684,2.13162821e-14 9.73684211,2.13162821e-14 C17.0389474,2.13162821e-14 19.4736842,2.43473684 19.4736842,9.73684211 C19.4736842,17.0389474 17.0389474,19.4736842 9.73684211,19.4736842 C2.43473684,19.4736842 -3.55271368e-14,17.0389474 -3.55271368e-14,9.73684211 Z"
                                                id="Stroke-4"/>
                                        </g>
                                    </g>
                                </svg>
                                <span>Trending</span>
                            </NavLink>
                        </ul>
                        <ul className="profile-inner-content-left-list-item">
                            <NavLink to="" className="profile-inner-content-left-list-item-link">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <title>Star</title>
                                    <g id="star" stroke="none" stroke-width="1" fill="none"
                                       fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                        <g id="star-inner" transform="translate(3.000000, 3.000000)"
                                           stroke-width="1.5">
                                            <path
                                                d="M9,0 C6.96384545,0 6.77134103,3.54652262 5.55911318,4.79957421 C4.34688533,6.05262581 0.578198764,4.61991709 0.0545867365,6.84402682 C-0.467925266,9.06927362 2.92235261,9.82428837 3.34036221,11.7334296 C3.76057187,13.6425708 1.68922429,16.3249199 3.45916494,17.6598406 C5.2291056,18.9936242 7.13434937,15.9747022 9,15.9747022 C10.8656351,15.9747022 12.7708788,18.9936242 14.5408195,17.6598406 C16.3107602,16.3249199 14.2405126,13.6425708 14.6596222,11.7334296 C15.0787319,9.82428837 18.4679097,9.06927362 17.9453977,6.84402682 C17.4228857,4.61991709 13.6530991,6.05262581 12.4419713,4.79957421 C11.2297434,3.54652262 11.036139,0 9,0 Z"
                                                id="Stroke-1"/>
                                        </g>
                                    </g>
                                </svg>
                                <span>New</span>
                            </NavLink>
                        </ul>
                    </li>
                </div>
                <div className="pictures-inner-right">
                    <div className="pictures-inner-right-item">
                        <div className="pictures-inner-right-item-inner">
                            <div className="pictures-inner-right-item-inner-top">
                                <div className="pictures-inner-right-item-inner-top-container">
                                    <img className="pictures-inner-right-item-inner-top-container-image" src="https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
                                </div>
                                <div className="pictures-inner-right-item-inner-top-text">
                                    <h3 className="pictures-inner-right-item-inner-top-text-username">Channel Name</h3>
                                    <p  className="pictures-inner-right-item-inner-top-text-date">21 June 2024</p>
                                </div>
                            </div>
                            <div className="pictures-inner-right-item-inner-bottom">
                                <div className="pictures-inner-right-item-inner-bottom-dots">
                                    <div className="pictures-inner-right-item-inner-bottom-dots-dot active"></div>
                                    <div className="pictures-inner-right-item-inner-bottom-dots-dot"></div>
                                    <div className="pictures-inner-right-item-inner-bottom-dots-dot"></div>
                                    <div className="pictures-inner-right-item-inner-bottom-dots-dot"></div>
                                    <div className="pictures-inner-right-item-inner-bottom-dots-dot"></div>
                                </div>
                                <div className="pictures-inner-right-item-inner-bottom-nav">
                                    <div className="pictures-inner-right-item-inner-bottom-nav-item">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             width="24px" height="24px"
                                             viewBox="0 0 24 24" version="1.1">
                                            <title>Heart</title>
                                            <g id="heart" stroke="none" stroke-width="1" fill="none"
                                               fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                                <g id="heart-inner" transform="translate(2.550170, 3.550158)"
                                                   stroke="#000000"
                                                   stroke-width="1.5">
                                                    <path
                                                        d="M0.371729633,8.89614246 C-0.701270367,5.54614246 0.553729633,1.38114246 4.07072963,0.249142462 C5.92072963,-0.347857538 8.20372963,0.150142462 9.50072963,1.93914246 C10.7237296,0.0841424625 13.0727296,-0.343857538 14.9207296,0.249142462 C18.4367296,1.38114246 19.6987296,5.54614246 18.6267296,8.89614246 C16.9567296,14.2061425 11.1297296,16.9721425 9.50072963,16.9721425 C7.87272963,16.9721425 2.09772963,14.2681425 0.371729633,8.89614246 Z"
                                                        id="Stroke-1"/>
                                                    <path
                                                        d="M13.23843,4.013842 C14.44543,4.137842 15.20043,5.094842 15.15543,6.435842"
                                                        id="Stroke-3"/>
                                                </g>
                                            </g>
                                        </svg>
                                        <p className="pictures-inner-right-item-inner-bottom-nav-item-text">21k</p>
                                    </div>
                                    <div className="pictures-inner-right-item-inner-bottom-nav-item">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             width="24px" height="24px"
                                             viewBox="0 0 24 24" version="1.1">
                                            <title>Chat</title>
                                            <g id="chat" stroke="none" stroke-width="1" fill="none"
                                               fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                                <g id="chat-inner" transform="translate(2.000000, 2.000000)" stroke="#000000">
                                                    <line x1="13.9394" y1="10.413" x2="13.9484" y2="10.413"
                                                          id="Stroke-11" stroke-width="2"/>
                                                    <line x1="9.9304" y1="10.413" x2="9.9394" y2="10.413" id="Stroke-13"
                                                          stroke-width="2"/>
                                                    <line x1="5.9214" y1="10.413" x2="5.9304" y2="10.413" id="Stroke-15"
                                                          stroke-width="2"/>
                                                    <path
                                                        d="M17.0710351,17.0698449 C14.0159481,20.1263505 9.48959549,20.7867004 5.78630747,19.074012 C5.23960769,18.8538953 1.70113357,19.8338667 0.933341969,19.0669763 C0.165550368,18.2990808 1.14639409,14.7601278 0.926307229,14.213354 C-0.787154393,10.5105699 -0.125888852,5.98259958 2.93020311,2.9270991 C6.83146881,-0.9756997 13.1697694,-0.9756997 17.0710351,2.9270991 C20.9803405,6.8359285 20.9723008,13.1680512 17.0710351,17.0698449 Z"
                                                        id="Stroke-4" stroke-width="1.5"/>
                                                </g>
                                            </g>
                                        </svg>
                                        <p className="pictures-inner-right-item-inner-bottom-nav-item-text">21k</p>
                                    </div>
                                    <div className="pictures-inner-right-item-inner-bottom-nav-item">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             width="24px" height="24px"
                                             viewBox="0 0 24 24" version="1.1">
                                            <title>Bookmark</title>
                                            <g id="bookmark" stroke="none" stroke-width="1" fill="none"
                                               fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                                <g id="bookmark-inner" transform="translate(4.500000, 2.500000)"
                                                   stroke="#000000" stroke-width="1.5">
                                                    <line x1="4.042443" y1="6.7177" x2="10.897443" y2="6.7177"
                                                          id="Stroke-1"/>
                                                    <path
                                                        d="M7.47024319,0 C1.08324319,0 0.00424318741,0.932 0.00424318741,8.429 C0.00424318741,16.822 -0.152756813,19 1.44324319,19 C3.03824319,19 5.64324319,15.316 7.47024319,15.316 C9.29724319,15.316 11.9022432,19 13.4972432,19 C15.0932432,19 14.9362432,16.822 14.9362432,8.429 C14.9362432,0.932 13.8572432,0 7.47024319,0 Z"
                                                        id="Stroke-2"/>
                                                </g>
                                            </g>
                                        </svg>
                                        <p className="pictures-inner-right-item-inner-bottom-nav-item-text">21k</p>
                                    </div>
                                    <div className="pictures-inner-right-item-inner-bottom-nav-shadow"></div>
                                </div>
                            </div>
                        </div>
                        <div className="pictures-inner-right-item-overlay"></div>
                        <img className="pictures-inner-right-item-background"
                             src="https://images.unsplash.com/photo-1611274721547-4d72550e7e19?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                             alt=""/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PicturesSec;
