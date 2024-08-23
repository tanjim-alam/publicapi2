import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    const allowedExtensions = [".jpg", ".png", "jpeg", ".webp", ".mp4"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
        cb(new Error(`Unsupported file: ${ext}`), false);
    }
    else {
        cb(null, true)
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: fileFilter,
});

export default upload;