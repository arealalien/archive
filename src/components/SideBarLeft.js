import React, { useContext, useState, useRef, useCallback, useEffect  } from "react";
import { AuthContext } from '../contexts/AuthContext';
import { NavLink } from "react-router-dom";
import ScrollBar from './ScrollBar';

const SideBarLeft  = () => {
    const [sidebarWidth, setSidebarWidth] = useState(() => {
        const savedWidth = localStorage.getItem('sidebarWidth');
        return savedWidth ? parseFloat(savedWidth) : 35;
    });
    const sidebarRef = useRef(null);
    const isResizing = useRef(false);
    const prevWidth = useRef(sidebarWidth);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        localStorage.setItem('sidebarWidth', sidebarWidth);
    }, [sidebarWidth]);

    const handleMouseMove = useCallback((e) => {
        if (isResizing.current) {
            e.preventDefault(); // Prevent text selection or other default actions
            const sidebarRect = sidebarRef.current.getBoundingClientRect();
            const newWidth = Math.max(8, Math.min(40, ((e.clientX - sidebarRect.left) / window.innerWidth) * 190));

            // Check if newWidth crosses the thresholds
            if ((prevWidth.current >= 20 && newWidth < 20) || (prevWidth.current <= 8 && newWidth > 8) || (newWidth >= 20 || newWidth <= 8)) {
                setSidebarWidth(newWidth);
                prevWidth.current = newWidth;
            }
        }
    }, []);

    const handleMouseUp = useCallback(() => {
        if (isResizing.current) {
            isResizing.current = false;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }, [handleMouseMove, sidebarWidth]);

    const handleMouseDown = useCallback((e) => {
        e.preventDefault(); // Prevent text selection or other default actions
        isResizing.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove, handleMouseUp]);

    const getDisplayStyle = () => {
        if (sidebarWidth <= 8) return { display: 'none' };
        if (sidebarWidth > 15) return { display: 'block' };
        return { display: 'none' }; // default
    };

    const getDisplayStyle2 = () => {
        if (sidebarWidth <= 8) return { display: 'none' };
        if (sidebarWidth > 15) return { display: 'flex' };
        return { display: 'none' }; // default
    };

    const getButtonStyle = () => {
        if (sidebarWidth <= 8) return { padding: '1.75em 1em', borderRadius: '2em', justifyContent: 'center' };
        if (sidebarWidth > 15) return { padding: '1.75em 2.25em', borderRadius: '2em', justifyContent: 'flex-start' };
        return { padding: '1.75em 1em', borderRadius: '2em', justifyContent: 'center' };
    };

    const getPlaylistStyle = () => {
        if (sidebarWidth <= 8) return { gridTemplateColumns: '1fr', padding: '.6em', borderRadius: '1.75em' };
        if (sidebarWidth > 15) return { gridTemplateColumns: '5em 1fr', padding: '1em', borderRadius: '2.25em' };
        return { gridTemplateColumns: '1fr', padding: '.6em', borderRadius: '1.75em' };
    };

    const getMenuStyle = () => {
        if (sidebarWidth <= 8) return { padding: '1em' };
        if (sidebarWidth > 15) return { padding: '1.5em' };
        return { padding: '1em' }; // default
    };

    const getMenu2Style = () => {
        if (sidebarWidth <= 8) return { padding: '1em 1em 6em 1em' };
        if (sidebarWidth > 15) return { padding: '1.5em 1.5em 6em 1.5em' };
        return { padding: '1em 1em 6em 1em' }; // default
    };

    useEffect(() => {
        const savedWidth = localStorage.getItem('sidebarWidth');
        if (savedWidth) {
            setSidebarWidth(parseFloat(savedWidth));
        }
    }, []);

    return (
        <div className="sidebar sidebarleft">
            <div id="sidebarleft-resize" className="sidebarleft-resize" onMouseDown={handleMouseDown}></div>
            <div className="sidebar-inner sidebar-left" style={{ width: `${sidebarWidth}em` }} ref={sidebarRef}>
                <ScrollBar className="sidebar-left-inner">
                    <div className="sidebar-left-menu" style={getMenuStyle()}>
                        <div className="sidebar-left-menu-list">
                            <NavLink to="/" className="sidebar-left-menu-list-item" style={getButtonStyle()}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <title>Home</title>
                                    <g id="home" stroke="none" stroke-width="1" fill="none"
                                       fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                        <g id="home-inner" transform="translate(2.400000, 2.000000)" stroke="#000000"
                                           stroke-width="1.5">
                                            <line x1="6.6787" y1="14.1354" x2="12.4937" y2="14.1354" id="Stroke-1"/>
                                            <path
                                                d="M1.24344979e-14,11.713 C1.24344979e-14,6.082 0.614,6.475 3.919,3.41 C5.365,2.246 7.615,0 9.558,0 C11.5,0 13.795,2.235 15.254,3.41 C18.559,6.475 19.172,6.082 19.172,11.713 C19.172,20 17.213,20 9.586,20 C1.959,20 1.24344979e-14,20 1.24344979e-14,11.713 Z"
                                                id="Stroke-2"/>
                                        </g>
                                    </g>
                                </svg>
                                <p className="sidebar-left-menu-list-item-text" style={getDisplayStyle()}>Home</p>
                            </NavLink>
                            <NavLink to="/pictures" className="sidebar-left-menu-list-item" style={getButtonStyle()}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <title>Discovery</title>
                                    <g id="discovery" stroke="none" stroke-width="1" fill="none"
                                       fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                        <g id="discovery-inner" transform="translate(2.000000, 2.000000)"
                                           stroke="#000000"
                                           stroke-width="1.5">
                                            <path
                                                d="M0.75,10.0001 C0.75,16.9371 3.063,19.2501 10,19.2501 C16.937,19.2501 19.25,16.9371 19.25,10.0001 C19.25,3.0631 16.937,0.7501 10,0.7501 C3.063,0.7501 0.75,3.0631 0.75,10.0001 Z"
                                                id="Stroke-1"/>
                                            <polygon id="Stroke-3"
                                                     points="6.6978 13.3023 8.2718 8.2723 13.3018 6.6983 11.7278 11.7273"/>
                                        </g>
                                    </g>
                                </svg>
                                <p className="sidebar-left-menu-list-item-text" style={getDisplayStyle()}>Discover</p>
                            </NavLink>
                            <NavLink to="/live" className="sidebar-left-menu-list-item" style={getButtonStyle()}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <title>Video</title>
                                    <g id="video" stroke="none" stroke-width="1" fill="none"
                                       fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                        <g id="video-inner" transform="translate(2.514381, 5.114095)" stroke="#000000"
                                           stroke-width="1.5">
                                            <path
                                                d="M13.6370476,4.55866688 C15.4751429,3.10152403 17.9418095,1.69200022 18.4084762,2.19676212 C19.1799048,3.02533355 19.1132381,10.9110478 18.4084762,11.6634288 C17.9799048,12.1300955 15.4941905,10.7205716 13.6370476,9.2729526"
                                                id="Stroke-1"/>
                                            <path
                                                d="M-6.21724894e-15,6.92285714 C-6.21724894e-15,1.73047619 1.7247619,-2.66453526e-15 6.90095238,-2.66453526e-15 C12.0761905,-2.66453526e-15 13.8009524,1.73047619 13.8009524,6.92285714 C13.8009524,12.1142857 12.0761905,13.8457143 6.90095238,13.8457143 C1.7247619,13.8457143 -6.21724894e-15,12.1142857 -6.21724894e-15,6.92285714 Z"
                                                id="Stroke-3"/>
                                        </g>
                                    </g>
                                </svg>
                                <p className="sidebar-left-menu-list-item-text" style={getDisplayStyle()}>Live</p>
                            </NavLink>
                            {user && (
                                <NavLink to="/playlists" className="sidebar-left-menu-list-item" style={getButtonStyle()}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <title>Folder</title>
                                        <g id="folder" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="folder-inner" transform="translate(2.500000, 2.500000)"
                                               stroke="#000000"
                                               stroke-width="1.5">
                                                <line x1="4.8057" y1="12.0742685" x2="14.3987" y2="12.0742685"
                                                      id="Stroke-1"/>
                                                <path
                                                    d="M-1.13686838e-13,5.29836453 C-1.13686838e-13,2.85645977 1.25,0.75931691 3.622,0.272650243 C5.993,-0.214968804 7.795,-0.0463973758 9.292,0.761221672 C10.79,1.56884072 10.361,2.76122167 11.9,3.63645977 C13.44,4.51265024 15.917,3.19645977 17.535,4.94217405 C19.229,6.7697931 19.2200005,9.57550739 19.2200005,11.3640788 C19.2200005,18.1602693 15.413,18.6993169 9.61,18.6993169 C3.807,18.6993169 -1.13686838e-13,18.2288407 -1.13686838e-13,11.3640788 L-1.13686838e-13,5.29836453 Z"
                                                    id="Stroke-2"/>
                                            </g>
                                        </g>
                                    </svg>
                                    <p className="sidebar-left-menu-list-item-text" style={getDisplayStyle()}>Playlists</p>
                                </NavLink>
                            )}
                        </div>
                    </div>
                    <div className="sidebar-left-divider">
                        <p className="sidebar-left-divider-text" style={getDisplayStyle()}>Playlists</p>
                        <div className="sidebar-left-divider-line"></div>
                    </div>
                    <div className="sidebar-left-playlists" style={getMenu2Style()}>
                        <div className="sidebar-left-playlists-list">
                            <NavLink className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <div className="sidebar-left-playlists-list-item-left-button">
                                        <svg className="video-play-play" xmlns="http://www.w3.org/2000/svg"
                                             id="Xnix_Line_Play" data-name="Xnix/Line/Play"
                                             width="24" height="24" viewBox="0 0 24 24">
                                            <path id="Vector"
                                                  d="M.35,6.285,4.647.6a1.412,1.412,0,0,1,2.3,0l4.7,5.69A1.676,1.676,0,0,1,10.5,9H1.5A1.676,1.676,0,0,1,.35,6.285Z"
                                                  transform="translate(16 6) rotate(90)" fill="none" stroke="#000"
                                                  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                                        </svg>
                                    </div>
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/0476d014bcfd4716611c1c59f8f7611b.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right" style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">Playlist Name</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <div className="sidebar-left-playlists-list-item-left-button">
                                        <svg className="video-play-play" xmlns="http://www.w3.org/2000/svg"
                                             id="Xnix_Line_Play" data-name="Xnix/Line/Play"
                                             width="24" height="24" viewBox="0 0 24 24">
                                            <path id="Vector"
                                                  d="M.35,6.285,4.647.6a1.412,1.412,0,0,1,2.3,0l4.7,5.69A1.676,1.676,0,0,1,10.5,9H1.5A1.676,1.676,0,0,1,.35,6.285Z"
                                                  transform="translate(16 6) rotate(90)" fill="none" stroke="#000"
                                                  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                                        </svg>
                                    </div>
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/173558115_790424168538166_2849205650520624862_n.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right" style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">A Longer Playlist
                                        Nameee</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <div className="sidebar-left-playlists-list-item-left-button">
                                        <svg className="video-play-play" xmlns="http://www.w3.org/2000/svg"
                                             id="Xnix_Line_Play" data-name="Xnix/Line/Play"
                                             width="24" height="24" viewBox="0 0 24 24">
                                            <path id="Vector"
                                                  d="M.35,6.285,4.647.6a1.412,1.412,0,0,1,2.3,0l4.7,5.69A1.676,1.676,0,0,1,10.5,9H1.5A1.676,1.676,0,0,1,.35,6.285Z"
                                                  transform="translate(16 6) rotate(90)" fill="none" stroke="#000"
                                                  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                                        </svg>
                                    </div>
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/135060407_240088560971081_6826181255437109694_n.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right" style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">Poopie doopie Name</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <div className="sidebar-left-playlists-list-item-left-button">
                                        <svg className="video-play-play" xmlns="http://www.w3.org/2000/svg"
                                             id="Xnix_Line_Play" data-name="Xnix/Line/Play"
                                             width="24" height="24" viewBox="0 0 24 24">
                                            <path id="Vector"
                                                  d="M.35,6.285,4.647.6a1.412,1.412,0,0,1,2.3,0l4.7,5.69A1.676,1.676,0,0,1,10.5,9H1.5A1.676,1.676,0,0,1,.35,6.285Z"
                                                  transform="translate(16 6) rotate(90)" fill="none" stroke="#000"
                                                  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                                        </svg>
                                    </div>
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/317227331_166200936047228_5967614100849288512_n.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right" style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">Shoort</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <div className="sidebar-left-playlists-list-item-left-button">
                                        <svg className="video-play-play" xmlns="http://www.w3.org/2000/svg"
                                             id="Xnix_Line_Play" data-name="Xnix/Line/Play"
                                             width="24" height="24" viewBox="0 0 24 24">
                                            <path id="Vector"
                                                  d="M.35,6.285,4.647.6a1.412,1.412,0,0,1,2.3,0l4.7,5.69A1.676,1.676,0,0,1,10.5,9H1.5A1.676,1.676,0,0,1,.35,6.285Z"
                                                  transform="translate(16 6) rotate(90)" fill="none" stroke="#000"
                                                  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                                        </svg>
                                    </div>
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/0476d014bcfd4716611c1c59f8f7611b.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right" style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">Playlist Name</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <div className="sidebar-left-playlists-list-item-left-button">
                                        <svg className="video-play-play" xmlns="http://www.w3.org/2000/svg"
                                             id="Xnix_Line_Play" data-name="Xnix/Line/Play"
                                             width="24" height="24" viewBox="0 0 24 24">
                                            <path id="Vector"
                                                  d="M.35,6.285,4.647.6a1.412,1.412,0,0,1,2.3,0l4.7,5.69A1.676,1.676,0,0,1,10.5,9H1.5A1.676,1.676,0,0,1,.35,6.285Z"
                                                  transform="translate(16 6) rotate(90)" fill="none" stroke="#000"
                                                  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                                        </svg>
                                    </div>
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/173558115_790424168538166_2849205650520624862_n.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right" style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">A Longer Playlist
                                        Nameee</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <div className="sidebar-left-playlists-list-item-left-button">
                                        <svg className="video-play-play" xmlns="http://www.w3.org/2000/svg"
                                             id="Xnix_Line_Play" data-name="Xnix/Line/Play"
                                             width="24" height="24" viewBox="0 0 24 24">
                                            <path id="Vector"
                                                  d="M.35,6.285,4.647.6a1.412,1.412,0,0,1,2.3,0l4.7,5.69A1.676,1.676,0,0,1,10.5,9H1.5A1.676,1.676,0,0,1,.35,6.285Z"
                                                  transform="translate(16 6) rotate(90)" fill="none" stroke="#000"
                                                  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                                        </svg>
                                    </div>
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/135060407_240088560971081_6826181255437109694_n.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right" style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">Poopie doopie Name</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <div className="sidebar-left-playlists-list-item-left-button">
                                        <svg className="video-play-play" xmlns="http://www.w3.org/2000/svg"
                                             id="Xnix_Line_Play" data-name="Xnix/Line/Play"
                                             width="24" height="24" viewBox="0 0 24 24">
                                            <path id="Vector"
                                                  d="M.35,6.285,4.647.6a1.412,1.412,0,0,1,2.3,0l4.7,5.69A1.676,1.676,0,0,1,10.5,9H1.5A1.676,1.676,0,0,1,.35,6.285Z"
                                                  transform="translate(16 6) rotate(90)" fill="none" stroke="#000"
                                                  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                                        </svg>
                                    </div>
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/317227331_166200936047228_5967614100849288512_n.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right" style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">Shoort</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </ScrollBar>
            </div>
        </div>
    );
};

export default SideBarLeft;
