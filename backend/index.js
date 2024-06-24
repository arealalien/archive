const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Import routes
const profileRoutes = require('./routes/profile');

// Use routes
app.use(profileRoutes);

const storage = multer.diskStorage({
    limits: { fileSize: 5 * 1024 * 1024 },
    destination: (req, file, cb) => {
        // Set the directory where files will be saved
        const userId = req.userId;
        const uploadDir = path.join(__dirname, '..', 'public', 'users', userId.toString());

        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const fileType = req.route.path.includes('profile-picture') ? 'profilePicture' : 'banner';
        const fileExtension = path.extname(file.originalname);
        cb(null, `${fileType}${fileExtension}`);
    }
});

const upload = multer({ storage });

// Middleware for token validation
const validateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("Token received: ", token); // Debugging line
    if (token) {
        try {
            const decoded = jwt.verify(token, 'your_jwt_secret');
            req.userId = decoded.userId;
            next();
        } catch (err) {
            console.error('Token verification failed:', err); // Log the error
            res.status(401).json({ error: 'Invalid token' });
            return;
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
};

const handleFileUpload = async (req, res) => {
    try {
        const { file } = req;
        if (!file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }

        const fileType = req.route.path.includes('profile-picture') ? 'profilePicture' : 'banner';
        const filePath = path.join('users', req.userId.toString(), file.filename);

        console.log('Attempting to update user in database with:', {
            userId: req.userId,
            fileType,
            filePath
        });

        // Store file path in the database using Prisma
        const updatedUser = await prisma.user.update({
            where: { id: req.userId },
            data: {
                [fileType]: filePath, // Dynamic field based on 'profilePicture' or 'banner'
            },
        });

        console.log('Database update successful:', updatedUser);

        res.status(200).json({ filePath: filePath });
    } catch (error) {
        console.error('Error processing file:', error); // Detailed error logging
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

app.post('/upload/profile-picture', validateToken, upload.single('profilePicture'), handleFileUpload);
app.post('/upload/banner', validateToken, upload.single('banner'), handleFileUpload);

app.post('/signup', async (req, res) => {
    const { email, password, confirmPassword, name } = req.body;

    if (password !== confirmPassword) {
        res.status(400).json({ error: 'Passwords do not match' });
        return;
    }

    try {
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
            res.status(400).json({ error: 'Email already exists' });
        } else if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
            res.status(400).json({ error: 'Name already exists' });
        } else {
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

app.get('/profile', validateToken, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.userId } });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});