import multer from 'multer';
import { nanoid } from 'nanoid';
import path from 'path';

const uploadImage = multer({
  storage: multer.diskStorage({
    destination: 'public/images',
    filename: (req, file, callback) => {
      const fileName = nanoid();
      const fileNameWithExtension = `${fileName}${path.extname(file.originalname)}`;

      callback(null, fileNameWithExtension);
    },
  }),
  fileFilter: (_, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      callback(null, true);
    } else {
      callback(new Error('invalid file type'));
    }
  },
});

export default uploadImage;
