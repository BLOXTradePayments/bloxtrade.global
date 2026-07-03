const fs = require('fs');
const path = require('path');

const ptContent = require('./pt.js');
const enContent = require('./en.js');
const esContent = require('./es.js');

const filePath = path.join(__dirname, '..', 'privacy-policy.html');
let html = fs.readFileSync(filePath, 'utf8');

// Replace the language switcher to include ES
html = html.replace(
  /<div class="lang-switcher">[\s\S]*?<\/div>/,
  `<div class="lang-switcher">
          <span class="lang-btn" data-lang-toggle="pt">PT</span>
          <span class="lang-sep">/</span>
          <span class="lang-btn" data-lang-toggle="en">EN</span>
          <span class="lang-sep">/</span>
          <span class="lang-btn" data-lang-toggle="es">ES</span>
        </div>`
);

// We want to replace the whole <main class="legal-page">...</main> block
// because we are overhauling the content.
// The new main block:

const newMain = `
  <main class="legal-page">
    <div class="container">
      
      <!-- HEADER TITLE SECTION -->
      <section class="legal-header-section">
        <div class="lang-pt">
          <div class="eyebrow">Legal</div>
          <h1 class="h2">Política de Privacidade</h1>
          <p class="last-updated">Última atualização: Junho de 2026</p>
        </div>
        <div class="lang-en">
          <div class="eyebrow">Legal</div>
          <h1 class="h2">Privacy Policy</h1>
          <p class="last-updated">Last updated: June 2026</p>
        </div>
        <div class="lang-es" style="display: none;">
          <div class="eyebrow">Legal</div>
          <h1 class="h2">Política de Privacidad</h1>
          <p class="last-updated">Última actualización: Junio de 2026</p>
        </div>
      </section>

      <!-- MAIN PRIVACY CONTENT LAYOUT -->
      <div class="legal-layout">
        
        <!-- SIDEBAR TOC -->
        <aside class="legal-sidebar">
          <div class="lang-pt">
            <h3 class="toc-title">Navegação</h3>
            <div class="toc-list">
              <a href="#introducao" class="toc-link">1. Introdução</a>
              <a href="#definicoes" class="toc-link">2. Definições</a>
              <a href="#dados-coletados" class="toc-link">3. Dados Pessoais Coletados</a>
              <a href="#fontes" class="toc-link">4. Fontes dos Dados</a>
              <a href="#papeis" class="toc-link">5. Papéis</a>
              <a href="#finalidades" class="toc-link">6. Finalidades</a>
              <a href="#dados-sensiveis" class="toc-link">7. Dados Sensíveis</a>
              <a href="#consentimento" class="toc-link">8. Gerenciamento do Consentimento</a>
              <a href="#decisao-automatizada" class="toc-link">9. Tomada de Decisão Automatizada</a>
              <a href="#finalidades-secundarias" class="toc-link">10. Finalidades Secundárias</a>
              <a href="#compartilhamento" class="toc-link">11. Compartilhamento</a>
              <a href="#transferencias" class="toc-link">12. Transferências Internacionais</a>
              <a href="#retencao" class="toc-link">13. Retenção de Dados</a>
              <a href="#seguranca" class="toc-link">14. Segurança de Dados</a>
              <a href="#cookies" class="toc-link">15. Cookies</a>
              <a href="#direitos" class="toc-link">16. Direitos do Titular</a>
              <a href="#reclamacoes" class="toc-link">17. Canal de Reclamações</a>
              <a href="#limitacoes" class="toc-link">18. Limitações aos Direitos</a>
              <a href="#funcionarios" class="toc-link">19. Funcionários e Contratados</a>
              <a href="#menores" class="toc-link">20. Proteção de Menores</a>
              <a href="#anonimizacao" class="toc-link">21. Anonimização</a>
              <a href="#sub-processadores" class="toc-link">22. Sub-Processadores</a>
              <a href="#governanca" class="toc-link">23. Governança</a>
              <a href="#framework-global" class="toc-link">24. Transferência Internacional</a>
              <a href="#alteracoes" class="toc-link">25. Alterações</a>
              <a href="#contato" class="toc-link">26. Contato (DPO)</a>
            </div>
          </div>
          <div class="lang-en">
            <h3 class="toc-title">Navigation</h3>
            <div class="toc-list">
              <a href="#introducao" class="toc-link">1. Introduction</a>
              <a href="#definicoes" class="toc-link">2. Definitions</a>
              <a href="#dados-coletados" class="toc-link">3. Personal Data Collected</a>
              <a href="#fontes" class="toc-link">4. Sources of Data</a>
              <a href="#papeis" class="toc-link">5. Roles</a>
              <a href="#finalidades" class="toc-link">6. Purposes for Data Use</a>
              <a href="#dados-sensiveis" class="toc-link">7. Sensitive Personal Data</a>
              <a href="#consentimento" class="toc-link">8. Consent Management</a>
              <a href="#decisao-automatizada" class="toc-link">9. Automated Decision-Making</a>
              <a href="#finalidades-secundarias" class="toc-link">10. Secondary Purposes</a>
              <a href="#compartilhamento" class="toc-link">11. Sharing of Personal Data</a>
              <a href="#transferencias" class="toc-link">12. International Transfers</a>
              <a href="#retencao" class="toc-link">13. Data Retention</a>
              <a href="#seguranca" class="toc-link">14. Data Security</a>
              <a href="#cookies" class="toc-link">15. Cookies</a>
              <a href="#direitos" class="toc-link">16. Your Rights</a>
              <a href="#reclamacoes" class="toc-link">17. Complaints Channel</a>
              <a href="#limitacoes" class="toc-link">18. Limitations on Rights</a>
              <a href="#funcionarios" class="toc-link">19. Employee Data</a>
              <a href="#menores" class="toc-link">20. Protection of Minors</a>
              <a href="#anonimizacao" class="toc-link">21. Anonymization</a>
              <a href="#sub-processadores" class="toc-link">22. Sub-Processors</a>
              <a href="#governanca" class="toc-link">23. Governance Program</a>
              <a href="#framework-global" class="toc-link">24. Global Framework</a>
              <a href="#alteracoes" class="toc-link">25. Changes</a>
              <a href="#contato" class="toc-link">26. Contact (DPO)</a>
            </div>
          </div>
          <div class="lang-es" style="display: none;">
            <h3 class="toc-title">Navegación</h3>
            <div class="toc-list">
              <a href="#introducao" class="toc-link">1. Introducción</a>
              <a href="#definicoes" class="toc-link">2. Definiciones</a>
              <a href="#dados-coletados" class="toc-link">3. Datos Personales</a>
              <a href="#fontes" class="toc-link">4. Fuentes de Datos</a>
              <a href="#papeis" class="toc-link">5. Roles</a>
              <a href="#finalidades" class="toc-link">6. Propósitos</a>
              <a href="#dados-sensiveis" class="toc-link">7. Datos Sensibles</a>
              <a href="#consentimento" class="toc-link">8. Consentimiento</a>
              <a href="#decisao-automatizada" class="toc-link">9. Decisiones Automatizadas</a>
              <a href="#finalidades-secundarias" class="toc-link">10. Propósitos Secundarios</a>
              <a href="#compartilhamento" class="toc-link">11. Compartición</a>
              <a href="#transferencias" class="toc-link">12. Transferencias Internacionales</a>
              <a href="#retencao" class="toc-link">13. Retención de Datos</a>
              <a href="#seguranca" class="toc-link">14. Seguridad de los Datos</a>
              <a href="#cookies" class="toc-link">15. Cookies</a>
              <a href="#direitos" class="toc-link">16. Sus Derechos</a>
              <a href="#reclamacoes" class="toc-link">17. Canal de Quejas</a>
              <a href="#limitacoes" class="toc-link">18. Limitaciones</a>
              <a href="#funcionarios" class="toc-link">19. Empleados y Contratistas</a>
              <a href="#menores" class="toc-link">20. Protección de Menores</a>
              <a href="#anonimizacao" class="toc-link">21. Anonimización</a>
              <a href="#sub-processadores" class="toc-link">22. Sub-Procesadores</a>
              <a href="#governanca" class="toc-link">23. Gobernanza</a>
              <a href="#framework-global" class="toc-link">24. Marco Global</a>
              <a href="#alteracoes" class="toc-link">25. Cambios</a>
              <a href="#contato" class="toc-link">26. Contacto (DPO)</a>
            </div>
          </div>
        </aside>

        <!-- CONTENT -->
        <article class="legal-content">
          <div class="lang-pt">
            <section class="policy-block">
              ${ptContent}
            </section>
          </div>
          <div class="lang-en">
            <section class="policy-block">
              ${enContent}
            </section>
          </div>
          <div class="lang-es" style="display: none;">
            <section class="policy-block">
              ${esContent}
            </section>
          </div>
        </article>
      </div>
    </div>
  </main>
`;

html = html.replace(/<main class="legal-page">[\s\S]*?<\/main>/, newMain.trim());

fs.writeFileSync(filePath, html);
console.log('Update complete.');
