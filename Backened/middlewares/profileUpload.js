const multer = require("multer");
const path = require("path");

const diskStorageOptions = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"))
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}-${Math.round(Math.random() * 1E6)}`;
        const ext = path.extname(file.originalname);
        cb(null, filename + ext)
    }
});

const fileFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: diskStorageOptions,
    limits: { fileSize: 1024 * 1024, files: 1 },
    fileFilter: fileFilter
});

module.exports = upload;