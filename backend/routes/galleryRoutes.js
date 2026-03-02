const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.get('/', galleryController.getAllFolders);
router.post('/', upload.single('cover'), galleryController.createFolder);
router.delete('/:id', galleryController.deleteFolder);
router.put('/:id/images', upload.single('image'), galleryController.uploadImageToFolder);
router.delete('/:id/images', galleryController.removeImageFromFolder);

module.exports = router;
