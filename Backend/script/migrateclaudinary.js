import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import dns from 'dns';
import dotenv from 'dotenv';
dotenv.config();

// Same DNS fix used in lib/db.js
dns.setServers(['1.1.1.1', '8.8.8.8']);

cloudinary.config({
    cloud_name: process.env.CLOUNDINARY_CLOUD_NAME,
    api_key: process.env.CLOUNDINARY_API_KEY,
    api_secret: process.env.CLOUNDINARY_API_SECRET,
});

async function migrateAllProducts() {
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'redisEcom' });
    const collection = mongoose.connection.db.collection('products');
    const products = await collection.find({}).toArray();

    let migrated = 0;
    let skipped = 0;
    let failed = 0;

    for (const product of products) {
        const { _id, name, image } = product;

        // Skip if already a Cloudinary URL
        if (image && image.includes('cloudinary.com')) {

            skipped++;
            continue;
        }

        if (!image) {

            failed++;
            continue;
        }

        try {
            const result = await cloudinary.uploader.upload(image, {
                folder: 'redisEcom',
                public_id: _id.toString(),
            });
            await collection.updateOne(
                { _id },
                { $set: { image: result.secure_url } }
            );
            migrated++;
        } catch (err) {
            failed++;
        }
    }

    await mongoose.disconnect();

}

migrateAllProducts().catch(console.error);