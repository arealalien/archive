const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Root storage directory
const rootStorageDirectory = path.join(__dirname, 'base_dir', 'users');

// Function to create directory if it doesn't exist
const createDirectoryIfNotExists = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};

// Middleware for token validation
const validateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Function to handle file upload and validation
const handleFileUpload = async (req, res, directory, dimensionCheck, aspectRatio) => {
    const { file } = req;
    const userId = req.userId;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Validate file type and size (max 5MB)
    const validMimeTypes = ['image/jpeg', 'image/png'];
    if (!validMimeTypes.includes(file.mimetype)) {
        return res.status(400).json({ error: 'Invalid file type' });
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB
        return res.status(400).json({ error: 'File too large' });
    }

    try {
        // Validate dimensions and aspect ratio if provided
        const image = sharp(file.buffer);
        const metadata = await image.metadata();

        if (dimensionCheck && (metadata.width < dimensionCheck.width || metadata.height < dimensionCheck.height)) {
            return res.status(400).json({ error: 'Image dimensions are too small' });
        }
        if (aspectRatio && Math.abs(metadata.width / metadata.height - aspectRatio) > 0.01) {
            return res.status(400).json({ error: `Image aspect ratio must be ${aspectRatio}:1` });
        }

        // Create user-specific directory if it doesn't exist
        const userDirectory = path.join(rootStorageDirectory, userId.toString());
        createDirectoryIfNotExists(userDirectory);

        // Save image to file system
        const filename = `${uuidv4()}${path.extname(file.originalname)}`;
        const filePath = path.join(userDirectory, filename);
        await image.toFile(filePath);

        return filePath;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('Failed to upload image');
    }
};

// Endpoint to upload profile picture
app.post('/upload/profile-picture', validateToken, upload.single('profilePicture'), async (req, res) => {
    try {
        const userDirectory = path.join(rootStorageDirectory, req.userId.toString());
        createDirectoryIfNotExists(userDirectory);

        const filePath = await handleFileUpload(req, res, userDirectory, { width: 300, height: 300 }, 1);

        // Update user's profile picture in database
        await prisma.user.update({
            where: { id: req.userId },
            data: { profilePicture: filePath },
        });

        res.status(200).json({ message: 'Profile picture updated', filePath });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        res.status(500).json({ error: 'Failed to upload profile picture' });
    }
});

// Endpoint to upload banner
app.post('/upload/banner', validateToken, upload.single('banner'), async (req, res) => {
    try {
        const userDirectory = path.join(rootStorageDirectory, req.userId.toString());
        createDirectoryIfNotExists(userDirectory);

        const filePath = await handleFileUpload(req, res, userDirectory, { width: 1496, height: 544 }, 2.75);

        // Update user's banner in database
        await prisma.user.update({
            where: { id: req.userId },
            data: { banner: filePath },
        });

        res.status(200).json({ message: 'Banner updated', filePath });
    } catch (error) {
        console.error('Error uploading banner:', error);
        res.status(500).json({ error: 'Failed to upload banner' });
    }
});


app.post('/signup', async (req, res) => {
    const { email, password, confirmPassword, name } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        // Attempt to create user in database
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
        res.status(201).json(user);
    } catch (error) {
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            // Handle duplicate email error
            res.status(400).json({ error: 'Email already exists' });
        } else if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
            // Handle duplicate name error
            res.status(400).json({ error: 'Name already exists' });
        } else {
            // Handle other errors
            console.error(error);
            res.status(500).json({ error: 'Signup failed' });
        }
    }
});

app.post('/login', async (req, res) => {
    const { name, password } = req.body;
    const user = await prisma.user.findUnique({ where: { name } });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '30d' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.get('/profile', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    res.json(user);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});