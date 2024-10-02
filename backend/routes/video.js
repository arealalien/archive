const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Endpoint to increment the view count
router.post('/videos/:videoUrl/increment-view', async (req, res) => {
    const { videoUrl } = req.params;
    try {
        const updatedVideo = await prisma.video.update({
            where: { videoUrl: `${videoUrl}.mp4` },
            data: {
                views: { increment: 1 }
            }
        });
        res.json(updatedVideo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to get video details by videoUrl
router.get('/videos/:videoUrl', async (req, res) => {
    const { videoUrl } = req.params;
    try {
        const video = await prisma.video.findUnique({
            where: { videoUrl: `${videoUrl}.mp4` },
            select: {
                id: true,
                title: true,
                description: true,
                videoUrl: true,
                datePosted: true,
                views: true,
                likes: true,
                creator: {
                    select: {
                        id: true,
                        name: true,
                        displayName: true,
                        profilePicture: true,
                        banner: true,
                        verified: true,
                        _count: {
                            select: { subscribers: true }
                        }
                    }
                }
            }
        });
        if (video) {
            res.json(video);
        } else {
            res.status(404).json({ error: 'Video not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to get videos, optionally filtered by creator
router.get('/videos', async (req, res) => {
    const { creator } = req.query;
    try {
        const where = creator ? {
            creator: {
                name: creator,
            },
        } : {};

        const videos = await prisma.video.findMany({
            where,
            orderBy: {
                datePosted: 'desc',
            },
            select: {
                id: true,
                title: true,
                description: true,
                videoUrl: true,
                datePosted: true,
                views: true,
                likes: true,
                duration: true,
                creator: {
                    select: {
                        id: true,
                        name: true,
                        displayName: true,
                        profilePicture: true,
                        banner: true,
                        verified: true,
                    }
                }
            }
        });

        res.json(videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/discoveryvideos', async (req, res) => {
    const { creator } = req.query;
    try {
        const where = creator ? {
            creator: {
                name: creator,
            },
        } : {};

        const videos = await prisma.video.findMany({
            where,
            orderBy: {
                views: 'desc',
            },
            select: {
                id: true,
                title: true,
                description: true,
                videoUrl: true,
                datePosted: true,
                views: true,
                likes: true,
                duration: true,
                creator: {
                    select: {
                        id: true,
                        name: true,
                        displayName: true,
                        profilePicture: true,
                        banner: true,
                        verified: true,
                    }
                }
            }
        });

        res.json(videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/featuredvideos', async (req, res) => {
    const { creator } = req.query;
    try {
        const where = creator ? {
            creator: {
                name: creator,
            },
        } : {};

        const videos = await prisma.video.findMany({
            where,
            orderBy: {
                views: 'desc',
            },
            select: {
                id: true,
                title: true,
                description: true,
                videoUrl: true,
                datePosted: true,
                views: true,
                likes: true,
                duration: true,
                creator: {
                    select: {
                        id: true,
                        name: true,
                        displayName: true,
                        profilePicture: true,
                        banner: true,
                        verified: true,
                    }
                }
            },
            take: 4
        });

        res.json(videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/featuredvideo', async (req, res) => {
    const { creator } = req.query;
    try {
        const where = creator ? {
            creator: {
                name: creator,
            },
        } : {};

        const videos = await prisma.video.findMany({
            where,
            orderBy: {
                views: 'desc',
            },
            select: {
                id: true,
                title: true,
                description: true,
                videoUrl: true,
                datePosted: true,
                views: true,
                likes: true,
                duration: true,
                creator: {
                    select: {
                        id: true,
                        name: true,
                        displayName: true,
                        profilePicture: true,
                        banner: true,
                        verified: true,
                    }
                }
            },
            take: 1
        });

        res.json(videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/videos/:videoUrl/like', async (req, res) => {
    const { videoUrl } = req.params;
    const { userId } = req.body;

    try {
        const video = await prisma.video.findUnique({
            where: { videoUrl: `${videoUrl}` }
        });

        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId.id },
            include: { likedVideos: true } // Include liked videos to check for duplicates
        });

        const isAlreadyLiked = user.likedVideos.some(likedVideo => likedVideo.id === video.id);

        if (!isAlreadyLiked) {
            // Add the video to the user's likedVideos and likedBy relationship
            await prisma.user.update({
                where: { id: userId },
                data: {
                    likedVideos: {
                        connect: { id: video.id }
                    }
                }
            });

            await prisma.video.update({
                where: { id: video.id },
                data: {
                    likedBy: {
                        connect: { id: user.id }
                    }
                }
            });
        }

        const likedPlaylist = await prisma.playlist.findUnique({
            where: {
                creatorId_name: {
                    creatorId: userId.id,
                    name: 'Liked Videos'
                }
            }
        });

        if (!likedPlaylist) {
            return res.status(404).json({ error: 'Liked Videos playlist not found' });
        }

        // Add the video to the "Liked Videos" playlist in PlaylistVideo
        await prisma.playlistVideo.create({
            data: {
                playlist: {
                    connect: { id: likedPlaylist.id }
                },
                video: {
                    connect: { id: video.id }
                }
            }
        });
        console.log('Video added to Liked Videos playlist in PlaylistVideo table');

        res.json({ message: 'Video liked and added to Liked Videos playlist' });
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;