import React from "react";

const VideosSec  = ({ startcolums }) => {
    const videoData = [
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-2.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-3.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-4.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-5.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-6.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-7.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-8.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-9.jpg`
        },{
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-2.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-3.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-4.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-5.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-6.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-7.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-8.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-9.jpg`
        },{
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-2.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-3.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-4.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-5.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-6.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-7.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-8.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-9.jpg`
        },{
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-2.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-3.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-4.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-5.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-6.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-7.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-8.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            background: process.env.PUBLIC_URL + `/images/image-9.jpg`
        }

    ];


    const columnsClass = startcolums === "3" ? "videos-inner-3" : "videos-inner-4";

    return (
        <section className="videos">
            <div className={`${columnsClass} videos-inner view-width`}>
                {videoData.map((video, index) => (
                    <div className="videos-inner-item" key={index}>
                        <div className="videos-inner-item-info">
                            <div className="videos-inner-item-info-picture">
                                <img className="videos-inner-item-info-picture-image" src={video.src} alt="" />
                            </div>
                            <div className="videos-inner-item-info-right">
                                <h3 className="videos-inner-item-info-right-title">{video.title}</h3>
                                <p className="videos-inner-item-info-right-username">{video.username}</p>
                            </div>
                        </div>
                        <div className="videos-inner-item-overlay"></div>
                        <img className="videos-inner-item-background" src={video.background} alt="" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default VideosSec;
