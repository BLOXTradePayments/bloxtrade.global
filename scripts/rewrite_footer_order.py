import glob
import re

files = glob.glob(r'd:\BLOXTRADE - SITE\SITE BLOXTRADE\*.html')

new_footer = '''  <footer class="footer">
    <div class="container">
      <!-- 1. Brand & Socials -->
      <div class="footer-brand" style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2.5rem;">
        <a href="index.html" class="logo" style="margin-bottom: 0;">
          <img src="./assets/logos/Logotipo-BloxTrade/SVG/LOGO-BLOXTRADE-VS1-BG-VERDE-ESCURO.svg" alt="BLOXtrade Logo" width="180" height="36" loading="lazy" decoding="async">
        </a>
        <div class="social-links" style="margin-top: 0;">
          <a href="https://www.linkedin.com/company/bloxtradeofficial/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" class="social-link">
            <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="https://x.com/_BLOXtrade" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer" class="social-link">
            <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://www.instagram.com/bloxtrade.global/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" class="social-link">
            <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
        </div>
      </div>

      <!-- 2. Disclaimer Text -->
      <div class="footer-legal" style="border-top: none; padding-top: 0; padding-bottom: 3rem; margin-bottom: 0;">
        <p data-i18n="footer_legal_note" data-i18n-html>A BLOXtrade Technology Inc. \u00e9 registrada no Financial Transactions and Reports Analysis Centre of Canada (FINTRAC) e registrada na FinCEN como MSB no estado de Montana.<br><br>A BLOXtrade n\u00e3o \u00e9 um banco. Os servi\u00e7os de pagamento podem ser fornecidos por institui\u00e7\u00f5es financeiras licenciadas. As taxas variam com base no m\u00e9todo de pagamento e destino. A velocidade de transfer\u00eancia pode variar com base nos tempos de processamento do banco receptor e nas condi\u00e7\u00f5es da rede de pagamentos. A disponibilidade do servi\u00e7o e os limites de transa\u00e7\u00e3o podem variar de acordo com a regi\u00e3o e a institui\u00e7\u00e3o parceira.</p>
      </div>

      <!-- 3. Copyright & Legal Links -->
      <div class="footer-bottom">
        <span class="footer-copyright" data-i18n="footer_copyright">\u00a92026. ALL RIGHTS RESERVED. BLOXTRADE TECHNOLOGY INC.</span>
        <div class="footer-bottom-links">
          <a href="terms.html" data-i18n="footer_col4_2">TERMS OF USE</a>
          <a href="privacy-policy.html" data-i18n="footer_col4_1">PRIVACY POLICY</a>
        </div>
      </div>

      <!-- 4. Navigation Grid -->
      <div class="footer-grid">
        <div>
          <a href="index.html#company" class="footer-col-title" style="display:block; text-decoration:none;" data-i18n="footer_col1_title">Company</a>
          <div class="footer-links">
            <a href="index.html#company" data-i18n="footer_col1_1">About</a>
            <a href="careers.html" data-i18n="footer_col1_2">Careers</a>
            <a href="contact.html" data-i18n="footer_col1_3">Contact</a>
            <a href="compliance.html" data-i18n="footer_col4_3">Compliance</a>
          </div>
        </div>

        <div>
          <a href="index.html#solutions" class="footer-col-title" style="display:block; text-decoration:none;" data-i18n="footer_col2_title">Solutions</a>
          <div class="footer-links" style="margin-bottom: 2rem;"></div>
          
          <a href="news.html" class="footer-col-title" style="display:block; text-decoration:none;" data-i18n="footer_col3_title">Content</a>
          <div class="footer-links">
            <a href="news.html" data-i18n="footer_col3_1">News</a>
          </div>
        </div>
      </div>
    </div>
  </footer>'''

count = 0
for f in files:
    with open(f, 'r', encoding='utf-8', errors='ignore') as file:
        content = file.read()

    if '<footer class="footer">' in content and '</footer>' in content:
        new_content = re.sub(
            r'  <footer class="footer">.*?</footer>',
            new_footer,
            content,
            flags=re.DOTALL
        )
        if new_content != content:
            with open(f, 'w', encoding='utf-8') as file:
                file.write(new_content)
            count += 1
            print(f'Updated: {f}')
        else:
            print(f'No change: {f}')
    else:
        print(f'Skipped (no footer found): {f}')

print(f'\\nTotal files updated: {count}')
