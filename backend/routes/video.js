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
                        profilePicture: true,
                        banner: true,
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
                        profilePicture: true,
                        banner: true,
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


module.exports = router;