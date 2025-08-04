const { Readability } = require('@mozilla/readability');
const { JSDOM } = require('jsdom');

// コマンドライン引数からURLを取得
const url = process.argv[2];

if (!url) {
    console.error('Usage: node index.js <URL>');
    console.error('Example: node index.js https://example.com/article');
    process.exit(1);
}

console.log('Fetching:', url);

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(html => {
        const doc = new JSDOM(html, {
            url: url
        });
        
        const reader = new Readability(doc.window.document);
        const article = reader.parse();
        
        if (article) {
            console.log('\n=== Article Info ===');
            console.log('Title:', article.title);
            console.log('Author:', article.byline || 'N/A');
            console.log('Length:', article.length, 'chars');
            console.log('Excerpt:', article.excerpt);
            console.log('\n=== Content ===');
            console.log(article.textContent);
        } else {
            console.log('Failed to parse the article');
        }
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
