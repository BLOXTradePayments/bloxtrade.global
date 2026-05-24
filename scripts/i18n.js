document.addEventListener("DOMContentLoaded", () => {
  const defaultLang = "en";
  let currentLang = localStorage.getItem("bloxtrade_lang") || defaultLang;

  const translationsData = {
    pt: {
      "nav_solutions": "Soluções",
      "nav_infrastructure": "Infraestrutura",
      "nav_compliance": "Compliance",
      "nav_insights": "Conteúdos",
      "nav_company": "Empresa",
      "nav_contact": "Contato",
      "btn_platform_login": "Entrar na plataforma",
      "btn_book_demo": "Agendar demo",
      "weareglobal_title": "WE ARE GLOBAL",
      "weareglobal_text": "Sediada em Delaware, a BLOXtrade utiliza ativos digitais como ferramentas práticas de tesouraria, garantindo que o valor se mova através das fronteiras de forma rápida, transparente e eficiente.",
      "hero_eyebrow": "Infraestrutura global de pagamentos",
      "hero_headline": "Pagamentos<br>globais<br><span style=\"color: #81CD4E; font-weight: 700;\">em minutos!</span>",
      "hero_subheadline": "Pague, receba e liquide operações internacionais em minutos.",
      "hero_support_line": "8 anos de experiência · 100 mil transações · USD 2,5 bilhões transacionados · operação em mais de 40 países",
      "metrics_title": "Infraestrutura<br>validada em<br>escala real",
      "metrics_1": "USD 2,5 bi transacionados",
      "metrics_2": "100 mil transações executadas",
      "metrics_3": "8 anos de experiência",
      "metrics_4": "40+ países atendidos",
      "metrics_5": "Liquidação 24/7",
      "problem_eyebrow": "O problema",
      "problem_title": "Operações globais não deveriam depender do ritmo dos bancos.",
      "problem_body": "Importadores, exportadores, fintechs e empresas com operação internacional perdem tempo, margem e previsibilidade com processos bancários lentos, múltiplos intermediários, custos fragmentados e janelas limitadas de liquidação.",
      "problem_bullet_1": "Liquidação em dias, não em minutos",
      "problem_bullet_2": "Dependência de horário bancário",
      "problem_bullet_3": "Múltiplas taxas ao longo da rota",
      "problem_bullet_4": "Baixa flexibilidade para operações globais",
      "solution_eyebrow": "A solução",
      "solution_title": "Uma <span style=\"color: #81CD4E; font-weight: 900;\">camada financeira moderna</span><br><span style=\"display: block;\">para operações internacionais.</span>",
      "solution_body_1": "A BLOXtrade é uma orquestradora de pagamentos internacionais B2B que está redefinindo a movimentação do capital global. A empresa atua como uma camada unificada de infraestrutura conectando negócios a provedores de liquidez e trilhos financeiros modernos, alavancando stablecoins para eliminar os atritos do sistema bancário tradicional.",
      "solution_body_2": "Ao unir agilidade e compliance, a BLOXtrade otimiza as operações de câmbio por meio de liquidação instantânea e redução drástica de custos, incluindo as taxas SWIFT, ao mesmo tempo em que mantém a segurança regulatória exigida pelo mercado corporativo.",
      "services_title": "<span class=\"services-title-wrapper\"><span>Soluções</span><span class=\"services-subtitle\">para operações que já pensam<br>globalmente.</span></span>",
      "services_card1_title": "Pagamentos internacionais",
      "services_card1_text": "Envie recursos para fornecedores, parceiros e operações no exterior com liquidação ágil e rotas mais eficientes.",
      "services_card2_title": "Contas a pagar e a receber",
      "services_card2_text": "Centralize pagamentos e recebimentos internacionais sem precisar replicar estrutura local em cada mercado.",
      "services_card3_title": "Tesouraria global",
      "services_card3_text": "Aceite, converta, liquide e saque com mais flexibilidade entre moedas e geografias.",
      "services_card4_title": "OFF RAMP",
      "services_card4_text": "Conecte local e stablecoins em uma infraestrutura preparada para fluxos globais.",
      "services_card5_title": "Trade finance",
      "services_card5_text": "Apoie importação e exportação com soluções financeiras mais rápidas e adaptadas à nova economia global.",
      "services_card6_title": "API para pagamentos globais",
      "services_card6_text": "Adicione pagamentos cross-border e fluxos com stablecoins ao seu produto com integração simples para times técnicos.",
      "howitworks_eyebrow": "Como funciona",
      "howitworks_title": "OPERATE<br>NOW!",
      "howitworks_step1_title": "Abra sua operação global",
      "howitworks_step1_text": "Onboarding 100% digital e acesso à estrutura para operar USD, EUR e USDT sem burocracia desnecessária.",
      "howitworks_step2_title": "Configure a operação",
      "howitworks_step2_text": "Defina destinatário, valor e moeda. A BLOXtrade direciona a transação pela rota mais eficiente em custo e velocidade.",
      "howitworks_step3_title": "Liquide em minutos",
      "howitworks_step3_text": "Pagamentos acontecem em minutos, não em dias, com disponibilidade 24/7.",
      "infra_eyebrow": "Infraestrutura",
      "infra_title": "Built for treasury teams. Ready for product teams.",
      "infra_body": "Nossa infraestrutura foi desenhada para suportar pagamentos globais de alto volume e alta velocidade, com rede de liquidez, on/off-ramp, settlement contínuo e API pronta para produtos financeiros e operações cross-border.",
      "infra_bullet_1": "Liquidação quase instantânea em diversos pares",
      "infra_bullet_2": "Envio direto para contas bancárias em mercados estratégicos, incluindo EUA, China e América Latina",
      "infra_bullet_3": "Infraestrutura pronta para desenvolvedores",
      "infra_bullet_4": "Plataforma intuitiva para operação financeira global",
      "comparison_eyebrow": "Comparativo",
      "comparison_title": "SWIFT foi feito para outra era.",
      "comparison_row1_title": "Tempo de liquidação",
      "comparison_row1_swift": "1 a 5 dias",
      "comparison_row1_bloxtrade": "Minutos",
      "comparison_row2_title": "Disponibilidade",
      "comparison_row2_swift": "Horário bancário",
      "comparison_row2_bloxtrade": "24/7",
      "comparison_row3_title": "Custos",
      "comparison_row3_swift": "Múltiplas taxas",
      "comparison_row3_bloxtrade": "Taxas competitivas",
      "comparison_row4_title": "Operação",
      "comparison_row4_swift": "Cadeia lenta e fragmentada",
      "comparison_row4_bloxtrade": "Fluxo mais direto e previsível",
      "compliance_eyebrow": "Compliance",
      "compliance_title": "Estrutura global, operação alinhada ao ambiente regulatório.",
      "compliance_body": "A BLOXtrade atua em conformidade com o Marco Legal dos Ativos Virtuais no Brasil, incluindo a Lei 14.478/2022 e obrigações fiscais aplicáveis, com operações em moeda fiduciária realizadas por instituições financeiras ou de pagamento autorizadas.",
      "compliance_support": "Segurança, transparência e aderência regulatória não são anexos da operação. São parte da infraestrutura.",
      "partners_eyebrow": "Ecossistema",
      "partners_title": "PARTNERS",
      "partners_body": "A BLOXtrade opera conectada a parceiros relevantes em custódia, compliance, pagamentos, liquidez e infraestrutura financeira, reforçando a robustez do seu ecossistema operacional.",
      "insights_eyebrow": "Conteúdos",
      "insights_title": "NEWS",
      "insights_body": "Guias, análises e conteúdos práticos para empresas que operam entre moedas, mercados e jurisdições.",
      "insights_card1": "香港區塊鏈協會 (HKBA) · Family Offices Summit",
      "insights_card2": "Payments by the Beach",
      "insights_card3": "BLOXtrade expands globally",
      "cta_title": "Sua operação global não deveria andar na velocidade dos bancos.",
      "cta_body": "Fale com a BLOXtrade para estruturar pagamentos, recebimentos e liquidação internacional com mais velocidade, eficiência e controle.",
      "footer_col1_title": "Empresa",
      "footer_col1_1": "Sobre",
      "footer_col1_2": "Carreiras",
      "footer_col1_3": "Contato",
      "footer_col2_title": "Soluções",
      "footer_col2_1": "Pagamentos internacionais",
      "footer_col2_2": "Tesouraria global",
      "footer_col2_3": "Trade finance",
      "footer_col2_4": "API",
      "footer_col3_title": "Conteúdos",
      "footer_col3_1": "Blog",
      "footer_col3_2": "Guias",
      "footer_col3_3": "Insights",
      "footer_col4_title": "Legal",
      "footer_col4_1": "Política de privacidade",
      "footer_col4_2": "Termos de uso",
      "footer_col4_3": "Compliance",
      "footer_legal_note": "Bloxtrade Ltda., CNPJ 50.473.200/0001-40, com sede em São Paulo. A empresa atua na intermediação digital de operações com ativos virtuais e não é instituição financeira. Operações em moeda fiduciária são processadas por instituições autorizadas, em conformidade com a legislação aplicável."
    },
    en: {
      "nav_solutions": "Solutions",
      "nav_infrastructure": "Infrastructure",
      "nav_compliance": "Compliance",
      "nav_insights": "Insights",
      "nav_company": "Company",
      "nav_contact": "Contact",
      "btn_platform_login": "Platform login",
      "btn_book_demo": "Book a demo",
      "hero_eyebrow": "Global payments infrastructure",
      "hero_headline": "Global<br>transactions<br><span style=\"color: #81CD4E; font-weight: 700;\">in minutes!</span>",
      "hero_subheadline": "A next-generation payments infrastructure powered by stablecoins, designed to make global transactions faster, simpler, and more efficient.",
      "hero_support_line": "8 years of experience · 100,000 transactions · USD 2.5 billion transacted · operations in 40+ countries",
      "metrics_title": "Infrastructure<br>proven at<br>real scale",
      "metrics_1": "USD 2.5B transacted",
      "metrics_2": "100,000 executed transactions",
      "metrics_3": "8 years of experience",
      "metrics_4": "40+ countries served",
      "metrics_5": "24/7 settlement",
      "problem_eyebrow": "The problem",
      "problem_title": "Legacy banking slows global operations down.",
      "problem_body": "Importers, exporters, fintechs, and globally active companies lose time, margin, and operational visibility to slow banking processes, multiple intermediaries, fragmented fees, and limited settlement windows.",
      "problem_bullet_1": "Settlement in days, not minutes",
      "problem_bullet_2": "Dependence on banking hours",
      "problem_bullet_3": "Multiple fees across the route",
      "problem_bullet_4": "Limited flexibility for global operations",
      "solution_eyebrow": "The solution",
      "solution_title": "A <span style=\"color: #81CD4E; font-weight: 900;\">modern financial</span> layer<br><span style=\"display: block;\">for international operations.</span>",
      "solution_body_1": "BLOXtrade is a B2B international payments orchestrator redefining the movement of global capital. The company operates as a unified infrastructure layer connecting businesses to liquidity providers and modern financial rails, leveraging stablecoins to eliminate the frictions of the traditional banking system.",
      "solution_body_2": "By combining agility and compliance, BLOXtrade optimizes foreign exchange operations through instant settlement and significant cost reduction, including SWIFT fees, while maintaining the regulatory security required by the corporate market.",
      "services_title": "<span class=\"services-title-wrapper\"><span>Solutions</span><span class=\"services-subtitle\">for companies already<br>operating globally.</span></span>",
      "services_card1_title": "International payments",
      "services_card1_text": "Send funds to suppliers, partners, and international operations through faster and more efficient settlement routes.",
      "services_card2_title": "Accounts payable and receivable",
      "services_card2_text": "Centralize cross-border payables and receivables without replicating local structure in every market.",
      "services_card3_title": "Global treasury",
      "services_card3_text": "Accept, convert, settle, and withdraw with more flexibility across currencies and geographies.",
      "services_card4_title": "OFF RAMP",
      "services_card4_text": "Connect local and stablecoins through infrastructure built for global flows.",
      "services_card5_title": "Trade finance",
      "services_card5_text": "Support import and export operations with faster financial tools tailored to the new global economy.",
      "services_card6_title": "API for global payments",
      "services_card6_text": "Add cross-border payments and stablecoin flows to your product with lightweight integration for technical teams.",
      "howitworks_eyebrow": "How it works",
      "howitworks_title": "OPERATE<br>NOW!",
      "howitworks_step1_title": "Open your global operation",
      "howitworks_step1_text": "100% digital onboarding and access to infrastructure for USD, EUR, and USDT operations without unnecessary friction.",
      "howitworks_step2_title": "Configure the transaction",
      "howitworks_step2_text": "Set recipient, amount, and currency. BLOXtrade routes the transaction through the most efficient path in cost and speed.",
      "howitworks_step3_title": "Settle in minutes",
      "howitworks_step3_text": "Payments settle in minutes, not days, with 24/7 availability.",
      "weareglobal_title": "WE ARE GLOBAL",
      "weareglobal_text": "Headquartered in Delaware, BLOXtrade uses digital assets as practical treasury tools, ensuring value moves across borders in a fast, transparent, and efficient way.",
      "infra_eyebrow": "Infrastructure",
      "infra_title": "Built for treasury teams. Ready for product teams.",
      "infra_body": "Our infrastructure is designed for high-volume, high-speed global payments, with liquidity network, on/off-ramp capabilities, continuous settlement, and an API ready for financial products and cross-border operations.",
      "infra_bullet_1": "Near-instant settlement across multiple currency pairs",
      "infra_bullet_2": "Direct transfers to bank accounts in strategic markets, including the U.S., China, and Latin America",
      "infra_bullet_3": "Developer-ready infrastructure",
      "infra_bullet_4": "An intuitive platform for global financial operations",
      "comparison_eyebrow": "Comparison",
      "comparison_title": "SWIFT was built for a different era.",
      "comparison_row1_title": "Settlement time",
      "comparison_row1_swift": "1 to 5 days",
      "comparison_row1_bloxtrade": "Minutes",
      "comparison_row2_title": "Availability",
      "comparison_row2_swift": "Banking hours only",
      "comparison_row2_bloxtrade": "24/7",
      "comparison_row3_title": "Costs",
      "comparison_row3_swift": "Multiple fees",
      "comparison_row3_bloxtrade": "Competitive rates",
      "comparison_row4_title": "Operations",
      "comparison_row4_swift": "Slow and fragmented chain",
      "comparison_row4_bloxtrade": "More direct and predictable flow",
      "compliance_eyebrow": "Compliance",
      "compliance_title": "Global infrastructure aligned with regulatory requirements.",
      "compliance_body": "BLOXtrade operates in accordance with Brazil’s legal framework for virtual assets, including Law 14,478/2022 and applicable tax reporting obligations, while fiat transactions are processed through authorized financial or payment institutions.",
      "compliance_support": "Security, transparency, and regulatory alignment are not add-ons. They are part of the infrastructure.",
      "partners_eyebrow": "Ecosystem",
      "partners_title": "PARTNERS",
      "partners_body": "BLOXtrade operates alongside relevant partners across custody, compliance, payments, liquidity, and financial infrastructure, reinforcing the strength of its operating ecosystem.",
      "insights_eyebrow": "Insights",
      "insights_title": "NEWS",
      "insights_body": "Guides, analysis, and practical content for companies operating across currencies, markets, and jurisdictions.",
      "insights_card1": "香港區塊鏈協會 (HKBA) · Family Offices Summit",
      "insights_card2": "Payments by the Beach",
      "insights_card3": "BLOXtrade expands globally",
      "cta_title": "Your global operation should not move at banking speed.",
      "cta_body": "Talk to BLOXtrade about structuring international payments, collections, and settlement with more speed, efficiency, and control.",
      "footer_col1_title": "Company",
      "footer_col1_1": "About",
      "footer_col1_2": "Careers",
      "footer_col1_3": "Contact",
      "footer_col2_title": "Solutions",
      "footer_col2_1": "International payments",
      "footer_col2_2": "Global treasury",
      "footer_col2_3": "Trade finance",
      "footer_col2_4": "API",
      "footer_col3_title": "Content",
      "footer_col3_1": "Blog",
      "footer_col3_2": "Guides",
      "footer_col3_3": "Insights",
      "footer_col4_title": "Legal",
      "footer_col4_1": "Privacy policy",
      "footer_col4_2": "Terms of use",
      "footer_col4_3": "Compliance",
      "footer_legal_note": "Bloxtrade Ltda. is a Brazil-based company focused on the digital intermediation of virtual asset operations and is not a financial institution. Fiat transactions are processed through authorized institutions in accordance with applicable regulation."
    }
  };

  // Language switcher elements
  const langToggles = document.querySelectorAll("[data-lang-toggle]");

  // Load translations
  function loadTranslations(lang) {
    try {
      const translations = translationsData[lang];
      if (!translations) throw new Error("Translation data not found");
      
      applyTranslations(translations);
      document.documentElement.lang = lang;
      localStorage.setItem("bloxtrade_lang", lang);
      updateToggleUI(lang);
    } catch (error) {
      console.error("Error loading translations:", error);
    }
  }

  // Apply translations to the DOM
  function applyTranslations(translations) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[key]) {
        // If element is an input placeholder
        if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
            el.placeholder = translations[key];
        } else {
            // For regular elements, preserve internal spans if any
            if (el.hasAttribute('data-i18n-html')) {
                el.innerHTML = translations[key];
            } else {
                el.textContent = translations[key];
            }
        }
      }
    });
  }

  // Update UI for language toggles
  function updateToggleUI(lang) {
    langToggles.forEach(toggle => {
      const toggleLang = toggle.getAttribute("data-lang-toggle");
      if (toggleLang === lang) {
        toggle.classList.add("active");
      } else {
        toggle.classList.remove("active");
      }
    });
  }

  // Event listeners for language switchers
  langToggles.forEach(toggle => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const newLang = toggle.getAttribute("data-lang-toggle");
      if (newLang !== currentLang) {
        currentLang = newLang;
        loadTranslations(currentLang);
      }
    });
  });

  // Initial load
  loadTranslations(currentLang);
});
