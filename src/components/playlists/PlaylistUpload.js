import React, { useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';

const PlaylistUpload = forwardRef(({ uploadUrl, onSuccess, playlistDetails }, ref) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    useImperativeHandle(ref, () => ({
        triggerFileInput() {
            document.getElementById(uploadUrl).click();
        }
    }));

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setError('');
        handleSubmit(selectedFile);
    };

    const handleSubmit = async (selectedFile) => {
        if (!selectedFile) {
            setError('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('playlistPicture', selectedFile);
        formData.append('playlistUrl', playlistDetails.playlistUrl); // Use playlistDetails prop
        formData.append('userId', playlistDetails.creator.id); // Add userId to the request

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Token not found. Please log in again.');
                return;
            }

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.post(uploadUrl, formData, config);
            onSuccess(response.data.filePath);
        } catch (err) {
            console.error("Upload error: ", err.response?.data || err.message);
            setError(err.response?.data?.error || 'Upload failed');
        }
    };

    return (
        <form>
            <input
                type="file"
                accept="image/jpeg, image/png"
                id={uploadUrl}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            {error && <p>{error}</p>}
        </form>
    );
});

export default PlaylistUpload;