const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Endpoint to get user details by username
router.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                displayName: true,
                profilePicture: true,
                banner: true,
                verified: true,
            },
        });
        if (users) {
            res.json(users);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;