const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const profileRoutes = require('./routes/profile');
const subscribeRoutes = require('./routes/subscribe');
const videoRoutes = require('./routes/video');
const SearchRoutes = require('./routes/search');
const CreatorsRoutes = require('./routes/creators');
const PlaylistsRoutes = require('./routes/playlist');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Adjust the origin as needed
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.userId;
        const uploadDir = path.join(__dirname, '..', 'public', 'users', userId.toString());

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const fileType = req.route.path.includes('profile-picture') ? 'profilePicture' : 'banner';
        cb(null, `${fileType}-original-${Date.now()}.jpg`);
    }
});

const upload = multer({ storage });

const tempStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const tempFolder = path.join(__dirname, '..', 'temp');
        if (!fs.existsSync(tempFolder)) {
            fs.mkdirSync(tempFolder, { recursive: true });
        }
        cb(null, tempFolder);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const tempUpload = multer({ storage: tempStorage });

app.post('/signup', async (req, res) => {
    const { email, password, confirmPassword, name, displayName } = req.body;
    console.log(req.body);

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
                displayName,
            },
        });
        console.log('Created user:', user);

        const likedVideosPlaylist = await prisma.playlist.create({
            data: {
                name: 'Liked Videos',
                creator: {
                    connect: { id: user.id },
                },
            },
        });
        console.log('Created "Liked Videos" playlist:', likedVideosPlaylist);

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

app.use(validateToken, profileRoutes);
app.use(validateToken, subscribeRoutes);
app.use(validateToken, videoRoutes);

const unlinkFile = (filePath, attempts = 5, delay = 100) => {
    setTimeout(() => {
        fs.unlink(filePath, (err) => {
            if (err) {
                if (attempts > 0 && err.code === 'EPERM') {
                    console.warn(`Retrying file deletion: ${filePath}, attempts left: ${attempts - 1}`);
                    unlinkFile(filePath, attempts - 1, delay * 2); // Retry with exponential backoff
                } else {
                    console.error('Error removing original file:', err);
                }
            } else {
                console.log('Successfully removed original file:', filePath);
            }
        });
    }, delay);
};

const handleFileUpload = async (req, res) => {
    try {
        const { file } = req;
        if (!file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }

        const fileType = req.route.path.includes('profile-picture') ? 'profilePicture' : 'banner';
        const userDir = path.join(__dirname, '..', 'public', 'users', req.userId.toString());
        const originalFilePath = file.path;
        const jpegFilePath = path.join(userDir, `${fileType}.jpg`);

        console.log('Original file path:', originalFilePath); // Debugging line
        console.log('JPEG file path:', jpegFilePath); // Debugging line

        // Convert to JPEG using sharp
        await sharp(originalFilePath)
            .jpeg()
            .toFile(jpegFilePath);

        // Ensure the file is no longer being used before unlinking
        unlinkFile(originalFilePath);

        console.log('Attempting to update user in database with:', {
            userId: req.userId,
            fileType,
            filePath: path.join('users', req.userId.toString(), `${fileType}.jpg`)
        });

        // Store file path in the database using Prisma
        const updatedUser = await prisma.user.update({
            where: { id: req.userId },
            data: {
                [fileType]: path.join('users', req.userId.toString(), `${fileType}.jpg`),
            },
        });

        console.log('Database update successful:', updatedUser);

        res.status(200).json({ filePath: path.join('users', req.userId.toString(), `${fileType}.jpg`) });
    } catch (error) {
        console.error('Error processing file:', error); // Detailed error logging
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

app.post('/upload/profile-picture', validateToken, upload.single('profilePicture'), handleFileUpload);
app.post('/upload/banner', validateToken, upload.single('banner'), handleFileUpload);

app.post('/upload/video', validateToken, tempUpload.single('video'), async (req, res) => {
    const { title, description, duration } = req.body;
    const videoFile = req.file;
    const videoId = uuidv4(); // Generate a unique video ID
    const userId = req.userId;

    try {
        if (!videoFile) {
            throw new Error('No video file uploaded');
        }

        const videoUrl = videoId + path.extname(videoFile.originalname);
        const videoFolder = path.join(__dirname, '..', 'public', 'users', userId.toString(), 'videos', videoId);

        // Ensure the video folder exists
        if (!fs.existsSync(videoFolder)) {
            fs.mkdirSync(videoFolder, { recursive: true });
        }

        // Move video to the final destination
        fs.renameSync(videoFile.path, path.join(videoFolder, videoUrl));

        // Save video metadata to the database
        const video = await prisma.video.create({
            data: {
                creatorId: userId,
                videoUrl,
                title,
                description,
                datePosted: new Date(),
                duration: parseFloat(duration),
            },
        });

        // Send videoId to use for thumbnail upload
        res.json({ message: 'Video uploaded successfully!', videoId, videoUrl });
    } catch (error) {
        console.error('Error saving video metadata:', error);
        res.status(500).json({ error: 'Failed to save video metadata', details: error.message });
    }
});

app.post('/upload/thumbnail', validateToken, tempUpload.single('thumbnail'), async (req, res) => {
    const thumbnailFile = req.file;
    const { videoId } = req.body; // Get videoId from request body
    const userId = req.userId;

    try {
        if (!thumbnailFile) {
            throw new Error('No thumbnail file uploaded');
        }

        const videoFolder = path.join(__dirname, '..', 'public', 'users', userId.toString(), 'videos', videoId);
        if (!fs.existsSync(videoFolder)) {
            throw new Error('Video folder does not exist');
        }

        const originalFilePath = thumbnailFile.path;
        const jpegFilePath = path.join(videoFolder, 'thumbnail.jpg');

        // Convert to JPEG using sharp
        await sharp(originalFilePath)
            .jpeg()
            .toFile(jpegFilePath);

        // Remove the original thumbnail file
        const filePath = path.resolve(__dirname, '../', 'temp', 'thumbnail.jpg');

        try {
            fs.accessSync(filePath, fs.constants.F_OK);
            fs.unlinkSync(filePath);
            console.log('File removed successfully');
        } catch (err) {
            console.error('Error:', err);
        }

        res.status(200).json({ message: 'Thumbnail uploaded successfully!', filePath: jpegFilePath });
    } catch (error) {
        console.error('Error processing thumbnail:', error);
        res.status(500).json({ error: 'Failed to process thumbnail', details: error.message });
    }
});

app.get('/videos', async (req, res) => {
    try {
        const videos = await prisma.video.findMany({
            select: {
                id: true,
                creatorId: true,
                title: true,
                description: true,
                videoUrl: true,
                datePosted: true,
                creator: {
                    select: {
                        name: true,
                        profilePicture: true,
                    },
                },
            },
        });
        res.json(videos);
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).json({ error: 'Failed to fetch videos' });
    }
});

app.use(validateToken, SearchRoutes);
app.use('/creators', CreatorsRoutes);
app.use(validateToken, PlaylistsRoutes);

app.get('/profile', validateToken, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.userId } });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});