const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

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
            orderBy: {
                dateCreated: 'asc',
            },
            select: {
                id: true,
                name: true,
                playlistUrl: true,
                playlistImg: true,
                visibility: true,
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

router.get('/featuredplaylists', async (req, res) => {
    const { creator } = req.query;

    try {
        const where = creator ? {
            name: {
                not: 'Liked Videos',
            },
            creator: {
                name: creator,
            },
        } : {};

        const playlists = await prisma.playlist.findMany({
            where,
            orderBy: {
                dateCreated: 'asc',
            },
            select: {
                id: true,
                name: true,
                playlistUrl: true,
                playlistImg: true,
                visibility: true,
                creator: {
                    select: {
                        name: true,
                        profilePicture: true,
                        verified: true,
                    },
                },
            },
            take: 5
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
                playlistImg: true,
                visibility: true,
                creator: {
                    select: {
                        id: true,
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

router.get('/createPlaylists', async (req, res) => {
    const { creator } = req.query;

    try {
        // Retrieve userId by their name (creator)
        const user = await prisma.user.findUnique({ where: { name: creator } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userId = user.id;
        const playlistUrl = uuidv4(); // Generate unique playlist URL
        const userFolder = path.join(__dirname, '../', '../', 'public', 'users', userId.toString());
        const playlistFolder = path.join(userFolder, 'playlists');
        const playlistSubFolder = path.join(userFolder, 'playlists', playlistUrl);

        console.log('User Folder Path:', userFolder);
        console.log('Playlist Folder Path:', playlistFolder);
        console.log('Playlist Subfolder Path:', playlistSubFolder);

        // Ensure the user's playlist folder exists
        if (!fs.existsSync(userFolder)) {
            console.log('Creating user folder...');
            fs.mkdirSync(userFolder, { recursive: true });
        }

        if (!fs.existsSync(playlistFolder)) {
            console.log('Creating playlist folder...');
            fs.mkdirSync(playlistFolder, { recursive: true });
        }

        if (!fs.existsSync(playlistSubFolder)) {
            console.log('Creating playlist subfolder...');
            fs.mkdirSync(playlistSubFolder, { recursive: true });
        }

        // Retrieve the number of playlists the user has created
        const playlistsCount = await prisma.playlist.count({
            where: { creatorId: userId }
        });

        // Generate the new playlist name
        const playlistName = `My Playlist #${playlistsCount}`;

        // Create the playlist in the database
        const newPlaylist = await prisma.playlist.create({
            data: {
                name: playlistName,
                playlistUrl: playlistUrl,
                creator: { connect: { id: userId } },
            },
        });

        // Return response after creation
        res.status(200).json({
            message: 'Playlist created successfully!',
            playlistUrl,
        });

    } catch (error) {
        console.error('Error creating playlist:', error);
        res.status(500).json({ error: 'Failed to create playlist' });
    }
});

module.exports = router;