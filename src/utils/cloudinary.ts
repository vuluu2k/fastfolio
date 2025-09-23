import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
}

export interface CloudinaryTransformation {
  width?: number;
  height?: number;
  crop?: string;
  quality?: string | number;
  format?: string;
  gravity?: string;
  radius?: string | number;
  effect?: string;
  [key: string]: unknown;
}

export interface UploadOptions {
  folder?: string;
  public_id?: string;
  transformation?: CloudinaryTransformation;
  tags?: string[];
  overwrite?: boolean;
  quality?: string | number;
  format?: string;
}

/**
 * Upload image to Cloudinary from buffer
 */
export const uploadImageFromBuffer = async (
  buffer: Buffer,
  options: UploadOptions = {}
): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      resource_type: "image" as const,
      folder: options.folder || "uploads",
      public_id: options.public_id,
      transformation: options.transformation,
      tags: options.tags,
      overwrite: options.overwrite ?? false,
      quality: options.quality || "auto",
      format: options.format,
    };

    cloudinary.uploader
      .upload_stream(uploadOptions, (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve({
            public_id: result.public_id,
            secure_url: result.secure_url,
            width: result.width,
            height: result.height,
            format: result.format,
            resource_type: result.resource_type,
            created_at: result.created_at,
            bytes: result.bytes,
          });
        } else {
          reject(new Error("Upload failed: No result returned"));
        }
      })
      .end(buffer);
  });
};

/**
 * Upload image to Cloudinary from base64 string
 */
export const uploadImageFromBase64 = async (
  base64String: string,
  options: UploadOptions = {}
): Promise<UploadResult> => {
  const uploadOptions = {
    resource_type: "image" as const,
    folder: options.folder || "uploads",
    public_id: options.public_id,
    transformation: options.transformation,
    tags: options.tags,
    overwrite: options.overwrite ?? false,
    quality: options.quality || "auto",
    format: options.format,
  };

  try {
    const result = await cloudinary.uploader.upload(
      base64String,
      uploadOptions
    );

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      resource_type: result.resource_type,
      created_at: result.created_at,
      bytes: result.bytes,
    };
  } catch (error) {
    throw new Error(`Failed to upload image: ${error}`);
  }
};

/**
 * Upload image to Cloudinary from URL
 */
export const uploadImageFromUrl = async (
  imageUrl: string,
  options: UploadOptions = {}
): Promise<UploadResult> => {
  const uploadOptions = {
    resource_type: "image" as const,
    folder: options.folder || "uploads",
    public_id: options.public_id,
    transformation: options.transformation,
    tags: options.tags,
    overwrite: options.overwrite ?? false,
    quality: options.quality || "auto",
    format: options.format,
  };

  try {
    const result = await cloudinary.uploader.upload(imageUrl, uploadOptions);

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      resource_type: result.resource_type,
      created_at: result.created_at,
      bytes: result.bytes,
    };
  } catch (error) {
    throw new Error(`Failed to upload image from URL: ${error}`);
  }
};

/**
 * Delete image from Cloudinary
 */
export const deleteImage = async (
  publicId: string
): Promise<{ result: string }> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Failed to delete image: ${error}`);
  }
};

/**
 * Generate optimized image URL with transformations
 */
export const generateImageUrl = (
  publicId: string,
  transformations?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
    format?: string;
    gravity?: string;
    radius?: string | number;
    effect?: string;
  }
): string => {
  if (!transformations) {
    return cloudinary.url(publicId, { secure: true });
  }

  return cloudinary.url(publicId, {
    secure: true,
    transformation: [
      {
        width: transformations.width,
        height: transformations.height,
        crop: transformations.crop || "fill",
        quality: transformations.quality || "auto",
        format: transformations.format,
        gravity: transformations.gravity,
        radius: transformations.radius,
        effect: transformations.effect,
      },
    ],
  });
};

export default cloudinary;
