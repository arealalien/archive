import React, {useContext, useState, useRef} from "react";
import { AuthContext } from '../../contexts/AuthContext';
import FileUpload from './FileUpload';

const EditProfileHeader = () => {
    const [profilePictureUrl, setProfilePictureUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');
    const { user } = useContext(AuthContext);

    const profilePictureUploadRef = useRef(null);
    const bannerUploadRef = useRef(null);

    const handleProfilePictureUpload = (filePath) => {
        setProfilePictureUrl(`http://localhost:5000/${filePath}`);
    };

    const handleBannerUpload = (filePath) => {
        setBannerUrl(`http://localhost:5000/${filePath}`);
    };

    return (
        <section className="editprofile-inner-details">
            <div className="editprofile-inner-details-picture">
                <div className="editprofile-inner-details-picture-edit" onClick={() => profilePictureUploadRef.current.triggerFileInput()}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         height="24px" viewBox="0 0 24 24" version="1.1">
                        <title>Edit</title>
                        <g id="edit" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
                           stroke-linecap="round" stroke-linejoin="round">
                            <g id="edit-inner" transform="translate(3.500000, 3.500000)" stroke="#000000"
                               stroke-width="1.5">
                                <line x1="9.8352" y1="16.0078" x2="16.2122" y2="16.0078" id="Stroke-1"/>
                                <path
                                    d="M12.5578,1.3589 L12.5578,1.3589 C11.2138,0.3509 9.3078,0.6229 8.2998,1.9659 C8.2998,1.9659 3.2868,8.6439 1.5478,10.9609 C-0.1912,13.2789 1.4538,16.1509 1.4538,16.1509 C1.4538,16.1509 4.6978,16.8969 6.4118,14.6119 C8.1268,12.3279 13.1638,5.6169 13.1638,5.6169 C14.1718,4.2739 13.9008,2.3669 12.5578,1.3589 Z"
                                    id="Stroke-3"/>
                                <line x1="7.0041" y1="3.7114" x2="11.8681" y2="7.3624" id="Stroke-5"/>
                            </g>
                        </g>
                    </svg>
                    <div className="editprofile-inner-details-picture-edit-shadow"></div>
                </div>
                <div className="editprofile-inner-details-picture-container">
                    <img className="editprofile-inner-details-picture-container-image" src={process.env.PUBLIC_URL + user?.profilePicture} alt=""/>
                </div>
            </div>
            <FileUpload ref={profilePictureUploadRef}
                        uploadUrl={`http://localhost:5000/upload/profile-picture`}
                        onSuccess={handleProfilePictureUpload}
                        fileKey="profilePicture" />
            <div className="editprofile-inner-details-header">
                <div className="editprofile-inner-details-header-edit" onClick={() => bannerUploadRef.current.triggerFileInput()}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         height="24px" viewBox="0 0 24 24" version="1.1">
                        <title>Edit</title>
                        <g id="edit" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
                           stroke-linecap="round" stroke-linejoin="round">
                            <g id="edit-inner" transform="translate(3.500000, 3.500000)" stroke="#000000"
                               stroke-width="1.5">
                                <line x1="9.8352" y1="16.0078" x2="16.2122" y2="16.0078" id="Stroke-1"/>
                                <path
                                    d="M12.5578,1.3589 L12.5578,1.3589 C11.2138,0.3509 9.3078,0.6229 8.2998,1.9659 C8.2998,1.9659 3.2868,8.6439 1.5478,10.9609 C-0.1912,13.2789 1.4538,16.1509 1.4538,16.1509 C1.4538,16.1509 4.6978,16.8969 6.4118,14.6119 C8.1268,12.3279 13.1638,5.6169 13.1638,5.6169 C14.1718,4.2739 13.9008,2.3669 12.5578,1.3589 Z"
                                    id="Stroke-3"/>
                                <line x1="7.0041" y1="3.7114" x2="11.8681" y2="7.3624" id="Stroke-5"/>
                            </g>
                        </g>
                    </svg>
                    <div className="editprofile-inner-details-header-edit-shadow"></div>
                </div>
                <div className="editprofile-inner-details-header-container">
                    <img className="editprofile-inner-details-header-container-image" src={process.env.PUBLIC_URL + user?.banner} alt=""/>
                </div>
            </div>
            <FileUpload ref={bannerUploadRef}
                        uploadUrl={`http://localhost:5000/upload/banner`}
                        onSuccess={handleBannerUpload}
                        fileKey="banner" />
        </section>
    );
};

export default EditProfileHeader;