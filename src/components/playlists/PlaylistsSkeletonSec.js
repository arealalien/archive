import React from "react";

const PlaylistsSkeletonSec = ({ count }) => {
    const skeletonItems = Array.from({ length: count }, (_, index) => index);

    return (
        <>
            {skeletonItems.map((_, index) => (
                <div key={index} className="playlistsskeleton-grid-inner-item">
                    <div className="playlistsskeleton-grid-inner-item-top">

                    </div>
                </div>
            ))}
        </>
    );
};

export default PlaylistsSkeletonSec;