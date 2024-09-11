const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const { exec } = require('child_process');
const ffmpeg = require('ffmpeg');
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

        const playlistUrl = uuidv4();
        const likedVideosPlaylist = await prisma.playlist.create({
            data: {
                name: 'Liked Videos',
                playlistUrl: playlistUrl,
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

const ffmpegPath = 'E:\\ffmpeg\\bin\\ffmpeg.exe';
const ffprobePath = 'E:\\ffmpeg\\bin\\ffprobe.exe';

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
        const spriteFolder = path.join(videoFolder, 'sprites');

        // Ensure the video folder exists
        if (!fs.existsSync(videoFolder)) {
            fs.mkdirSync(videoFolder, { recursive: true });
        }

        if (!fs.existsSync(spriteFolder)) {
            fs.mkdirSync(spriteFolder, { recursive: true });
        }

        // Move video to the final destination
        const videoPath = path.join(videoFolder, videoUrl);
        fs.renameSync(videoFile.path, path.join(videoFolder, videoUrl));

        // Generate sprite images and JSON file using ffmpeg
        const spriteFilePath = path.join(spriteFolder, 'sprite.jpg');
        const jsonFilePath = path.join(spriteFolder, 'sprite.json');
        const intervalFilePath = path.join(spriteFolder, 'interval.json');

        // Dynamically calculate the number of frames, columns, and rows for the sprite
        let frameInterval = 1;
        const totalIFrames = Math.floor(duration / frameInterval);

        if (totalIFrames >= 5500) {
            frameInterval = 12;
        } else if (totalIFrames >= 5000) {
            frameInterval = 11;
        } else if (totalIFrames >= 4500) {
            frameInterval = 10;
        } else if (totalIFrames >= 4000) {
            frameInterval = 9;
        } else if (totalIFrames >= 3500) {
            frameInterval = 8;
        } else if (totalIFrames >= 3000) {
            frameInterval = 7;
        } else if (totalIFrames >= 2500) {
            frameInterval = 6;
        } else if (totalIFrames >= 2000) {
            frameInterval = 5;
        } else if (totalIFrames >= 1500) {
            frameInterval = 4;
        } else if (totalIFrames >= 1000) {
            frameInterval = 3;
        } else if (totalIFrames >= 500) {
            frameInterval = 2;
        } else if (totalIFrames >= 100) {
            frameInterval = 1;
        }

        const totalFrames = Math.floor(parseFloat(duration) / frameInterval);
        const columns = Math.ceil(Math.sqrt(totalFrames)); // Calculate columns for the grid
        const rows = Math.ceil(totalFrames / columns); // Calculate rows for the grid

        // Get video aspect ratio
        const aspectRatioFilePath = path.join(spriteFolder, 'aspect_ratio.json');
        exec(`${ffprobePath} -v error -select_streams v:0 -show_entries stream=width,height -of json ${videoPath}`, (err, stdout) => {
            if (err) {
                console.error('Error calculating aspect ratio:', err);
                res.status(500).json({ error: 'Failed to calculate aspect ratio' });
                return;
            }

            const data = JSON.parse(stdout);
            const width = data.streams[0].width;
            const height = data.streams[0].height;
            const aspectRatio = width / height;
            fs.writeFileSync(aspectRatioFilePath, JSON.stringify({ aspectRatio }));

            // Proceed to generate sprite images and JSON file using ffmpeg
            let frameInterval = 1;
            const totalIFrames = Math.floor(duration / frameInterval);

            if (totalIFrames >= 8000) {
                frameInterval = 20;
            } else if (totalIFrames >= 7600) {
                frameInterval = 19;
            } else if (totalIFrames >= 7200) {
                frameInterval = 18;
            } else if (totalIFrames >= 6800) {
                frameInterval = 17;
            } else if (totalIFrames >= 6400) {
                frameInterval = 16;
            } else if (totalIFrames >= 6000) {
                frameInterval = 15;
            } else if (totalIFrames >= 5600) {
                frameInterval = 14;
            } else if (totalIFrames >= 5200) {
                frameInterval = 13;
            } else if (totalIFrames >= 4800) {
                frameInterval = 12;
            } else if (totalIFrames >= 4400) {
                frameInterval = 11;
            } else if (totalIFrames >= 3600) {
                frameInterval = 10;
            } else if (totalIFrames >= 3200) {
                frameInterval = 9;
            } else if (totalIFrames >= 2800) {
                frameInterval = 8;
            } else if (totalIFrames >= 2400) {
                frameInterval = 7;
            } else if (totalIFrames >= 2000) {
                frameInterval = 6;
            } else if (totalIFrames >= 1600) {
                frameInterval = 5;
            } else if (totalIFrames >= 1200) {
                frameInterval = 4;
            } else if (totalIFrames >= 800) {
                frameInterval = 3;
            } else if (totalIFrames >= 400) {
                frameInterval = 2;
            } else if (totalIFrames >= 100) {
                frameInterval = 1;
            }

            const totalFrames = Math.floor(parseFloat(duration) / frameInterval);
            const columns = Math.ceil(Math.sqrt(totalFrames)); // Calculate columns for the grid
            const rows = Math.ceil(totalFrames / columns); // Calculate rows for the grid

            // Generate sprite images using the video
            exec(`${ffmpegPath} -i ${videoPath} -vf "fps=1/${frameInterval},scale=160:-1,tile=${columns}x${rows}" ${spriteFilePath}`, async (err) => {
                if (err) {
                    console.error('Error generating sprite:', err);
                    res.status(500).json({ error: 'Failed to generate sprite' });
                    return;
                }

                // Create a JSON map with frame positions
                const json = {};
                for (let i = 0; i < totalFrames; i++) {
                    json[i * frameInterval] = {
                        x: (i % columns) * 160,
                        y: Math.floor(i / columns) * 90,
                        w: 160,
                        h: 90
                    };
                }
                fs.writeFileSync(jsonFilePath, JSON.stringify(json));
                fs.writeFileSync(intervalFilePath, JSON.stringify({ frameInterval }));

                // Save video metadata to the database
                try {
                    await prisma.video.create({
                        data: {
                            creatorId: userId,
                            videoUrl,
                            title,
                            description,
                            datePosted: new Date(),
                            duration: parseFloat(duration),
                        },
                    });

                    // Send response after everything is done
                    res.json({ message: 'Video uploaded successfully!', videoId, videoUrl });
                } catch (error) {
                    console.error('Error saving video metadata:', error);
                    res.status(500).json({ error: 'Failed to save video metadata' });
                }
            });
        });

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

        // Construct the path for the video folder
        const videoFolder = path.join(__dirname, '..', 'public', 'users', userId.toString(), 'videos', videoId);

        // Log the path for debugging
        console.log('Video folder path:', videoFolder);

        // Check if the video folder exists, and create it if it doesn't
        if (!fs.existsSync(videoFolder)) {
            fs.mkdirSync(videoFolder, { recursive: true });
        }

        const originalFilePath = path.resolve(__dirname, '../', 'temp', 'thumbnail.jpg');
        const jpegFilePath = path.join(videoFolder, 'thumbnail.jpg');

        // Convert to JPEG using sharp
        await sharp(originalFilePath)
            .jpeg()
            .toFile(jpegFilePath);

        // Asynchronously remove the original thumbnail file from temp storage
        console.log('Attempting to remove file:', originalFilePath);
        fs.unlink(originalFilePath, (err) => {
            if (err) {
                console.error('Error removing file:', err);
            } else {
                console.log('File removed successfully');
            }
        });

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