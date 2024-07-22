const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/search', async (req, res) => {
    const { search } = req.query;
    try {
        if (!search) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }

        const videos = await prisma.video.findMany({
            where: {
                title: {
                    contains: search,
                    mode: 'insensitive',
                },
            },
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