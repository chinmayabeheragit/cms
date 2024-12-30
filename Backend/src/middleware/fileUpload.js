require('dotenv').config(); // Load environment variables from .env file

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,

        // acl: 'public-read', // Allow public read access to uploaded files

        key: (req, file, cb) => {
            const filename = `${Date.now()}_${file.originalname}`;
            cb(null, filename);
        },
    }),
    
});

module.exports = upload;
