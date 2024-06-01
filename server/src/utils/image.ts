import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';

/**
 * Uploads an image to Cloudinary.
 *
 * This function configures the Cloudinary API using environment variables,
 * generates a unique identifier for the image, and uploads the image to Cloudinary.
 *
 * @export
 * @param image - The image file to be uploaded. This can be a path to a file, a data URI, a Buffer, etc.
 * @return The result of the upload operation, containing information such as the URL of the uploaded image.
 */
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
    }).catch((error) => {
        console.log(error)
    });

    return uploadResult
}