import React, { useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';

const FileUpload = forwardRef(({ uploadUrl, onSuccess }, ref) => {
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
        formData.append(uploadUrl.includes('profile-picture') ? 'profilePicture' : 'banner', selectedFile);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Token not found. Please log in again.');
                return;
            }
            console.log("Token sent: ", token); // Debugging line
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post(uploadUrl, formData, config);
            console.log('File upload response:', response.data); // Debugging line
            onSuccess(response.data.filePath);
        } catch (err) {
            console.error("Upload error: ", err.response?.data || err.message); // Debugging line
            setError(err.response?.data?.error || 'Upload failed');
        }
    };

    return (
        <form>
            <input
                type="file"
                id={uploadUrl}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            {error && <p>{error}</p>}
        </form>
    );
});

export default FileUpload;