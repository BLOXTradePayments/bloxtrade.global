import glob
import re

files = glob.glob(r'd:\BLOXTRADE - SITE\SITE BLOXTRADE\*.html')

replacement = """  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="index.html" class="logo">
            <img src="./assets/logos/Logotipo-BloxTrade/SVG/LOGO-BLOXTRADE-VS1-BG-VERDE-ESCURO.svg" alt="BLOXtrade Logo" width="180" height="36" loading="lazy" decoding="async">
          </a>
          <div class="social-links">
            <a href="https://www.linkedin.com/company/bloxtradeofficial/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" class="social-link">
              <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://x.com/_BLOXtrade" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer" class="social-link">
              <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.instagram.com/bloxtrade.global/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" class="social-link">
              <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
502:             </a>
503:           </div>
504:         </div>
505: 
506:         <!-- Desktop Navigation (Hidden on Mobile) -->
507:         <div class="footer-nav-desktop">
508:           <div class="footer-col">
509:             <a href="index.html#company" class="footer-col-title" data-i18n="footer_col1_title">Empresa</a>
510:             <div class="footer-links">
511:               <a href="index.html#company" data-i18n="footer_col1_1">Sobre</a>
512:               <a href="careers.html" data-i18n="footer_col1_2">Carreiras</a>
513:               <a href="contact.html" data-i18n="footer_col1_3">Contato</a>
514:             </div>
515:           </div>
516:           <div class="footer-col">
517:             <a href="index.html#solutions" class="footer-col-title" data-i18n="footer_col2_title">Soluções</a>
518:             <div class="footer-links">
519:               <a href="index.html#solutions" data-i18n="footer_col2_1">Pagamentos internacionais</a>
520:               <a href="index.html#solutions" data-i18n="footer_col2_2">Tesouraria global</a>
521:             </div>
522:           </div>
523:           <div class="footer-col">
524:             <div class="footer-col-title" data-i18n="footer_col3_title">Conteúdos</div>
525:             <div class="footer-links">
526:               <a href="news.html" data-i18n="footer_col3_1">Blog</a>
527:             </div>
528:           </div>
529:           <div class="footer-col">
530:             <div class="footer-col-title" data-i18n="footer_col4_title">Legal</div>
531:             <div class="footer-links">
532:               <a href="privacy-policy.html" data-i18n="footer_col4_1">Política de privacidade</a>
533:               <a href="terms.html" data-i18n="footer_col4_2">Termos de uso</a>
534:               <a href="compliance.html" data-i18n="footer_col4_3">Compliance</a>
535:             </div>
536:           </div>
537:         </div>
538: 
539:         <!-- Mobile Navigation (Hidden on Desktop) -->
540:         <div class="footer-nav-mobile">
541:           <div class="footer-col-left">
542:             <a href="index.html#company" class="footer-col-title" data-i18n="footer_col1_title">Company</a>
543:             <a href="index.html#solutions" class="footer-col-title" data-i18n="footer_col2_title" style="margin-top: 1.5rem; display: block;">Solutions</a>
544:             <div class="footer-col-title" data-i18n="footer_col3_title" style="margin-top: 1.5rem;">Content</div>
545:             <div class="footer-links">
546:               <a href="news.html" data-i18n="footer_col3_1">News</a>
547:             </div>
548:           </div>
549:           <div class="footer-col-right">
550:             <div class="footer-links" style="margin-top: 2.5rem;">
551:               <a href="index.html#company" data-i18n="footer_col1_1">About</a>
552:               <a href="careers.html" data-i18n="footer_col1_2">Careers</a>
553:               <a href="contact.html" data-i18n="footer_col1_3">Contact</a>
554:               <a href="compliance.html" data-i18n="footer_col4_3">Compliance</a>
555:             </div>
556:           </div>
557:         </div>
558: 
559:       </div>
560:       
561:       <div class="footer-disclaimer">
562:         <p data-i18n="footer_legal_note" data-i18n-html>A BLOXtrade Technology Inc. é registrada no Financial Transactions and Reports Analysis Centre of Canada (FINTRAC) e registrada na FinCEN como MSB no estado de Montana.<br><br>A BLOXtrade não é um banco. Os serviços de pagamento podem ser fornecidos por instituições financeiras licenciadas. As taxas variam com base no método de pagamento e destino. A velocidade de transferência pode variar com base nos tempos de processamento do banco receptor e nas condições da rede de pagamentos. A disponibilidade do serviço e os limites de transação podem variar de acordo com a região e a instituição parceira.</p>
563:       </div>
564:       
565:       <div class="footer-bottom">
566:         <div class="footer-copyright">
567:           <span data-i18n="footer_copyright">©2026. ALL RIGHTS RESERVED. BLOXTRADE TECHNOLOGY INC.</span>
568:         </div>
569:         <div class="footer-legal-links">
570:           <a href="terms.html" data-i18n="footer_col4_2">Termos de uso</a>
571:           <a href="privacy-policy.html" data-i18n="footer_col4_1">Política de privacidade</a>
572:         </div>
573:       </div>
574:     </div>
575:   </footer>"""
for f in files:
    with open(f, 'r', encoding='utf-8', errors='ignore') as file:
        content = file.read()
    
    new_content = re.sub(r'<footer class="footer">.*?</footer>', replacement, content, flags=re.DOTALL)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(new_content)
    print(f'Updated {f}')
