import React, { useContext, useState, useRef, useCallback, useEffect  } from "react";
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import ScrollBar from './ScrollBar';

const SideBarLeft  = () => {
    const [sidebarWidth, setSidebarWidth] = useState(() => {
        const savedWidth = localStorage.getItem('sidebarWidth');
        return savedWidth ? parseFloat(savedWidth) : 35;
    });
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const sidebarRef = useRef(null);
    const noteRef = useRef(null);
    const noteNameRef = useRef(null);
    const noteUsernameRef = useRef(null);
    const isResizing = useRef(false);
    const prevWidth = useRef(sidebarWidth);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
                const response = await fetch(`http://localhost:5000/playlists?creator=${encodeURIComponent(user.name)}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch videos');
                }
                const data = await response.json();
                setPlaylists(data.map(playlist => ({
                    ...playlist
                })));
            } catch (error) {
                console.error('Error fetching video data:', error);
            }
        };

        fetchPlaylists();
    }, [user]);

    useEffect(() => {
        localStorage.setItem('sidebarWidth', sidebarWidth);
    }, [sidebarWidth]);

    const handleMouseMove = useCallback((e) => {
        if (isResizing.current) {
            e.preventDefault(); // Prevent text selection or other default actions
            const sidebarRect = sidebarRef.current.getBoundingClientRect();
            const newWidth = Math.max(8, Math.min(45, ((e.clientX - sidebarRect.left) / window.innerWidth) * 190));

            // Check if newWidth crosses the thresholds
            if ((prevWidth.current >= 25 && newWidth < 25) || (prevWidth.current <= 8 && newWidth > 8) || (newWidth >= 25 || newWidth <= 8)) {
                setSidebarWidth(newWidth);
                prevWidth.current = newWidth;
            }
        }
    }, []);

    const handleMouseUp = useCallback(() => {
        if (isResizing.current) {
            isResizing.current = false;
            setIsMouseDown(false);
            document.querySelector(".page-center").style.opacity = 1;
            document.querySelector(".sidebarright").style.opacity = 1;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }, [handleMouseMove, sidebarWidth]);

    const handleMouseDown = useCallback((e) => {
        e.preventDefault(); // Prevent text selection or other default actions
        isResizing.current = true;
        setIsMouseDown(true);
        document.querySelector(".page-center").style.opacity = .65;
        document.querySelector(".sidebarright").style.opacity = .65;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove, handleMouseUp]);

    const getResizeButtonStyle = () => {
        if (isMouseDown) {
            if (sidebarWidth <= 15) return {
                opacity: '1',
                animation: 'none'
            };
            if (sidebarWidth <= 26) return {
                opacity: '1',
                animation: 'resize-button .2s linear infinite'
            };
            if (sidebarWidth <= 27) return {
                opacity: '.6',
                animation: 'resize-button 1.4s linear infinite'
            };
            if (sidebarWidth <= 28) return {
                opacity: '.3',
                animation: 'resize-button 2.6s linear infinite'
            };
            if (sidebarWidth <= 29) return {
                opacity: '0',
                animation: 'none'
            };
        }
    };

    const getDisplayStyle2 = () => {
        if (sidebarWidth <= 8) return { display: 'none' };
        if (sidebarWidth > 15) return { display: 'flex' };
        return { display: 'none' }; // default
    };

    const getRetardDisplayStyle = () => {
        if (sidebarWidth <= 8) return { display: 'none' };
        if (sidebarWidth > 27) return { display: 'block' };
        return { display: 'none' }; // default
    };

    const getButtonStyle = () => {
        if (sidebarWidth <= 8) return { padding: '1em' };
        if (sidebarWidth > 27) return { padding: '1em 1.5em' };
        return { padding: '1em' };
    };

    const getButtonWrapperStyle = () => {
        if (sidebarWidth <= 8) return { padding: '.5em', display: 'none' };
        if (sidebarWidth > 15) return { padding: '1.5em', display: 'flex' };
        return { padding: '.5em', display: 'none' };
    };

    const getIslandStyle = () => {
        if (sidebarWidth <= 8) return { margin: '0 1em 0 1em' };
        if (sidebarWidth > 15) return { margin: '0 1.5em 0 1.5em' };
        return { margin: '0 1em 0 1em' };
    };

    const getPlaylistStyle = () => {
        if (sidebarWidth <= 8) return { gridTemplateColumns: '1fr', padding: '.6em', borderRadius: '1.75em' };
        if (sidebarWidth > 15) return { gridTemplateColumns: '5.5em 1fr', padding: '.8em', borderRadius: '2em' };
        return { gridTemplateColumns: '1fr', padding: '.6em', borderRadius: '1.75em' };
    };

    const getNoteStyle = () => {
        if (sidebarWidth <= 8) return { display: 'block' };
        if (sidebarWidth > 15) return { display: 'none' };
        return { display: 'block' }; // default
    };

    const getMenu2Style = () => {
        if (sidebarWidth <= 8) return { padding: '1em' };
        if (sidebarWidth > 15) return { padding: '1.5em' };
        return { padding: '1em' }; // default
    };

    useEffect(() => {
        const savedWidth = localStorage.getItem('sidebarWidth');
        if (savedWidth) {
            setSidebarWidth(parseFloat(savedWidth));
        }
    }, []);

    const handleMouseMoveNote = useCallback((e) => {
        if (noteRef.current) {
            noteRef.current.style.transform = `translate(${e.pageX}px, ${e.pageY}px)`;
        }
    }, []);

    const handleNoteNameChange = useCallback((title, username, opacity) => {
        if (noteNameRef.current) {
            noteNameRef.current.textContent = title;
        }
        if (noteUsernameRef.current) {
            noteUsernameRef.current.textContent = username;
        }
        if (noteRef.current) {
            noteRef.current.style.opacity = opacity;
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMoveNote);
        return () => {
            document.removeEventListener('mousemove', handleMouseMoveNote);
        };
    }, [handleMouseMoveNote]);

    return (
        <div className="sidebar sidebarleft">
            <div id="sidebarleft-resize" className="sidebarleft-resize" onMouseDown={handleMouseDown}>
                <div className="sidebarleft-resize-button" style={getResizeButtonStyle()}>
                    <svg id="Xnix_Line_Magnet" data-name="Xnix/Line/Magnet"
                         width="24"
                         height="24" viewBox="0 0 24 24">
                        <path id="Vector"
                              d="M6,14A6,6,0,0,1,0,8V4.5a1,1,0,0,1,1-1H2a1,1,0,0,1,1,1V8A3,3,0,0,0,9,8V4.5a1,1,0,0,1,1-1h1a1,1,0,0,1,1,1V8A6,6,0,0,1,6,14Z"
                              transform="translate(6 5)" fill="none" stroke="#000" stroke-linecap="round"
                              stroke-linejoin="round" stroke-width="1.5"/>
                        <path id="Vector-2" data-name="Vector" d="M9,6h3M0,6H3M6,0,5,2H7L6,4" transform="translate(6 5)"
                              fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="1.5"/>
                    </svg>
                </div>
                <div className="sidebarleft-note" ref={noteRef} style={getNoteStyle()}>
                    <p className="sidebarleft-note-title" ref={noteNameRef}></p>
                    <p className="sidebarleft-note-subtitle">By <span ref={noteUsernameRef}>@username</span></p>
                </div>
            </div>
            <div className="sidebar-inner sidebar-left" style={{width: `${sidebarWidth}em`}} ref={sidebarRef}>
                <ScrollBar className="sidebar-left-inner">
                    <div className="sidebar-left-island" style={getIslandStyle()}>
                        <div className="sidebar-left-island-inner" style={getButtonWrapperStyle()}>
                            <div className="sidebar-left-island-inner-top">
                                <div className="sidebar-left-island-inner-top-left" style={getButtonStyle()}>
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
                                    <p className="sidebar-left-island-inner-top-left-text"
                                       style={getRetardDisplayStyle()}>Your Library</p>
                                </div>
                                <div className="sidebar-left-island-inner-top-right" style={getDisplayStyle2()}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px"
                                         viewBox="0 0 24 24" version="1.1">
                                        <title>Plus</title>
                                        <g id="plus" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="plus-inner" transform="translate(2.300000, 2.300000)"
                                               stroke="#000000"
                                               stroke-width="1.5">
                                                <line x1="9.73684179" y1="6.162632" x2="9.73684179"
                                                      y2="13.3110531"
                                                      id="Stroke-1"/>
                                                <line x1="13.3146315" y1="9.73684179" x2="6.158842"
                                                      y2="9.73684179"
                                                      id="Stroke-2"/>
                                                <path
                                                    d="M-3.55271368e-14,9.73684211 C-3.55271368e-14,2.43473684 2.43473684,2.13162821e-14 9.73684211,2.13162821e-14 C17.0389474,2.13162821e-14 19.4736842,2.43473684 19.4736842,9.73684211 C19.4736842,17.0389474 17.0389474,19.4736842 9.73684211,19.4736842 C2.43473684,19.4736842 -3.55271368e-14,17.0389474 -3.55271368e-14,9.73684211 Z"
                                                    id="Stroke-3"/>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div className="sidebar-left-island-inner-bottom" style={getDisplayStyle2()}>
                                <div className="sidebar-left-island-inner-bottom-scrollable">
                                    <div className="sidebar-left-island-inner-bottom-scrollable-overlay"></div>
                                    <div className="sidebar-left-island-inner-bottom-scrollable-drag">
                                        <div className="sidebar-left-island-inner-bottom-button active">
                                            <p className="sidebar-left-island-inner-bottom-button-title">Playlists</p>
                                        </div>
                                        <div className="sidebar-left-island-inner-bottom-button">
                                            <p className="sidebar-left-island-inner-bottom-button-title">Subscriptions</p>
                                        </div>
                                        <div className="sidebar-left-island-inner-bottom-button">
                                            <p className="sidebar-left-island-inner-bottom-button-title">Saved</p>
                                        </div>
                                        <div className="sidebar-left-island-inner-bottom-button">
                                            <p className="sidebar-left-island-inner-bottom-button-title">By Archive</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar-left-playlists" style={getMenu2Style()}>
                        <div className="sidebar-left-playlists-list">
                            {playlists.length > 0 ? (
                                playlists.map((playlist, index) => (
                                    <NavLink to={`/playlist?list=` + playlist.playlistUrl} className="sidebar-left-playlists-list-item" key={index}
                                             style={getPlaylistStyle()}
                                             onMouseEnter={() => handleNoteNameChange(playlist.name, "@" + playlist.creator.name, "1")}
                                             onMouseLeave={() => handleNoteNameChange(playlist.name, "@" + playlist.creator.name, "0")}>
                                        <div className="sidebar-left-playlists-list-item-left">
                                            <img className="sidebar-left-playlists-list-item-left-image"
                                                 src={process.env.PUBLIC_URL + `/images/gallery/0476d014bcfd4716611c1c59f8f7611b.jpg`}
                                                 alt=""/>
                                        </div>
                                        <div className="sidebar-left-playlists-list-item-right"
                                             style={getDisplayStyle2()}>
                                            <h3 className="sidebar-left-playlists-list-item-right-title">{playlist.name}</h3>
                                            <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                        </div>
                                    </NavLink>
                                ))
                            ) : (
                                <p></p>
                            )}
                            <NavLink to="/playlist1" className="sidebar-left-playlists-list-item"
                                     style={getPlaylistStyle()}
                                     onMouseEnter={() => handleNoteNameChange("🪷 Top 200 volume 2024 🪷", "@username", "1")}
                                     onMouseLeave={() => handleNoteNameChange("🪷 Top 200 volume 2024 🪷", "@username", "0")}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/0476d014bcfd4716611c1c59f8f7611b.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right"
                                     style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">🪷 Top 200 volume 2024
                                        🪷</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink to="/playlist1" className="sidebar-left-playlists-list-item"
                                     style={getPlaylistStyle()}
                                     onMouseEnter={() => handleNoteNameChange("🐸 Top 200 volume 2023 🐸", "@username", "1")}
                                     onMouseLeave={() => handleNoteNameChange("🐸 Top 200 volume 2023 🐸", "@username", "0")}>
                            <div className="sidebar-left-playlists-list-item-left">
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/173558115_790424168538166_2849205650520624862_n.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right"
                                     style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">🐸 Top 200 volume 2023
                                        🐸</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink to="/playlist1" className="sidebar-left-playlists-list-item"
                                     style={getPlaylistStyle()}
                                     onMouseEnter={() => handleNoteNameChange("Poopie doopie Name", "@username", "1")}
                                     onMouseLeave={() => handleNoteNameChange("Poopie doopie Name", "@username", "0")}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/135060407_240088560971081_6826181255437109694_n.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right"
                                     style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">Poopie doopie
                                        Name</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink to="/playlist1" className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}
                                     onMouseEnter={() => handleNoteNameChange("Shoort", "@username", "1")}
                                     onMouseLeave={() => handleNoteNameChange("Shoort", "@username", "0")}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/317227331_166200936047228_5967614100849288512_n.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right"
                                     style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">Shoort</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink to="/playlist1" className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}
                                     onMouseEnter={() => handleNoteNameChange("Playlist Name", "@username", "1")}
                                     onMouseLeave={() => handleNoteNameChange("Playlist Name", "@username", "0")}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/347504210_2210436199143577_4984331646709175478_n.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right"
                                     style={getDisplayStyle2()}>
                                <h3 className="sidebar-left-playlists-list-item-right-title">📖 Tangled sheets, magazines on the floor, beeing teenager again 📖</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink to="/playlist1" className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}
                                     onMouseEnter={() => handleNoteNameChange("A Longer Playlist Nameee", "@username", "1")}
                                     onMouseLeave={() => handleNoteNameChange("A Longer Playlist Nameee", "@username", "0")}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/155839804_115429443928743_8673419221365525306_n.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right"
                                     style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">A Longer
                                        Playlist
                                        Nameee</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink to="/playlist1" className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}
                                     onMouseEnter={() => handleNoteNameChange("Poopie doopie Name", "@username", "1")}
                                     onMouseLeave={() => handleNoteNameChange("Poopie doopie Name", "@username", "0")}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/118809709_249357199583197_8804687060382916519_n.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right"
                                     style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">Poopie doopie
                                        Name</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink to="/playlist1" className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}
                                     onMouseEnter={() => handleNoteNameChange("Shoort", "@username", "1")}
                                     onMouseLeave={() => handleNoteNameChange("Shoort", "@username", "0")}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/100507160_277101373474665_8527359069873583537_n.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right"
                                     style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">Shoort</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink to="/playlist1" className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}
                                     onMouseEnter={() => handleNoteNameChange("Mhmmmm 🩰", "@username", "1")}
                                     onMouseLeave={() => handleNoteNameChange("Mhmmmm 🩰", "@username", "0")}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/Ym1H5ip.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right"
                                     style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">Mhmmmm 🩰</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink to="/playlist1" className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}
                                     onMouseEnter={() => handleNoteNameChange("Hmmm kinda shoort", "@username", "1")}
                                     onMouseLeave={() => handleNoteNameChange("Hmmm kinda shoort", "@username", "0")}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/tumblr_orrsz3IAuf1vot3zgo1_500.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right"
                                     style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">Hmmm kinda shoort</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink to="/playlist1" className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}
                                     onMouseEnter={() => handleNoteNameChange("Longer than short", "@username", "1")}
                                     onMouseLeave={() => handleNoteNameChange("Longer than short", "@username", "0")}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/347717546_576210121266890_1431385856945323170_n.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right"
                                     style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">Longer than short</h3>
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
