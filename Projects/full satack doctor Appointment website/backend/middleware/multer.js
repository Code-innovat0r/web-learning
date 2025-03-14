import multer from 'multer';


const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, callback) {
        return callback(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

export default upload;