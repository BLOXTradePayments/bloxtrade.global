const fs = require('fs');
const path = require('path');
function addCacheBuster(r) {
    for (const t of fs.readdirSync(r)) {
        if ('node_modules' === t || '.git' === t) continue;
        const e = path.join(r, t);
        if (fs.statSync(e).isDirectory()) {
            addCacheBuster(e);
        } else if (t.endsWith('.html')) {
            try {
                let content = fs.readFileSync(e, 'utf8');
                if (content.includes('src="./scripts/i18n.js"')) {
                    content = content.replace(/src="\.\/scripts\/i18n\.js"/g, 'src="./scripts/i18n.js?v=2"');
                    fs.writeFileSync(e, content, 'utf8');
                    console.log('Updated ' + e);
                }
            } catch (err) {
                console.error('Error in ' + e, err);
            }
        }
    }
}
addCacheBuster('d:/BLOXTRADE - SITE/SITE BLOXTRADE');
