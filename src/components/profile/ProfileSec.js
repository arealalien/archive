import React from "react";
import { NavLink } from "react-router-dom";

// Components
import VideosSec from "../videos/VideosSec";
import PlaylistsSec from "../playlists/PlaylistsSec";
import CreatorsSec from "../creator/CreatorsSec";

const ProfileSec  = ({ profile, profileName, page }) => {

    const renderSettingsContent = () => {
        switch(page) {
            case 'subscribers':
                return (
                    <>
                        <div className="profile-inner-content-right">
                            <div className="profile-inner-content-right-title">
                                <h3 className="profile-inner-content-right-title-name">Subscribers</h3>
                            </div>
                            <div className="creators-inner">
                                <CreatorsSec user={profileName}/>
                            </div>
                        </div>
                    </>
                );
            case 'videos':
                return (
                    <>
                        <div className="profile-inner-content-right">
                            <div className="profile-inner-content-right-title">
                                <h3 className="profile-inner-content-right-title-name">Videos</h3>
                            </div>
                            <div className="profile-inner-content-right-videos videos-inner-4 videos-inner">
                                <VideosSec videoCreator={profileName}/>
                            </div>
                        </div>
                    </>
                );
            case 'playlists':
                return (
                    <div className="profile-inner-content-right playlists-grid">
                        <div className="profile-inner-content-right-title">
                            <h3 className="profile-inner-content-right-title-name">Playlists</h3>
                        </div>
                        <div className="profile-inner-content-right-playlists playlists-grid-inner">
                            <PlaylistsSec videoCreator={profileName} creator={profile}/>
                        </div>
                    </div>
                );
            default:
                return (
                    <>
                        <div className="profile-inner-content-right">
                            <div className="profile-inner-content-right-title">
                                <h3 className="profile-inner-content-right-title-name">Videos</h3>
                                <p className="profile-inner-content-right-title-divider">&middot;</p>
                                <NavLink to={`/channel/` + profile.name + `/videos`}
                                         className="profile-inner-content-right-title-link">See all</NavLink>
                            </div>
                            <div className="profile-inner-content-right-videos videos-inner-4 videos-inner">
                                <VideosSec videoCreator={profileName}/>
                            </div>
                        </div>
                        <div className="profile-inner-content-right playlists-grid">
                            <div className="profile-inner-content-right-title">
                                <h3 className="profile-inner-content-right-title-name">Playlists</h3>
                                <p className="profile-inner-content-right-title-divider">&middot;</p>
                                <NavLink to={`/channel/` + profile.name + `/playlists`}
                                         className="profile-inner-content-right-title-link">See all</NavLink>
                            </div>
                            <div className="profile-inner-content-right-playlists playlists-grid-inner">
                                <PlaylistsSec videoCreator={profileName} creator={profile}/>
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
