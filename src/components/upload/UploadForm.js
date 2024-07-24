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
    const [thumbnails, setThumbnails] = useState({ thumbnail1: '', thumbnail2: '', thumbnail3: '' });
    const [customThumbnail, setCustomThumbnail] = useState('');
    const [showDetailsForm, setShowDetailsForm] = useState(false);
    const videoUploadRef = useRef(null);
    const imageUploadRef = useRef(null);

    const handleVideoFileChange = (file, duration) => {
        setVideoFile(file);
        setVideoDuration(duration);
        setShowDetailsForm(true);

        // Generate thumbnails
        const url = URL.createObjectURL(file);
        const video = document.createElement('video');

        const captureFrame = (time) => {
            return new Promise((resolve) => {
                video.currentTime = time;
                video.onseeked = function () {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = 1280;
                    canvas.height = 720;

                    // Calculate scale factor and dimensions
                    const targetRatio = { w: 16, h: 9 };
                    const targetDimensions = { w: 1280, h: 720 };

                    const rationedWidth = video.videoWidth / targetRatio.w;
                    const rationedHeight = video.videoHeight / targetRatio.h;

                    const sideToScale = rationedWidth > rationedHeight ? 'width' : 'height';
                    const originalSize = sideToScale === 'width' ? video.videoWidth : video.videoHeight;
                    const targetSize = sideToScale === 'width' ? targetDimensions.w : targetDimensions.h;

                    const scaleFactor = targetSize / originalSize;
                    const width2 = Math.round(video.videoWidth * scaleFactor);
                    const height2 = Math.round(video.videoHeight * scaleFactor);
                    const width = (canvas.width - width2) / 2;
                    const height = (canvas.height - height2) / 2;

                    // Draw blurred background
                    context.filter = 'blur(12.5em)';
                    context.drawImage(video, -25, -25, 1330, 770);
                    context.filter = 'none';

                    // Draw actual video frame over blurred background
                    context.drawImage(video, width, height, width2, height2);
                    const image = canvas.toDataURL('image/jpeg', 1.0);
                    resolve(image);
                };
            });
        };

        video.preload = 'metadata';
        video.src = url;
        video.muted = true;
        video.playsInline = true;
        video.play();

        video.onloadedmetadata = async function () {
            const duration = video.duration;
            const thumbnail1 = await captureFrame(duration * 0.25);
            const thumbnail2 = await captureFrame(duration * 0.5);
            const thumbnail3 = await captureFrame(duration * 0.75);

            setThumbnails({ thumbnail1, thumbnail2, thumbnail3 });
            URL.revokeObjectURL(url);
        };
    };

    const handleImageFileChange = (file) => {
        setImageFile(file);
        const imageUrl = URL.createObjectURL(file);
        setCustomThumbnail(imageUrl); // Set the custom thumbnail
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
                                         src={customThumbnail || thumbnails.thumbnail1}
                                         alt=""/>
                                </div>
                                <div className="upload-inner-second-left-bottomcontainer">
                                    <div className="upload-inner-second-left-bottomcontainer-upload"
                                         onClick={() => imageUploadRef.current.triggerFileInput()}>
                                        <p>Upload</p>
                                        <div className="upload-inner-second-left-bottomcontainer-upload-shadow"></div>
                                    </div>
                                    <ImageUpload
                                        ref={imageUploadRef}
                                        onFileChange={handleImageFileChange}
                                        fileKey="image"
                                    />
                                    <div className="upload-inner-second-left-bottomcontainer-image">
                                        <img id="up-image-1"
                                             className="upload-inner-second-left-bottomcontainer-image-background"
                                             src={thumbnails.thumbnail1}
                                             alt=""/>
                                        <div className="upload-inner-second-left-bottomcontainer-upload-shadow"></div>
                                    </div>
                                    <div className="upload-inner-second-left-bottomcontainer-image">
                                        <img id="up-image-2"
                                             className="upload-inner-second-left-bottomcontainer-image-background"
                                             src={thumbnails.thumbnail2}
                                             alt=""/>
                                        <div className="upload-inner-second-left-bottomcontainer-upload-shadow"></div>
                                    </div>
                                    <div className="upload-inner-second-left-bottomcontainer-image">
                                        <img id="up-image-3"
                                             className="upload-inner-second-left-bottomcontainer-image-background"
                                             src={thumbnails.thumbnail3}
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