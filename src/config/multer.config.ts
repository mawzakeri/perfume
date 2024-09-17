import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
    storage: diskStorage({
        destination: './uploads', // Directory to save the files
        filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const fileExtension = extname(file.originalname);
            callback(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
        },
    }),
};