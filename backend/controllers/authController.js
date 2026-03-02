exports.login = (req, res) => {
    const { username, password } = req.body;
    if (
        (username === 'Admin' && password === 'racinfo') ||
        (username === 'President' && password === 'racinfo')
    ) {
        return res.status(200).json({ success: true, message: "Authentication successful." });
    } else {
        return res.status(401).json({ success: false, message: "Invalid credentials." });
    }
};
