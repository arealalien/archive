import React, {useRef, useState} from "react";
import FileUpload from './FileUpload';
import ImageUpload from './ImageUpload';
import axios from 'axios';

const UploadForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [videoDuration, setVideoDuration] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [showDetailsForm, setShowDetailsForm] = useState(false);
    const videoUploadRef = useRef(null);
    const imageUploadRef = useRef(null);

    const handleVideoFileChange = (file, duration) => {
        setVideoFile(file);
        setVideoDuration(duration);
        setShowDetailsForm(true);
    };

    const handleImageFileChange = (file) => {
        setImageFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

            // Upload video file
            const videoFormData = new FormData();
            videoFormData.append('video', videoFile);
            videoFormData.append('title', title);
            videoFormData.append('description', description);
            videoFormData.append('duration', videoDuration);

            const videoResponse = await axios.post('http://localhost:5000/upload/video', videoFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`, // Add the Authorization header
                },
            });

            const { videoUrl } = videoResponse.data;

            // Ensure videoUrl is not undefined
            if (!videoUrl) {
                throw new Error('Video URL is missing in the response');
            }

            // Upload thumbnail image
            const imageFormData = new FormData();
            imageFormData.append('image', imageFile);
            imageFormData.append('videoUrl', videoUrl.split('.')[0]); // Pass the videoUrl to the thumbnail upload

            await axios.post('http://localhost:5000/upload/thumbnail', imageFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`, // Add the Authorization header
                },
            });

            alert('Video metadata and thumbnail saved successfully!');
            setTitle('');
            setDescription('');
            setVideoFile(null);
            setImageFile(null);
            setShowDetailsForm(false);
        } catch (error) {
            console.error('Error saving video metadata:', error.response ? error.response.data : error.message); // More detailed error logging
            alert('Failed to save video metadata and thumbnail.');
        }
    };

    return (
        <section className="upload">
            <div className="upload-inner view-width">
                <div className={`upload-inner-first ${showDetailsForm ? 'hidden' : ''}`}>
                    <button className="mainbutton" onClick={() => videoUploadRef.current.triggerFileInput()}>
                        Choose Video
                    </button>
                    <FileUpload
                        ref={videoUploadRef}
                        onFileChange={handleVideoFileChange}
                        fileKey="video"
                    />
                </div>
                {showDetailsForm && (
                    <form onSubmit={handleSubmit} className="upload-inner-second">
                        <div className="upload-inner-second-top">
                            <div className="upload-inner-second-left">
                                <div className="upload-inner-second-left-container">
                                    <div className="upload-inner-second-left-container-overlay"></div>
                                    <img className="upload-inner-second-left-container-background"
                                         src="https://images.unsplash.com/photo-1675361519358-6b802204f8d5?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                         alt=""/>
                                </div>
                                <div className="upload-inner-second-left-bottomcontainer">
                                    <div className="upload-inner-second-left-bottomcontainer-upload" onClick={() => imageUploadRef.current.triggerFileInput()}>
                                        <div className="upload-inner-second-left-bottomcontainer-upload-shadow"></div>
                                    </div>
                                    <ImageUpload
                                        ref={imageUploadRef}
                                        onFileChange={handleImageFileChange}
                                        fileKey="image"
                                    />
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
                                            <input
                                                id="title"
                                                type="text"
                                                placeholder="Title"
                                                name="title"
                                                required
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="upload-inner-second-right-form-center-container">
                                        <label
                                            className="upload-inner-second-right-form-center-container-label">Description*</label>
                                        <div className="upload-inner-second-right-form-center-container-input">
                                            <textarea
                                                id="description"
                                                placeholder="Description"
                                                name="description"
                                                required
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
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
                                        <button className="blackbutton" onClick={() => setShowDetailsForm(false)}>
                                            Cancel
                                            <div className="blackbutton-shadow"></div>
                                        </button>
                                        <button type="submit" className="mainbutton">Save</button>
                                    </div>
                                    <div className="upload-inner-second-bottom-progress-inner-shadow"></div>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
};

export default UploadForm;