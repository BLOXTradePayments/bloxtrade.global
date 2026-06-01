import glob
import re

files = glob.glob(r'd:\BLOXTRADE - SITE\SITE BLOXTRADE\*.html')
replacement = """        <div class="footer-right">
          <div class="footer-links-col">
            <a href="index.html#company" class="footer-col-title" data-i18n="footer_col1_title">Empresa</a>
            <a href="index.html#solutions" class="footer-col-title" data-i18n="footer_col2_title" style="display: block; margin-top: 1.5rem;">Soluções</a>
            <div class="footer-col-title" data-i18n="footer_col3_title" style="margin-top: 1.5rem;">Conteúdos</div>
          </div>
  
          <div class="footer-links-col">
            <div class="footer-links">
              <a href="news.html" data-i18n="footer_col3_1">Blog</a>
              <a href="index.html#company" data-i18n="footer_col1_1">Sobre</a>
              <a href="careers.html" data-i18n="footer_col1_2">Carreiras</a>
              <a href="contact.html" data-i18n="footer_col1_3">Contato</a>
              <a href="compliance.html" data-i18n="footer_col4_3">Compliance</a>
            </div>
          </div>
        </div>"""

for f in files:
    with open(f, 'r', encoding='utf-8', errors='ignore') as file:
        content = file.read()
    
    # Match the entire footer-right div until its closing tag
    if 'class="footer-right"' in content:
        # Since we know exactly what is currently there (from our previous run),
        # we can just regex replace everything inside <div class="footer-right"> ... </div>
        # up to the closing tags
        new_content = re.sub(r'[ \t]*<div class="footer-right">.*?(?=\n[ \t]*</div>\n[ \t]*</div>\n[ \t]*</footer>)', '\n' + replacement, content, flags=re.DOTALL)
        new_content2 = re.sub(r'[ \t]*<div class="footer-right">.*?(?=\n[ \t]*</div>\n[ \t]*\n[ \t]*</div>\n[ \t]*</footer>)', '\n' + replacement, new_content, flags=re.DOTALL)
        
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content2)
        print(f'Updated {f}')
