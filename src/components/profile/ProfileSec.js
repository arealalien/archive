import React from "react";

// Components
import VideosSec from "../videos/VideosSec";
import PlaylistsSec from "../playlists/PlaylistsSec";

const ProfileSec  = ({ profileName, page }) => {

    const renderSettingsContent = () => {
        switch(page) {
            case 'videos':
                return (
                    <>
                        <div>videos</div>
                        <div className="profile-inner-content-right">
                            <div className="profile-inner-content-right-videos videos-inner-4 videos-inner">
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
                    <>
                        <div className="profile-inner-content-right">
                            <div className="profile-inner-content-right-videos videos-inner-4 videos-inner">
                                <VideosSec videoCreator={profileName}/>
                            </div>
                        </div>
                        <div className="profile-inner-content-right playlists-grid">
                            <div className="profile-inner-content-right-playlists playlists-grid-inner">
                                <PlaylistsSec videoCreator={profileName}/>
                            </div>
                        </div>
                    </>
                );
        }
    };

    return (
        renderSettingsContent()
    );
};

export default ProfileSec;
