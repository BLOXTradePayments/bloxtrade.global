import glob
import re
import json

# 1. Update HTML files
files = glob.glob(r'd:\BLOXTRADE - SITE\SITE BLOXTRADE\*.html')

new_grid = '''      <div class="footer-grid">
        <!-- Coluna 1 -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <a href="index.html#company" class="footer-col-title" style="display:block; text-decoration:none; margin-bottom: 0;" data-i18n="footer_col1_title">Company</a>
          <a href="index.html#solutions" class="footer-col-title" style="display:block; text-decoration:none; margin-bottom: 0;" data-i18n="footer_col2_title">Solutions</a>
          <a href="news.html" class="footer-col-title" style="display:block; text-decoration:none; margin-bottom: 0;" data-i18n="footer_col3_title">Content</a>
          <div class="footer-links">
            <a href="news.html" data-i18n="footer_col3_1">News</a>
          </div>
        </div>

        <!-- Coluna 2 -->
        <div>
          <div class="footer-links" style="padding-top: 0.2rem; display: flex; flex-direction: column; gap: 1.5rem;">
            <a href="index.html#company" data-i18n="footer_col1_1">About</a>
            <a href="careers.html" data-i18n="footer_col1_2">Careers</a>
            <a href="contact.html" data-i18n="footer_col1_3">Contact</a>
            <a href="compliance.html" data-i18n="footer_col4_3">Compliance</a>
          </div>
        </div>
      </div>'''

count = 0
for f in files:
    with open(f, 'r', encoding='utf-8', errors='ignore') as file:
        content = file.read()

    if 'class="footer-grid"' in content:
        # We need to replace the footer-grid div
        # Regex to find <div class="footer-grid">...</div> at the end of the footer
        # Since we know exactly what we put there in the last script, we can match it
        new_content = re.sub(
            r'      <div class="footer-grid">.*?</div>\n    </div>\n  </footer>',
            new_grid + '\n    </div>\n  </footer>',
            content,
            flags=re.DOTALL
        )
        if new_content != content:
            with open(f, 'w', encoding='utf-8') as file:
                file.write(new_content)
            count += 1
            print(f'Updated: {f}')

print(f'Total HTML files updated: {count}')

# 2. Update en.json to change "NEWS" to "News"
en_json_path = r'd:\BLOXTRADE - SITE\SITE BLOXTRADE\scripts\en.json'
with open(en_json_path, 'r', encoding='utf-8') as f:
    en_data = json.load(f)

if en_data.get('footer_col3_1') == 'NEWS':
    en_data['footer_col3_1'] = 'News'
    with open(en_json_path, 'w', encoding='utf-8') as f:
        json.dump(en_data, f, indent=2, ensure_ascii=False)
    print("Updated en.json 'NEWS' -> 'News'")

# 3. Update i18n.js to change "NEWS" to "News"
i18n_path = r'd:\BLOXTRADE - SITE\SITE BLOXTRADE\scripts\i18n.js'
with open(i18n_path, 'r', encoding='utf-8') as f:
    i18n_content = f.read()

if '"footer_col3_1": "NEWS"' in i18n_content:
    new_i18n = i18n_content.replace('"footer_col3_1": "NEWS"', '"footer_col3_1": "News"')
    with open(i18n_path, 'w', encoding='utf-8') as f:
        f.write(new_i18n)
    print("Updated i18n.js 'NEWS' -> 'News'")
