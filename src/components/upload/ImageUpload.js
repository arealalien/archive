import React, { forwardRef, useImperativeHandle, useState } from "react";

const ImageUpload = forwardRef(({ onFileChange }, ref) => {
    const [error, setError] = useState('');

    useImperativeHandle(ref, () => ({
        triggerFileInput() {
            document.getElementById('file-input-2').click();
        }
    }));

    const handleImageFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setError('');

        if (selectedFile) {
            onFileChange(selectedFile); // Pass the selected file to the parent component
        } else {
            setError('No file selected.');
        }
    };

    return (
        <>
            <input
                id="file-input-2"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageFileChange}
            />
            {error && <p>{error}</p>}
        </>
    );
});

export default ImageUpload;