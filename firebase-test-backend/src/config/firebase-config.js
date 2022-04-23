import admin from 'firebase-admin';
import * as cloudinary from 'cloudinary';

export const setUp = admin.initializeApp({
	credential: admin.credential.cert(JSON.parse(process.env.serviceAccountKey))
});

export const cloud = cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true
});

export const connectionString = process.env.DATABASE_URL;

// const env = process.env.NODE.ENV;
