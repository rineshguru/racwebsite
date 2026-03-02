const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

// Apply lazy loading to images
code = code.replace(/<img(.*?)>/g, (match, p1) => {
    if (p1.includes('loading=')) return match;
    return `<img loading="lazy"${p1}>`;
});

fs.writeFileSync('src/App.jsx', code);
console.log('Lazy loading applied to App.jsx images.');
