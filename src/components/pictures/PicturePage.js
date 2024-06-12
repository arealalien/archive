import React, {useState} from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

// Components
import PicturesNav from "./PicturesNav";

const PicturesSec  = ({ pictureimage, picturecreator, picturecreatorimage, picturedate, picturelikes, picturecomments, picturesaves }) => {
    const [fullVisible, setFullVisible] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)

    const handlePictureClick = () => {
        setFullVisible(!fullVisible);
    };

    const handleCloseClick = () => {
        setFullVisible(!fullVisible);
    };

    const pictureFullStyle = {
        opacity: fullVisible ? 1 : 0,
        pointerEvents: fullVisible ? "auto" : "none",
    };

    const [sliderRef, instanceRef] = useKeenSlider({
        loop: false,
        mode: "free",
        initial: 0,
        dragSpeed: ".6",
        centered: true,
        easing: "cubic-bezier(.175, .685, .32, 1)",
        slides: {
            perView: "auto",
            spacing: 20,
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        }
    })

    return (
        <>
            <div className="pictures-inner-right-full" style={pictureFullStyle}>
                <div className="pictures-inner-right-full-inner">
                    <div className="pictures-inner-right-full-inner-left">
                        <div className="pictures-inner-right-full-inner-left-bar">
                            <p className="pictures-inner-right-full-inner-left-bar-title">
                                <button className="pictures-inner-right-full-inner-left-bar-title-button" onClick={handleCloseClick}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <title>Close Square</title>
                                        <g id="close-square" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="close-square" transform="translate(2.000000, 2.000000)"
                                               stroke="#000000" stroke-width="1.5">
                                                <line x1="12.3941" y1="7.5948" x2="7.6021" y2="12.3868" id="Stroke-1"/>
                                                <line x1="12.3999" y1="12.3931" x2="7.5999" y2="7.5931" id="Stroke-2"/>
                                                <path
                                                    d="M0.75,10.0001 C0.75,16.9371 3.063,19.2501 10,19.2501 C16.937,19.2501 19.25,16.9371 19.25,10.0001 C19.25,3.0631 16.937,0.7501 10,0.7501 C3.063,0.7501 0.75,3.0631 0.75,10.0001 Z"
                                                    id="Stroke-3"/>
                                            </g>
                                        </g>
                                    </svg>
                                    <span>Close</span>
                                </button>
                            </p>
                            <div className="pictures-inner-right-full-inner-left-bar-shadow"></div>
                        </div>
                        <div className="pictures-inner-right-full-inner-left-comments">
                            <div className="pictures-inner-right-full-inner-left-comments-top">
                                <h3 className="pictures-inner-right-full-inner-left-comments-top-title">Comments</h3>
                            </div>
                            <div className="pictures-inner-right-full-inner-left-comments-center">

                            </div>
                            <div className="pictures-inner-right-full-inner-left-comments-bottom">
                                <div className="pictures-inner-right-full-inner-left-comments-bottom-item">
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
                                    <p className="pictures-inner-right-full-inner-left-comments-bottom-item-text">{picturelikes}</p>
                                </div>
                                <div className="pictures-inner-right-full-inner-left-comments-bottom-item">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px"
                                         viewBox="0 0 24 24" version="1.1">
                                        <title>Chat</title>
                                        <g id="chat" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="chat-inner" transform="translate(2.000000, 2.000000)"
                                               stroke="#000000">
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
                                    <p className="pictures-inner-right-full-inner-left-comments-bottom-item-text">{picturecomments}</p>
                                </div>
                                <div className="pictures-inner-right-full-inner-left-comments-bottom-item">
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
                                    <p className="pictures-inner-right-full-inner-left-comments-bottom-item-text">{picturesaves}</p>
                                </div>
                            </div>
                            <div className="pictures-inner-right-full-inner-left-comments-shadow"></div>
                        </div>
                    </div>
                    <div className="pictures-inner-right-full-inner-right">
                        <div ref={sliderRef} className="keen-slider pictures-inner-right-full-inner-right-container">
                            <img className="keen-slider__slide pictures-inner-right-full-inner-right-container-image"
                                 src={pictureimage}
                                 alt=""/>
                            <img className="keen-slider__slide pictures-inner-right-full-inner-right-container-image"
                                 src={pictureimage}
                                 alt=""/>
                            <img className="keen-slider__slide pictures-inner-right-full-inner-right-container-image"
                                 src={pictureimage}
                                 alt=""/>
                            <img className="keen-slider__slide pictures-inner-right-full-inner-right-container-image"
                                 src={pictureimage}
                                 alt=""/>
                            <img className="keen-slider__slide pictures-inner-right-full-inner-right-container-image"
                                 src={pictureimage}
                                 alt=""/>
                        </div>
                        {loaded && instanceRef.current && (
                            <div className="pictures-inner-right-full-inner-right-dots">
                                {[
                                    ...Array(instanceRef.current.track.details.slides.length).keys(),
                                ].map((idx) => {
                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => {
                                                instanceRef.current?.moveToIdx(idx)
                                            }}
                                            className={"pictures-inner-right-full-inner-right-dots-dot" + (currentSlide === idx ? " active" : "")}
                                        ></div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="pictures-inner-right-item">
                <div className="pictures-inner-right-item-inner">
                    <div className="pictures-inner-right-item-inner-top">
                        <div className="pictures-inner-right-item-inner-top-container">
                            <img className="pictures-inner-right-item-inner-top-container-image"
                                 src={picturecreatorimage}
                                 alt=""/>
                        </div>
                        <div className="pictures-inner-right-item-inner-top-text">
                            <h3 className="pictures-inner-right-item-inner-top-text-username">{picturecreator}</h3>
                            <p className="pictures-inner-right-item-inner-top-text-date">{picturedate}</p>
                        </div>
                    </div>
                    <div className="pictures-inner-right-item-inner-bottom">
                        <div className="pictures-inner-right-item-inner-bottom-dots" onClick={handlePictureClick}>
                            <div className="pictures-inner-right-item-inner-bottom-dots-dot active"></div>
                            <div className="pictures-inner-right-item-inner-bottom-dots-dot"></div>
                            <div className="pictures-inner-right-item-inner-bottom-dots-dot"></div>
                            <div className="pictures-inner-right-item-inner-bottom-dots-dot"></div>
                            <div className="pictures-inner-right-item-inner-bottom-dots-dot"></div>
                        </div>
                        <PicturesNav picturelikes={picturelikes} picturecomments={picturecomments}
                                     picturesaves={picturesaves}/>
                    </div>
                </div>
                <div className="pictures-inner-right-item-overlay"></div>
                <img className="pictures-inner-right-item-background"
                     src={pictureimage}
                     alt=""/>
            </div>
        </>
    );
};

export default PicturesSec;
