import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ uploadUrl, onSuccess }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('No file selected');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        try {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage or context
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post(uploadUrl, formData, config);
            onSuccess(response.data.filePath);
        } catch (err) {
            setError(err.response?.data?.error || 'Upload failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default FileUpload;