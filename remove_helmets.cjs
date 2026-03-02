const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.jsx');
let code = fs.readFileSync(filePath, 'utf8');

// Replace all <Helmet>...</Helmet> blocks
code = code.replace(/<Helmet>[\s\S]*?<\/Helmet>/g, (match) => {
    if (match.includes('{seo.title}')) {
        // Keep the main dynamic Helmet block
        return match;
    }
    // Remove hardcoded static Helmet blocks injected into views
    return '';
});

fs.writeFileSync(filePath, code);
console.log('Removed duplicate static Helmet tags.');
