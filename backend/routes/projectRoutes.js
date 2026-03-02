const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const projectController = require('../controllers/projectController');

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.get('/', projectController.getAllProjects);

// Fields: mainImage (max 1), actionImages (max 3)
router.post('/', upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'actionImages', maxCount: 3 }
]), projectController.addProject);

router.delete('/:id', projectController.deleteProject);

module.exports = router;
