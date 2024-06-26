const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/user/:username/subscribers', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { name: username },
            include: { subscribers: true }, // Include subscribers relation
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const subscriberCount = user.subscribers.length; // Assuming subscribers is an array

        res.json({ subscriberCount });
    } catch (error) {
        console.error('Error fetching subscriber count:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Subscribe endpoint
router.post('/subscribe/:username', async (req, res) => {
    const { username } = req.params;
    const subscriberId = req.userId;

    try {
        const userToSubscribe = await prisma.user.findUnique({
            where: { name: username },
            select: { id: true },
        });

        if (!userToSubscribe) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (userToSubscribe.id === subscriberId) {
            return res.status(400).json({ error: 'You cannot subscribe to yourself' });
        }

        const existingSubscription = await prisma.subscription.findUnique({
            where: {
                subscriberId_subscribedToId: {
                    subscriberId,
                    subscribedToId: userToSubscribe.id,
                },
            },
        });

        if (existingSubscription) {
            return res.status(400).json({ error: 'Already subscribed to this user' });
        }

        await prisma.subscription.create({
            data: {
                subscriberId,
                subscribedToId: userToSubscribe.id,
            },
        });

        res.json({ message: 'Subscribed successfully' }); // Return message
    } catch (error) {
        console.error('Error subscribing to user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/subscribe/:username', async (req, res) => {
    const { username } = req.params;
    const subscriberId = req.userId;

    try {
        const userToUnsubscribe = await prisma.user.findUnique({
            where: { name: username },
            select: { id: true },
        });

        if (!userToUnsubscribe) {
            return res.status(404).json({ error: 'User not found' });
        }

        const existingSubscription = await prisma.subscription.findUnique({
            where: {
                subscriberId_subscribedToId: {
                    subscriberId,
                    subscribedToId: userToUnsubscribe.id,
                },
            },
        });

        if (!existingSubscription) {
            return res.status(400).json({ error: 'Not subscribed to this user' });
        }

        await prisma.subscription.delete({
            where: {
                id: existingSubscription.id,
            },
        });

        res.json({ message: 'Unsubscribed successfully' }); // Return message
    } catch (error) {
        console.error('Error unsubscribing from user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Subscription status endpoint
router.get('/subscribe/status/:username', async (req, res) => {
    const { username } = req.params;
    const subscriberId = req.userId; // Ensure req.userId is correctly set

    try {
        const user = await prisma.user.findUnique({
            where: { name: username },
            select: { id: true },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const subscription = await prisma.subscription.findUnique({
            where: {
                subscriberId_subscribedToId: {
                    subscriberId: subscriberId,
                    subscribedToId: user.id,
                },
            },
        });

        res.json({ isSubscribed: !!subscription });
    } catch (error) {
        console.error('Error checking subscription status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;