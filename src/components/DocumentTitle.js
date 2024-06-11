import { useEffect } from "react";

function DocumentTitle({ title }) {

    useEffect(() => {
        document.title = title;
    }, [title]);
}

export default DocumentTitle;