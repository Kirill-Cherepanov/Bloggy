import path from 'path';
import fs from 'fs';

export const savePostImage = (
  files?:
    | {
        [fieldname: string]: Express.Multer.File[];
      }
    | Express.Multer.File[]
) => {
  if (!files || !('post-image' in files)) return undefined;

  const file = files['post-image'][0];

  const fileName =
    path.parse(file.originalname).name +
    `.${Date.now()}` +
    path.extname(file.originalname);

  const filePath = path.join(__dirname, `/images/postImgs/'${fileName}`);

  fs.writeFile(filePath, file.buffer, (err) => {
    if (!err) return;
    console.error(err);
    throw Error('Server error');
  });

  return fileName;
};
