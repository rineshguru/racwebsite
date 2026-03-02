const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../db/database');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `doc_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage });

// Get all documents
router.get('/', (req, res) => {
    db.all("SELECT * FROM club_documents", [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error fetching documents.' });
        }
        res.json(rows);
    });
});

// Upload a new document
router.post('/', upload.single('file'), (req, res) => {
    const { id, title, type, size, url } = req.body;

    // Use the uploaded file URL if a file is provided; otherwise, allow custom URL.
    const finalUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : url;
    const finalSize = req.file ? `${(req.file.size / (1024 * 1024)).toFixed(2)} MB` : size;

    if (!id || !title || !type || !finalUrl) {
        return res.status(400).json({ error: 'Missing required fields for document creation.' });
    }

    const stmt = db.prepare(`INSERT INTO club_documents (id, title, type, size, url) VALUES (?, ?, ?, ?, ?)`);
    stmt.run([id, title, type, finalSize || 'Unknown', finalUrl], function (err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error saving document to database.' });
        }
        res.status(201).json({ success: true, message: 'Document added successfully', id });
    });
    stmt.finalize();
});

// Update a document
router.put('/:id', upload.single('file'), (req, res) => {
    const { title, type, size, url } = req.body;
    const id = req.params.id;

    // Let's first fetch the existing document to update its fields cautiously
    db.get("SELECT * FROM club_documents WHERE id = ?", [id], (err, row) => {
        if (err || !row) {
            return res.status(404).json({ error: 'Document not found' });
        }

        const finalTitle = title || row.title;
        const finalType = type || row.type;
        let finalUrl = url || row.url;
        let finalSize = size || row.size;

        if (req.file) {
            finalUrl = `http://localhost:5000/uploads/${req.file.filename}`;
            finalSize = `${(req.file.size / (1024 * 1024)).toFixed(2)} MB`;
        }

        db.run(
            `UPDATE club_documents SET title = ?, type = ?, size = ?, url = ? WHERE id = ?`,
            [finalTitle, finalType, finalSize, finalUrl, id],
            function (updateErr) {
                if (updateErr) {
                    return res.status(500).json({ error: 'Failed to update document' });
                }
                res.json({ success: true, message: 'Document updated successfully' });
            }
        );
    });
});

// Delete a document
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM club_documents WHERE id = ?", [id], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete document' });
        }
        res.json({ success: true, message: 'Document deleted successfully' });
    });
});

module.exports = router;
