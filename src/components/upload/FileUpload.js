import React, { forwardRef, useImperativeHandle, useState } from "react";

const FileUpload = forwardRef(({ onFileChange, onProgress }, ref) => {
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);

    useImperativeHandle(ref, () => ({
        triggerFileInput() {
            document.getElementById('file-input').click();
        }
    }));

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setError('');
        setProgress(0);

        if (selectedFile) {
            const videoElement = document.createElement('video');
            videoElement.preload = 'metadata';

            const reader = new FileReader();

            reader.onprogress = function (event) {
                if (event.lengthComputable) {
                    const percentLoaded = Math.round((event.loaded / event.total) * 100);
                    setProgress(percentLoaded);  // Update the progress
                }
            };

            reader.onloadstart = function () {
                setProgress(0);  // Reset progress to 0 when load starts
            };

            reader.onloadend = function () {
                setProgress(100);  // Set progress to 100% when load ends
            };

            reader.onload = function () {
                videoElement.src = URL.createObjectURL(selectedFile);

                videoElement.onloadedmetadata = function () {
                    window.URL.revokeObjectURL(videoElement.src);
                    const duration = videoElement.duration;
                    onFileChange(selectedFile, duration);
                };
            };

            reader.onerror = function () {
                setError('Error reading file');
            };

            reader.readAsDataURL(selectedFile);  // Start reading the file as a data URL
        } else {
            setError('No file selected.');
        }
    };

    return (
        <>
            <input
                id="file-input"
                type="file"
                accept="video/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            {progress > 0 && (
                <div className="upload-inner-second-bottom upload-progress">
                    <div className="upload-inner-second-bottom-progress view-width">
                        <div className="upload-inner-second-bottom-progress-inner">
                            <div className="upload-inner-second-bottom-progress-left">
                                <p className="upload-inner-second-bottom-progress-left-number">{progress}%</p>
                            </div>
                            <div className="upload-inner-second-bottom-progress-center">
                                <div className="upload-inner-second-bottom-progress-center-bar">
                                    <div className="upload-inner-second-bottom-progress-center-bar-inner"
                                         style={{width: `${progress}%`}}></div>
                                </div>
                            </div>
                            <div className="upload-inner-second-bottom-progress-right">
                                <button className="blackbutton">
                                    Cancel
                                    <div className="blackbutton-shadow"></div>
                                </button>
                                <button type="submit" className="mainbutton">Save</button>
                            </div>
                            <div className="upload-inner-second-bottom-progress-inner-shadow"></div>
                        </div>
                    </div>
                </div>
            )}
            {error && <p>{error}</p>}
        </>
    );
});

export default FileUpload;