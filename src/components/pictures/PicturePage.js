import React from "react";

// Components
import PicturesNav from "./PicturesNav";

const PicturesSec  = ({ pictureimage, picturecreator, picturecreatorimage, picturedate, picturelikes, picturecomments, picturesaves }) => {
    return (
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
                    <div className="pictures-inner-right-item-inner-bottom-dots">
                        <div className="pictures-inner-right-item-inner-bottom-dots-dot active"></div>
                        <div className="pictures-inner-right-item-inner-bottom-dots-dot"></div>
                        <div className="pictures-inner-right-item-inner-bottom-dots-dot"></div>
                        <div className="pictures-inner-right-item-inner-bottom-dots-dot"></div>
                        <div className="pictures-inner-right-item-inner-bottom-dots-dot"></div>
                    </div>
                    <PicturesNav picturelikes={picturelikes} picturecomments={picturecomments} picturesaves={picturesaves}/>
                </div>
            </div>
            <div className="pictures-inner-right-item-overlay"></div>
            <img className="pictures-inner-right-item-background"
                 src={pictureimage}
                 alt=""/>
        </div>
    );
};

export default PicturesSec;
