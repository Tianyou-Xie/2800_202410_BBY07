import {v2 as cloudinary} from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';

export async function imageUpload(image: any) {
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_CLOUD_KEY, 
        api_secret: process.env.CLOUDINARY_CLOUD_SECRET
    });

    let image_uuid = uuidv4();
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(image, {
        public_id: image_uuid 
    }).catch((error)=>{
        console.log(error)
    });
    
	return uploadResult
}