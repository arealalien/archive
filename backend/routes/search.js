const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/search', async (req, res) => {
    const { query, skip, take } = req.query;
    try {
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }

        const where = query ? {
            title: {
                contains: query.toLowerCase(),
            },
        } : {};

        const videos = await prisma.video.findMany({
            where,
            orderBy: {
                datePosted: 'desc',
            },
            skip: parseInt(skip, 10),
            take: parseInt(take, 10),
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

        const totalVideos = await prisma.video.count({ where });
        res.json({ videos, totalVideos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;