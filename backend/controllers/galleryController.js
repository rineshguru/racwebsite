const db = require('../db/database');
const path = require('path');
const fs = require('fs');

// Fetch all gallery folders
exports.getAllFolders = (req, res) => {
    db.all("SELECT * FROM gallery_folders ORDER BY date DESC", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Parse the images string back into an array for the frontend
        const parsedRows = rows.map(row => ({
            ...row,
            images: row.images ? JSON.parse(row.images) : []
        }));
        res.json(parsedRows);
    });
};

// Create a new folder
exports.createFolder = (req, res) => {
    const { id, title, date } = req.body;
    const cover = req.file ? `${process.env.VITE_API_URL || 'http://localhost:5000'}/uploads/${req.file.filename}` : '';
    const images = JSON.stringify([]);

    db.run(
        `INSERT INTO gallery_folders (id, title, date, cover, images) VALUES (?, ?, ?, ?, ?)`,
        [id, title, date, cover, images],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({
                message: 'Folder created successfully',
                folder: { id, title, date, cover, images: [] }
            });
        }
    );
};

// Delete a folder
exports.deleteFolder = (req, res) => {
    const { id } = req.params;

    db.get("SELECT cover, images FROM gallery_folders WHERE id = ?", [id], (err, row) => {
        if (err || !row) {
            return res.status(500).json({ error: 'Folder not found' });
        }

        // Optional: you could delete the associated files from /uploads, 
        // but skipping file deletion to match the standard simple approach if you prefer

        db.run("DELETE FROM gallery_folders WHERE id = ?", [id], function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Folder deleted successfully' });
        });
    });
};

// Upload an image to a folder
exports.uploadImageToFolder = (req, res) => {
    const { id } = req.params;

    if (!req.file) {
        return res.status(400).json({ error: 'No image provided' });
    }

    const imageUrl = `${process.env.VITE_API_URL || 'http://localhost:5000'}/uploads/${req.file.filename}`;

    db.get("SELECT images FROM gallery_folders WHERE id = ?", [id], (err, row) => {
        if (err || !row) {
            return res.status(404).json({ error: 'Folder not found' });
        }

        let images = row.images ? JSON.parse(row.images) : [];
        images.push(imageUrl);

        db.run(
            "UPDATE gallery_folders SET images = ? WHERE id = ?",
            [JSON.stringify(images), id],
            function (err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'Image added successfully', imageUrl });
            }
        );
    });
};

// Delete an image from a folder
exports.removeImageFromFolder = (req, res) => {
    const { id } = req.params;
    const { imageUrl } = req.body;

    if (!imageUrl) {
        return res.status(400).json({ error: 'No image URL provided' });
    }

    db.get("SELECT images FROM gallery_folders WHERE id = ?", [id], (err, row) => {
        if (err || !row) {
            return res.status(404).json({ error: 'Folder not found' });
        }

        let images = row.images ? JSON.parse(row.images) : [];
        images = images.filter(img => img !== imageUrl);

        db.run(
            "UPDATE gallery_folders SET images = ? WHERE id = ?",
            [JSON.stringify(images), id],
            function (err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'Image removed successfully', images });
            }
        );
    });
};
