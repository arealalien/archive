import React, { useRef } from "react";
import FileUpload from './FileUpload';

const UploadForm = () => {
    const videoUploadRef = useRef(null);

    const handleVideoUpload = () => {

    };

    return (
        <section className="upload">
            <div className="upload-inner view-width">
                <div className="upload-inner-first">
                    <button className="mainbutton" onClick={() => videoUploadRef.current.triggerFileInput()}>Choose
                        Video
                    </button>
                    <FileUpload ref={videoUploadRef}
                                uploadUrl={`http://localhost:5000/upload/video`}
                                onSuccess={handleVideoUpload}
                                fileKey="video"/>
                </div>
                <div className="upload-inner-second">
                    <div className="upload-inner-second-top">
                        <div className="upload-inner-second-left">
                            <div className="upload-inner-second-left-container">
                                <div className="upload-inner-second-left-container-overlay"></div>
                                <img className="upload-inner-second-left-container-background"
                                     src="https://images.unsplash.com/photo-1675361519358-6b802204f8d5?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                     alt=""/>
                            </div>
                            <div className="upload-inner-second-left-bottomcontainer">
                                <div className="upload-inner-second-left-bottomcontainer-upload">
                                    <div className="upload-inner-second-left-bottomcontainer-upload-shadow"></div>
                                </div>
                                <div className="upload-inner-second-left-bottomcontainer-image">
                                    <img className="upload-inner-second-left-bottomcontainer-image-background"
                                         src="https://images.unsplash.com/photo-1532373213958-5156f1836b37?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                         alt=""/>
                                    <div className="upload-inner-second-left-bottomcontainer-upload-shadow"></div>
                                </div>
                                <div className="upload-inner-second-left-bottomcontainer-image">
                                    <img className="upload-inner-second-left-bottomcontainer-image-background"
                                         src="https://images.unsplash.com/photo-1667818139461-7772a11554f9?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                         alt=""/>
                                    <div className="upload-inner-second-left-bottomcontainer-upload-shadow"></div>
                                </div>
                                <div className="upload-inner-second-left-bottomcontainer-image">
                                    <img className="upload-inner-second-left-bottomcontainer-image-background"
                                         src="https://images.unsplash.com/photo-1675361519358-6b802204f8d5?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                         alt=""/>
                                    <div className="upload-inner-second-left-bottomcontainer-upload-shadow"></div>
                                </div>
                            </div>
                        </div>
                        <div className="upload-inner-second-right">
                            <fieldset className="upload-inner-second-right-form-center">
                                <div className="upload-inner-second-right-form-center-container">
                                    <label
                                        className="upload-inner-second-right-form-center-container-label">Title*</label>
                                    <div className="upload-inner-second-right-form-center-container-input">
                                        <input id="title" type="text" placeholder="Title" name="title"
                                               aria-label="" required/>
                                    </div>
                                </div>
                                <div className="upload-inner-second-right-form-center-container">
                                    <label
                                        className="upload-inner-second-right-form-center-container-label">Description*</label>
                                    <div className="upload-inner-second-right-form-center-container-input">
                                    <textarea id="description" placeholder="Description"
                                              name="description"
                                              aria-label="" required/>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <div className="upload-inner-second-bottom">
                        <div className="upload-inner-second-bottom-progress view-width">
                            <div className="upload-inner-second-bottom-progress-inner">
                                <div className="upload-inner-second-bottom-progress-left">
                                    <p>50%</p>
                                </div>
                                <div className="upload-inner-second-bottom-progress-center">
                                    <div className="upload-inner-second-bottom-progress-center-bar">
                                        <div className="upload-inner-second-bottom-progress-center-bar-inner"></div>
                                    </div>
                                </div>
                                <div className="upload-inner-second-bottom-progress-right">
                                    <button className="blackbutton">
                                        Cancel
                                        <div className="blackbutton-shadow"></div>
                                    </button>
                                    <button className="mainbutton">Save</button>
                                </div>
                                <div className="upload-inner-second-bottom-progress-inner-shadow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UploadForm;