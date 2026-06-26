import os
import re

directories = [
    r"d:\BLOXTRADE - SITE\SITE BLOXTRADE",
    r"d:\bloxtrade.global"
]

target_pattern = r'<!-- Coluna 2 -->\s*<div>\s*<div class="footer-links" style="padding-top: 0\.2rem; display: flex; flex-direction: column; gap: 1\.5rem;">\s*<a href="careers\.html" data-i18n="footer_col1_2">Careers</a>\s*<a href="contact\.html" data-i18n="footer_col1_3">Contact</a>\s*</div>\s*</div>'

replacement_html = """<!-- Coluna 2 -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <a href="careers.html" class="footer-col-title" style="display:block; text-decoration:none; margin-bottom: 0;" data-i18n="footer_col1_2">Careers</a>
          <a href="contact.html" class="footer-col-title" style="display:block; text-decoration:none; margin-bottom: 0;" data-i18n="footer_col1_3">Contact</a>
        </div>"""

for directory in directories:
    print(f"Processing {directory}")
    html_files = [f for f in os.listdir(directory) if f.endswith(".html")]
    for filename in html_files:
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as file:
            content = file.read()
            
        new_content = re.sub(target_pattern, replacement_html, content)
        
        if content != new_content:
            with open(filepath, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f"Updated {filename}")
        else:
            print(f"No changes in {filename}")
