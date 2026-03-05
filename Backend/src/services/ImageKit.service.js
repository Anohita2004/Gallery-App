const dotenv = require('dotenv');
dotenv.config();
const multer = require('multer');
const ImageKit = require('@imagekit/nodejs');
const fetch = require('node-fetch');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadImage(fileBuffer, fileName) {
    try {
        // Create FormData for multipart upload
        const FormData = require('form-data');
        const form = new FormData();
        
        form.append('file', fileBuffer, {
            filename: fileName
        });
        form.append('fileName', fileName);
        form.append('useUniqueFileName', 'true');
        
        // Encode credentials for Basic Auth
        const credentials = Buffer.from(
            process.env.IMAGEKIT_PRIVATE_KEY + ':'
        ).toString('base64');
        
        const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + credentials,
                ...form.getHeaders()
            },
            body: form
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Upload failed');
        }
        
        console.log('ImageKit upload success:', result);
        return result.url;
    } catch (error) {
        console.error('ImageKit upload error:', error);
        throw new Error('Failed to upload image: ' + error.message);
    }
}

module.exports = { uploadImage };

