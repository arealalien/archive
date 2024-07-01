import React from "react";

const VideoSec  = () => {
    return (
        <div className="video-inner-left-box">
            <div className="player">
                <div className="player-bottom">
                    <div className="player-bottom-inner">
                        <div className="player-bottom-inner-left">
                            <div className="player-bottom-inner-left-icon icon-small video-prev">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Xnix_Line_Prev" data-name="Xnix/Line/Prev"
                                     width="24" height="24" viewBox="0 0 24 24">
                                    <path id="Vector"
                                          d="M2.715-.35l5.69-4.3a1.412,1.412,0,0,0,0-2.3l-5.69-4.7A1.676,1.676,0,0,0,0-10.5V-1.5A1.676,1.676,0,0,0,2.715-.35Z"
                                          transform="translate(18 6) rotate(180)" fill="none" stroke="#000"
                                          stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                                    <path id="Vector-2" data-name="Vector" d="M12,0V-12"
                                          transform="translate(18 6) rotate(180)" fill="none" stroke="#000"
                                          stroke-linecap="round" stroke-width="1.5"/>
                                </svg>
                            </div>
                            <div className="player-bottom-inner-left-icon video-play">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Xnix_Line_Pause" data-name="Xnix/Line/Pause"
                                     width="24" height="24" viewBox="0 0 24 24">
                                    <path id="Vector"
                                          d="M0,1.125v5.75A1.118,1.118,0,0,0,1.111,8H2.222A1.118,1.118,0,0,0,3.333,6.875V1.125A1.118,1.118,0,0,0,2.222,0H1.111A1.118,1.118,0,0,0,0,1.125Z"
                                          transform="translate(7 8)" fill="none" stroke="#000" stroke-linecap="round"
                                          stroke-linejoin="round" stroke-width="1.5"/>
                                    <path id="Vector-2" data-name="Vector"
                                          d="M6.667,1.125v5.75A1.118,1.118,0,0,0,7.778,8H8.889A1.118,1.118,0,0,0,10,6.875V1.125A1.118,1.118,0,0,0,8.889,0H7.778A1.118,1.118,0,0,0,6.667,1.125Z"
                                          transform="translate(7 8)" fill="none" stroke="#000" stroke-linecap="round"
                                          stroke-linejoin="round" stroke-width="1.5"/>
                                </svg>
                            </div>
                            <div className="player-bottom-inner-left-icon icon-small video-next">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Xnix_Line_Next" data-name="Xnix/Line/Next"
                                     width="24" height="24" viewBox="0 0 24 24">
                                    <path id="Vector"
                                          d="M2.715.35l5.69,4.3a1.412,1.412,0,0,1,0,2.3l-5.69,4.7A1.676,1.676,0,0,1,0,10.5V1.5A1.676,1.676,0,0,1,2.715.35Z"
                                          transform="translate(6 6)" fill="none" stroke="#000" stroke-linecap="round"
                                          stroke-linejoin="round" stroke-width="1.5"/>
                                    <path id="Vector-2" data-name="Vector" d="M12,0V12" transform="translate(6 6)"
                                          fill="none" stroke="#000" stroke-linecap="round" stroke-width="1.5"/>
                                </svg>
                            </div>
                            <div className="player-bottom-inner-left-audio">
                                <div className="player-bottom-inner-left-audio-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Xnix_Line_Vol_High"
                                         data-name="Xnix/Line/Vol High" width="24" height="24" viewBox="0 0 24 24">
                                        <path id="Vector"
                                              d="M1.482,7.98A1.588,1.588,0,0,1,0,6.3V3.7A1.588,1.588,0,0,1,1.482,2.02H2.588a1.375,1.375,0,0,0,.9-.343L5.031.346A1.477,1.477,0,0,1,7.412,1.679V8.321A1.477,1.477,0,0,1,5.031,9.654L3.486,8.323a1.375,1.375,0,0,0-.9-.343Z"
                                              transform="translate(5 7)" fill="none" stroke="#000" stroke-linecap="round"
                                              stroke-linejoin="round" stroke-width="1.5"/>
                                        <path id="Vector-2" data-name="Vector"
                                              d="M12.463.417a7.62,7.62,0,0,1,0,9.167M9.974,1.563a5.265,5.265,0,0,1,0,6.875"
                                              transform="translate(5 7)" fill="none" stroke="#000" stroke-linecap="round"
                                              stroke-linejoin="round" stroke-width="1.5"/>
                                    </svg>
                                </div>
                                <div className="player-bottom-inner-left-audio-bar">
                                    <div className="player-bottom-inner-left-audio-bar-inner">
                                        <div className="player-bottom-inner-left-audio-bar-inner-progress">
                                            <div className="player-bottom-inner-left-audio-bar-inner-progress-dot"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="player-bottom-inner-left-time">
                                <p><span>00:00</span> <span className="player-bottom-inner-left-time-small">/</span> <span>12:56</span></p>
                            </div>
                        </div>
                        <div className="player-bottom-inner-center">
                            <div className="player-bottom-inner-center-bar">
                                <div className="player-bottom-inner-center-bar-inner">
                                    <div className="player-bottom-inner-center-bar-inner-progress">
                                        <div className="player-bottom-inner-center-bar-inner-progress-dot"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="player-bottom-inner-right">
                            <div className="player-bottom-inner-right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15.5" height="15.5"
                                     viewBox="0 0 15.5 15.5">
                                    <path id="Vector" d="M8.75,0H14V5.25M0,8.75V14H5.25M0,5.25V0H5.25m3.5,14H14V8.75"
                                          transform="translate(0.75 0.75)" fill="none" stroke="#000"
                                          stroke-linecap="round"
                                          stroke-linejoin="round" stroke-width="1.5"/>
                                </svg>
                            </div>
                        </div>
                        <div className="player-bottom-inner-shadow"></div>
                    </div>
                </div>
            </div>
            <img
                src="https://images.unsplash.com/photo-1545243424-0ce743321e11?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""/>
        </div>
    )
}
export default VideoSec;