import React from "react";

// Components
import VideosSec from "../videos/VideosSec";

const ProfileSec  = ({ profileName, page }) => {

    const renderSettingsContent = () => {
        switch(page) {
            case 'videos':
                return (
                    <>
                        <div>videos</div>
                        <div className="profile-inner-content-right videos-inner videos-inner-4">
                            <div className="profile-inner-content-right-videos videos-inner videos-inner-4">
                                <VideosSec videoCreator={profileName}/>
                            </div>
                        </div>
                    </>
                );
            case 'pictures':
                return (
                    <div>pictures</div>
                );
            case 'playlists':
                return (
                    <div>playlists</div>
                );
            default:
                return (
                    <div className="profile-inner-content-right videos-inner videos-inner-4">
                        <div className="profile-inner-content-right-videos videos-inner videos-inner-4">
                            <VideosSec videoCreator={profileName}/>
                        </div>
                    </div>
                );
        }
    };

    return (
        renderSettingsContent()
    );
};

export default ProfileSec;
