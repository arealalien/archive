import React, { forwardRef, useImperativeHandle, useState } from "react";

const FileUpload = forwardRef(({ onFileChange }, ref) => {
    const [error, setError] = useState('');

    useImperativeHandle(ref, () => ({
        triggerFileInput() {
            document.getElementById('file-input').click();
        }
    }));

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setError('');

        if (selectedFile) {
            onFileChange(selectedFile);
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
            {error && <p>{error}</p>}
        </>
    );
});

export default FileUpload;