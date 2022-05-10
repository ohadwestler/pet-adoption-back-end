import multer from"multer";
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const imagePath = path.resolve(__dirname,'../images')
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, imagePath)
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            console.log(file)
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
        }
    })
    const upload = multer({ storage: storage })
   export default upload