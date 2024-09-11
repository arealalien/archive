const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/playlists', async (req, res) => {
    const { creator } = req.query;

    try {
        const where = creator ? {
            creator: {
                name: creator,
            },
        } : {};

        const playlists = await prisma.playlist.findMany({
            where,
            select: {
                id: true,
                name: true,
                playlistUrl: true,
                creator: {
                    select: {
                        name: true,
                        profilePicture: true,
                        verified: true,
                    },
                },
            },
        });
        if (playlists.length > 0) {
            res.json(playlists);
        } else {
            res.status(404).json({ error: 'No playlists found for this user' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/playlistsUrl', async (req, res) => {
    const { url } = req.query;

    try {
        const playlist = await prisma.playlist.findUnique({
            where: { playlistUrl: url },
            select: {
                id: true,
                name: true,
                playlistUrl: true,
                creator: {
                    select: {
                        name: true,
                        profilePicture: true,
                        verified: true,
                    },
                },
            },
        });

        if (playlist) {
            res.json(playlist);
        } else {
            res.status(404).json({ error: 'No playlist found for this URL' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;