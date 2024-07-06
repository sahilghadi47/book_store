import { diskStorage } from "multer";
import multer from "multer";

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const uploadFile = multer({ storage: storage });

export { uploadFile };
