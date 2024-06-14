import React from "react";
import {NavLink} from "react-router-dom";

const VideosSec  = () => {
    const videoData = [
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "13:11",
            background: process.env.PUBLIC_URL + `/images/image.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "06:23",
            background: process.env.PUBLIC_URL + `/images/image-2.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "51:41",
            background: process.env.PUBLIC_URL + `/images/image-3.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "16:05",
            background: process.env.PUBLIC_URL + `/images/image-4.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "01:45",
            background: process.env.PUBLIC_URL + `/images/image-5.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "41:07",
            background: process.env.PUBLIC_URL + `/images/image-6.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "32:56",
            background: process.env.PUBLIC_URL + `/images/image-7.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "11:11",
            background: process.env.PUBLIC_URL + `/images/image-8.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-9.jpg`
        },{
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-2.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-3.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-4.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-5.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-6.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-7.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-8.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-9.jpg`
        },{
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-2.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-3.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-4.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-5.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-6.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-7.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-8.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-9.jpg`
        },{
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-2.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-3.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-4.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-5.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-6.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-7.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-8.jpg`
        },
        {
            src: "https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Photography shoot at night | EP 1",
            username: "Channel Name",
            time: "21:45",
            background: process.env.PUBLIC_URL + `/images/image-9.jpg`
        }
    ];

    return (
        <>
            {videoData.map((video, index) => (
                <div className="videos-inner-item" key={index}>
                    <div className="videos-inner-item-top-info">
                        <NavLink to="/profile" className="videos-inner-item-top-info-user">
                            <div className="videos-inner-item-top-info-user-picture">
                                <img className="videos-inner-item-top-info-user-picture-image" src={video.src} alt=""/>
                            </div>
                            <p className="videos-inner-item-top-info-user-username">{video.username}</p>
                            <div className="videos-inner-item-top-info-user-shadow"></div>
                        </NavLink>
                        <div className="videos-inner-item-top-info-time">
                            <p>{video.time}</p>
                            <div className="videos-inner-item-top-info-time-shadow"></div>
                        </div>
                    </div>
                    <div className="videos-inner-item-bottom-info">
                        <h3 className="videos-inner-item-bottom-info-title">{video.title}</h3>
                        <p className="videos-inner-item-bottom-info-info">1.2M Views &middot; 2 days ago</p>
                    </div>
                    <NavLink to="/video" className="videos-inner-item-overlay"></NavLink>
                    <img className="videos-inner-item-background" src={video.background} alt=""/>
                </div>
            ))}
        </>
    );
};

export default VideosSec;
