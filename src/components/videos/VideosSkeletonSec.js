import React from "react";

const VideosSkeletonSec = ({ count }) => {
    const skeletonItems = Array.from({ length: count }, (_, index) => index);

    return (
        <>
            {skeletonItems.map((_, index) => (
                <div key={index} className="skeleton-inner-item">
                    <div className="skeleton-inner-item-video"></div>
                    <div className="skeleton-inner-item-info">
                        <div className="skeleton-inner-item-bottom-info-left">
                            <div className="skeleton-inner-item-info-left-image"></div>
                        </div>
                        <div className="skeleton-inner-item-info-right">
                            <div className="skeleton-inner-item-info-right-title"></div>
                            <div className="skeleton-inner-item-info-right-name"><span></span></div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default VideosSkeletonSec;