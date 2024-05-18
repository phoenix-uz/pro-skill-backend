import { promises as fsPromises } from 'fs';
export default async function saveFile(file: Express.Multer.File) {
  const randomFileName = Math.random().toString(36).substring(7);
  const extension = file.originalname.split('.').pop();
  const filePath = `${process.env.UPLOADS_DIR}/${Date.now()}${randomFileName}.${extension}`;
  await fsPromises.writeFile(filePath, file.buffer);
  const path = filePath.replace('dist', '');
  return path;
}
