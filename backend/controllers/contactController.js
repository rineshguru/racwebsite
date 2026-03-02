const db = require('../db/database');

exports.submitContact = (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "Please provide all fields." });
    }

    db.run(
        `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`,
        [name, email, message],
        function (err) {
            if (err) {
                return res.status(500).json({ success: false, error: err.message });
            }
            res.status(201).json({ success: true, message: "Message dispatched successfully." });
        }
    );
};
