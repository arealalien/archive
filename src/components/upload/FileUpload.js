import React, { forwardRef } from "react";

const FileUpload = forwardRef(({ uploadUrl, onSuccess }, ref) => {

    return (
        <form>
            <input
                type="file"
                accept="video/*"
                style={{ display: 'none' }}
            />
        </form>
    );
});

export default FileUpload;