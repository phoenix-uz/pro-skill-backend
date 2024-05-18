import { promises as fsPromises } from 'fs';
import path from 'path';

export default async function saveFile(file: Express.Multer.File) {
  const uploadsDir = process.env.UPLOADS_DIR || 'dist/uploads'; // Default to 'dist/uploads' if not set
  const randomFileName = Math.random().toString(36).substring(7);
  const extension = file.originalname.split('.').pop();
  const filePath = path.join(
    uploadsDir,
    `${Date.now()}${randomFileName}.${extension}`,
  );

  try {
    // Ensure the uploads directory exists
    await fsPromises.mkdir(uploadsDir, { recursive: true });

    // Write the file
    await fsPromises.writeFile(filePath, file.buffer);

    return filePath;
  } catch (error) {
    console.error('Error saving file:', error);
    throw error; // Re-throw the error after logging it
  }
}
