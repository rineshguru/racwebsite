const db = require('../db/database');

exports.getAllProjects = (req, res) => {
    db.all("SELECT * FROM projects", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }

        // Structure the data according to the frontend's original catalog state
        const catalog = {
            ongoing: [],
            upcoming: [],
            completed: [],
            flagship: []
        };

        rows.forEach(row => {
            const project = {
                id: row.id,
                title: row.title,
                date: row.date,
                shortDesc: row.shortDesc,
                fullDesc: row.fullDesc,
                image: row.image,
                actionImages: row.actionImages ? JSON.parse(row.actionImages) : []
            };
            if (catalog[row.category]) {
                catalog[row.category].push(project);
            }
        });

        res.json(catalog);
    });
};

exports.addProject = (req, res) => {
    const { title, date, shortDesc, fullDesc, category } = req.body;
    const id = `proj-${Date.now()}`;

    let mainImageUrl = req.files['mainImage'] ? `http://localhost:5000/uploads/${req.files['mainImage'][0].filename}` : "src/assets/Flame 1.jpg";

    let actionImagesUrls = [];
    if (req.files['actionImages']) {
        actionImagesUrls = req.files['actionImages'].map(file => `http://localhost:5000/uploads/${file.filename}`);
    }

    db.run(
        `INSERT INTO projects (id, title, date, shortDesc, fullDesc, category, image, actionImages) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, title, date, shortDesc, fullDesc, category, mainImageUrl, JSON.stringify(actionImagesUrls)],
        function (err) {
            if (err) {
                return res.status(500).json({ success: false, error: err.message });
            }
            res.status(201).json({
                success: true,
                project: {
                    id, title, date, shortDesc, fullDesc, category, image: mainImageUrl, actionImages: actionImagesUrls
                }
            });
        }
    );
};

exports.deleteProject = (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM projects WHERE id = ?`, id, function (err) {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, deletedID: id });
    });
};
