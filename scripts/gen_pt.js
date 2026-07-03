const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'privacy-policy.html');
let html = fs.readFileSync(filePath, 'utf8');

// Replace language switcher
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

const ptContent = `
<h2>1. Introdução</h2>
<p>A BLOXtrade LLC é uma empresa de tecnologia financeira especializada em pagamentos internacionais, câmbio, conversão de moedas estáveis (stablecoins) e soluções de tesouraria. Atuamos como Empresa de Serviços Monetários (MSB), sujeitos a regulamentação financeira em múltiplas jurisdições.</p>
<p>Esta Política de Privacidade (V1.0) incorpora os requisitos da: Regulamento Geral de Proteção de Dados – GDPR (UE 2016/679); UK GDPR e PECR; California Consumer Privacy Act – CCPA/CPRA; GLBA (EUA); Lei Geral de Proteção de Dados – LGPD (Lei nº 13.709/2018); Recomendações FATF/GAFI para VASPs; e demais leis aplicáveis nas jurisdições em que operamos.</p>
<p><em>NOTA: Esta política utiliza linguagem que atende simultaneamente ao titular pessoa física (consumidor) e ao representante de pessoa jurídica (cliente B2B). Onde existir distinção relevante, ela será explicitada.</em></p>

<h2>2. Definições</h2>
<p>Para fins desta Política:</p>
<ul class="policy-list">
  <li><strong>Dados Pessoais:</strong> qualquer informação relativa à pessoa singular identificada ou identificável.</li>
  <li><strong>Dados Pessoais Sensíveis:</strong> dados de origem racial/étnica, convicção religiosa, opinião política, saúde, vida sexual, dado genético ou biométrico.</li>
  <li><strong>Titular dos Dados:</strong> a pessoa natural a quem os dados se referem.</li>
  <li><strong>Controlador:</strong> BLOXtrade LLC — determina finalidades e meios do tratamento.</li>
  <li><strong>Operador/Processador:</strong> entidade que trata dados em nome do Controlador, sob instrução documentada.</li>
  <li><strong>Encarregado/DPO:</strong> responsável pela proteção de dados, canal entre titulares, Controlador e a autoridade.</li>
  <li><strong>VASP:</strong> Prestador de Serviços de Ativos Virtuais — empresa que presta intermediação, custódia ou emissão de criptoativos.</li>
  <li><strong>Travel Rule:</strong> obrigação FATF (Recomendação 16) de transmissão de dados de remetente e beneficiário entre VASPs em transações acima de USD 1.000.</li>
  <li><strong>Pseudonimização:</strong> tratamento que impede a atribuição dos dados a titular específico sem uso de informação adicional mantida separada.</li>
  <li><strong>Anonimização:</strong> processo irreversível pelo qual o dado perde qualquer possibilidade de identificação do titular.</li>
</ul>

<h2>3. Dados Pessoais Coletados</h2>
<h3>3.1. Dados de Identificação</h3>
<ul class="policy-list">
  <li>Nome completo, data de nascimento, gênero, nacionalidade, país de residência.</li>
  <li>Passaporte, CPF/CNPJ, RG, número de seguro social, CNH, outros documentos oficiais.</li>
  <li>Fotografias faciais e selfies para verificação biométrica de identidade (KYC) — classificados como dados sensíveis.</li>
</ul>
<h3>3.2. Dados de Contato</h3>
<ul class="policy-list">
  <li>E-mail, telefone, endereço físico e postal, contato de emergência.</li>
</ul>
<h3>3.3. Dados Financeiros e de Transação</h3>
<ul class="policy-list">
  <li>Contas bancárias, dados de cartão de crédito, número de identificação fiscal, histórico de transações financeiras, valores, métodos de pagamento.</li>
  <li>Endereços de carteiras digitais (wallets), detalhes de renda e patrimônio.</li>
  <li>Contratos e documentos comprobatórios de operações; comprovante de origem de fundos (Source of Funds).</li>
</ul>
<h3>3.4. Dados KYC/KYB e Conformidade</h3>
<ul class="policy-list">
  <li>Estrutura societária, beneficiários finais, registros corporativos.</li>
  <li>Triagem em listas de sanções, PEPs (Pessoas Politicamente Expostas) e mídia adversa.</li>
</ul>
<h3>3.5. Dados Técnicos e de Uso</h3>
<ul class="policy-list">
  <li>Endereços IP, identificadores de dispositivo, sistema operacional, tipo de navegador, logs, dados de erro.</li>
  <li>Localização (GPS, Wi-Fi, histórico), padrões de uso, duração de sessões, páginas visitadas, histórico de localização.</li>
</ul>
<h3>3.6. Dados de Marketing e Conta</h3>
<ul class="policy-list">
  <li>Preferências de marketing, assinaturas e newsletters, nome de usuário, foto e avatares de perfil, configurações de conta, respostas a campanhas de marketing, engajamento com materiais promocionais, fontes de referência.</li>
</ul>
<h3>3.7. Dados de Comunicação e Suporte</h3>
<ul class="policy-list">
  <li>Mensagens com nossa equipe, tickets, anotações de atendimento, gravações de chamadas (mediante aviso prévio).</li>
</ul>
<h3>3.8. Dados de Recrutamento</h3>
<ul class="policy-list">
  <li>CV, referências profissionais, anotações de entrevistas — exclusivamente para candidatos a vagas.</li>
</ul>
<h3>3.9. Dados de Funcionários e Contratados</h3>
<p>Coletamos e tratamos dados de funcionários e prestadores de serviço para fins de gestão da relação de trabalho.</p>

<h2>4. Fontes dos Dados</h2>
<ul class="policy-list">
  <li>Diretamente do titular: cadastro, transações, comunicações.</li>
  <li>Do empregador ou representante legal (clientes corporativos/KYB).</li>
  <li>Parceiros de KYC/KYB, provedores de verificação de identidade e análise de conformidade.</li>
  <li>Registros públicos, listas de sanções, bases judiciais, perfis profissionais.</li>
  <li>Cookies e tecnologias similares.</li>
  <li>Provedores de analytics e marketing (com consentimento, onde exigido).</li>
</ul>

<h2>5. Papéis: Controlador, Operador e Registros</h2>
<p>Quando determinamos as finalidades e meios do tratamento (onboarding, conformidade, suporte), atuamos como Controlador. Quando tratamos dados sob instrução documentada de um cliente (processamento de pagamentos em nome do cliente), atuamos como Operador/Processador — regido por Adendo de Processamento de Dados (DPA).</p>

<h2>6. Finalidades da utilização de dados</h2>
<ul class="policy-list">
  <li>Onboarding e prestação de serviços</li>
  <li>Conformidade AML/CFT, sanções, KYC/KYB</li>
  <li><strong>Fornecimento e Manutenção de Serviços:</strong> Para garantir a funcionalidade e a disponibilidade de nossos serviços.</li>
  <li><strong>Processamento de Pagamentos e Execução de Pedidos:</strong> Para processar pagamentos e concluir pedidos em conformidade com as regras de transparência e competitividade.</li>
  <li><strong>Prevenção de Fraudes:</strong> Para detectar e prevenir perdas de fundos, incluindo aquelas resultantes de fraudes e uso indevido de nossos serviços e aplicativos.</li>
  <li><strong>Conformidade com Leis e Regulamentos:</strong> Para garantir a conformidade com as leis e regulamentos relevantes, como os de combate à lavagem de dinheiro e ao financiamento do terrorismo.</li>
  <li><strong>Comunicação e Suporte ao Usuário:</strong> Para nos comunicarmos diretamente com você ou por meio de nossos parceiros para suporte ao cliente, notificações sobre alterações e atualizações de serviços, informações importantes relacionadas aos serviços, marketing e promoções.</li>
  <li><strong>Mensuração e Análise:</strong> Para entender como os usuários interagem com nossos serviços, analisar o comportamento do usuário e identificar preferências.</li>
  <li><strong>Segurança:</strong> Para promover a segurança e a integridade de seus fundos, nossos serviços e dados por meio de medidas de proteção e monitoramento contínuo.</li>
  <li><strong>Gerenciamento de Contas de Usuário:</strong> Para gerenciar contas de usuário, incluindo configuração, recuperação e encerramento de contas.</li>
  <li><strong>Personalização:</strong> Para adaptar as experiências do usuário com base em preferências e comportamentos, fornecendo conteúdo e recomendações personalizados.</li>
</ul>

<h2>7. Dados Pessoais Sensíveis</h2>
<p>Constituem dados pessoais sensíveis, nos termos do LGPD Art. 5º, II e GDPR Art. 9º: dados sobre origem racial ou étnica, convicção religiosa, opinião política, filiação sindical, saúde ou vida sexual, dados genéticos e dados biométricos quando utilizados para identificação unívoca de pessoa natural.</p>
<p>Em razão do processo de KYC, a BLOXtrade LLC poderá, eventualmente, coletar dados biométricos (fotografias faciais e selfies) para verificação de identidade.</p>
<p><em>NOTA: Não coletamos dados sobre saúde, convicção religiosa ou orientação sexual. Caso documentos de identidade apresentados revelem incidentalmente dados sensíveis de outras categorias, seu tratamento fica limitado à finalidade de verificação de identidade.</em></p>

<h2>8. Gerenciamento do Consentimento</h2>
<p>Quando o consentimento é a base legal aplicável, adotamos os seguintes princípios:</p>
<ul class="policy-list">
  <li><strong>Coleta:</strong> o consentimento é obtido mediante declaração clara, específica e destacada, em linguagem simples, antes do início do tratamento. Utilizamos checkboxes desmarcados por padrão (Privacy by Default).</li>
  <li><strong>Granularidade:</strong> o consentimento é obtido separadamente por finalidade (ex.: marketing, cookies de analytics, cookies de publicidade). Consentimento genérico ou agrupado não é aceito.</li>
  <li><strong>Evidência:</strong> cada consentimento é registrado com: timestamp, versão da política apresentada, endereço IP e identificador de sessão, garantindo o ônus da prova ao Controlador.</li>
  <li><strong>Revogação:</strong> o titular pode revogar o consentimento a qualquer momento, pelo portal de preferências ou pelo e-mail privacy@bloxtrade.global. A revogação não afeta a licitude do tratamento realizado antes dela.</li>
  <li><strong>Recusa e consequências:</strong> a recusa de consentimento para tratamentos baseados em contrato ou obrigação legal pode inviabilizar a prestação do serviço; isso será informado claramente no momento da coleta. A recusa para finalidades facultativas (marketing) não afeta o acesso ao serviço principal.</li>
</ul>

<h2>9. Tomada de Decisão Automatizada e Perfilamento</h2>
<p>Utilizamos sistemas automatizados de suporte à decisão nas seguintes situações: (a) pontuação de risco de fraude em transações; (b) limites de transação dinâmicos baseados no perfil KYC; (c) triagem automática em listas de sanções e PEPs; (d) bloqueio preventivo de transações com padrão anômalo.</p>
<p>Nenhuma dessas decisões é tomada exclusivamente por meios automatizados de forma a produzir efeitos jurídicos ou impactar significativamente o titular sem possibilidade de revisão humana. Em caso de bloqueio ou restrição gerado automaticamente, o titular pode:</p>
<ul class="policy-list">
  <li>Solicitar revisão humana pelo e-mail privacy@bloxtrade.global com identificação do caso.</li>
</ul>

<h2>10. Compatibilidade de Finalidades Secundárias</h2>
<p>O princípio da finalidade determina que dados coletados para uma finalidade específica somente podem ser utilizados para finalidade diversa se: (a) a nova finalidade for compatível com a original; ou (b) existir nova base legal adequada; ou (c) houver consentimento expresso do titular.</p>
<p>Para avaliar a compatibilidade, consideramos: a relação entre as finalidades original e secundária; a natureza dos dados (especialmente se sensíveis); as possíveis consequências para o titular; e a existência de salvaguardas adequadas. Caso não haja compatibilidade, exigimos nova base legal ou consentimento específico.</p>

<h2>11. Compartilhamento de Dados Pessoais</h2>
<p>Podemos compartilhar suas informações com terceiros para apoiar e aprimorar nossas operações comerciais, com as seguintes categorias de destinatários, sempre com salvaguardas contratuais e de segurança adequadas:</p>
<ul class="policy-list">
  <li><strong>Afiliadas e subsidiárias:</strong> para fins operacionais e de conformidade.</li>
  <li><strong>Fornecedores e sub-processadores:</strong> hospedagem, KYC/KYB, analytics, suporte — sob DPA (Data Processing Agreement).</li>
  <li><strong>Instituições financeiras e redes de pagamento:</strong> necessários para executar transações e atender obrigações regulatórias.</li>
  <li><strong>Outros VASPs (Travel Rule):</strong> quando obrigatório por lei.</li>
  <li><strong>Assessores profissionais (auditores, advogados):</strong> sob confidencialidade profissional.</li>
  <li><strong>Autoridades e reguladores:</strong> quando exigido por lei.</li>
  <li><strong>Parceiros de marketing e anunciantes:</strong> somente com consentimento e para finalidades autorizadas.</li>
  <li><strong>Transações corporativas (fusão, aquisição, insolvência):</strong> com proteções contratuais adequadas.</li>
  <li><strong>Com prestadores de serviços:</strong> Podemos compartilhar suas informações pessoais com prestadores de serviços para monitorar e analisar o uso de nosso serviço e para entrar em contato com você.</li>
  <li><strong>Para Transferências Comerciais:</strong> Podemos compartilhar ou transferir suas informações pessoais em conexão com, ou durante negociações de, qualquer fusão, venda de ativos da empresa, financiamento ou aquisição de toda ou parte de nossa empresa por outra empresa.</li>
</ul>
<p><strong>Não vendemos, nem compartilhamos dados pessoais para publicidade comportamental entre contextos (cross-context behavioral advertising).</strong></p>

<h2>12. Transferências Internacionais de Dados</h2>
<p>Suas informações, incluindo dados pessoais, são processadas nos escritórios operacionais da empresa e em qualquer outro local onde as partes envolvidas no processamento estejam localizadas. Isso significa que essas informações podem ser transferidas para — e mantidas em — computadores localizados fora do seu estado, província, país ou outra jurisdição governamental, onde as leis de proteção de dados podem ser diferentes das da sua jurisdição. Seu consentimento a esta Política de Privacidade, seguido pelo envio de tais informações, representa sua concordância com essa transferência. A empresa tomará todas as medidas razoavelmente necessárias para garantir que seus dados sejam tratados com segurança e de acordo com esta Política de Privacidade, e nenhuma transferência de seus dados pessoais ocorrerá para uma organização ou país, a menos que existam controles adequados em vigor, incluindo a segurança de seus dados e outras informações pessoais.</p>

<h2>13. Retenção de Dados</h2>
<p>Retemos dados pessoais pelo tempo estritamente necessário às finalidades para as quais foram coletados, observando obrigações legais, regulatórias, contratuais e de auditoria. A retenção para registros financeiros é geralmente de 5 a 7 anos, conforme a legislação de cada jurisdição aplicável.</p>

<h2>14. Segurança de Dados</h2>
<p>Mantemos programa de segurança da informação proporcional ao nosso perfil de risco, incluindo medidas técnicas e organizacionais, para proteger suas informações pessoais contra acesso, divulgação, alteração e destruição não autorizados. Essas medidas incluem:</p>
<ul class="policy-list">
  <li><strong>Treinamento:</strong> programa anual de conscientização em privacidade e segurança para todos os colaboradores; treinamento específico para equipes que tratam dados sensíveis.</li>
  <li><strong>Backups:</strong> cópias periódicas com teste de restauração; armazenamento isolado e criptografado.</li>
  <li><strong>Controles de Acesso:</strong> Restringir o acesso às suas informações pessoais a pessoal autorizado para fins comerciais legítimos.</li>
  <li><strong>Resposta a Incidentes:</strong> Estabelecer procedimentos de resposta a incidentes para lidar e mitigar prontamente quaisquer incidentes de segurança.</li>
</ul>

<h2>15. Cookies e Tecnologias Similares</h2>
<h3>15.1. Tecnologias Utilizadas</h3>
<p>Utilizamos cookies, pixels de rastreamento, web beacons, SDKs, identificadores de dispositivo e tecnologias similares em nossos sites e plataformas.</p>
<h3>15.2. Como Gerenciar suas Preferências</h3>
<p>Ao acessar nosso site pela primeira vez, exibimos um banner de consentimento (CMP — Consent Management Platform) que permite aceitar ou recusar categorias de cookies individualmente. Você pode alterar suas preferências a qualquer momento pelo link 'Gerenciar Cookies' no rodapé do site ou pelo painel de configurações da sua conta. Nos estados dos EUA que reconhecem sinais de opt-out universal (ex.: Global Privacy Control — GPC), honramos esses sinais automaticamente.</p>

<h2>16. Seus Direitos como Titular dos Dados</h2>
<p>Como usuário de nossos serviços, você tem certos direitos em relação aos dados pessoais que coletamos e utilizamos. Esses direitos incluem:</p>
<ul class="policy-list">
  <li><strong>Confirmação e Acesso:</strong> confirmar a existência de tratamento e obter acesso aos dados mantidos sobre você.</li>
  <li><strong>Retificação:</strong> corrigir dados incorretos, incompletos ou desatualizados.</li>
  <li><strong>Anonimização, Bloqueio ou Eliminação:</strong> de dados desnecessários, excessivos ou tratados em desconformidade.</li>
  <li><strong>Portabilidade:</strong> receber dados em formato estruturado e interoperável, para transferência a outro controlador.</li>
  <li><strong>Eliminação (Direito ao Esquecimento):</strong> exclusão de dados tratados com base em consentimento, ressalvadas obrigações legais.</li>
  <li><strong>Revogação de Consentimento:</strong> revogar o consentimento dado a qualquer tempo.</li>
  <li><strong>Revisão de Decisão Automatizada:</strong> solicitar revisão humana de decisões automatizadas que afetem seus interesses.</li>
  <li><strong>Opt-out de Marketing Direto:</strong> opor-se ao recebimento de comunicações de marketing e ter sua solicitação processada.</li>
  <li><strong>Não Discriminação:</strong> exercer qualquer dos direitos acima sem sofrer tratamento discriminatório.</li>
</ul>

<h2>17. Canal de Reclamações Internas</h2>
<p>Com o objetivo de assegurar a resolução célere de demandas, o titular de dados dispõe de canal interno para reclamações e solicitações.</p>
<ul class="policy-list">
  <li>Envie sua reclamação ao DPO pelo e-mail privacy@bloxtrade.global com o assunto 'RECLAMAÇÃO DE PRIVACIDADE'.</li>
</ul>

<h2>18. Limitações ao Exercício dos Direitos</h2>
<p>Como prestadora de serviços financeiros regulados, certas obrigações podem limitar o atendimento a solicitações:</p>
<ul class="policy-list">
  <li><strong>AML/CFT:</strong> dados de transação e identificação devem ser retidos para conformidade com normas antilavagem e financiamento do terrorismo, bem como para elaboração de Relatórios de Atividades Suspeitas (RAS/SAR).</li>
  <li><strong>Registros financeiros:</strong> leis aplicáveis exigem conservação de registros por períodos mínimos (5–7 anos conforme jurisdição).</li>
  <li><strong>Prevenção de fraudes:</strong> dados podem ser retidos para detecção e prevenção de atividades fraudulentas.</li>
  <li><strong>Ordens judiciais e regulatórias:</strong> quando houver determinação de autoridade competente, não poderemos eliminar ou fornecer acesso a determinados dados.</li>
</ul>

<h2>19. Dados de Funcionários e Contratados</h2>
<p>A BLOXtrade LLC trata dados de funcionários, estagiários e prestadores de serviço para fins de gestão da relação de trabalho/prestação de serviços. As categorias incluem: dados de identificação, contato e remuneração; histórico profissional e acadêmico; avaliações de desempenho; dados de benefícios e saúde ocupacional (onde legalmente exigidos); dados de acesso a sistemas; registros de ponto e produtividade.</p>
<p>Prazo de retenção: duração do vínculo + 5 anos (obrigações trabalhistas/tributárias). Dados de candidatos não selecionados são retidos por até 2 anos com consentimento, para futuros processos seletivos.</p>

<h2>20. Proteção de Menores de Idade</h2>
<p>Nossos serviços são destinados exclusivamente a pessoas com idade acima dos 18 (dezoito) anos, ou a pessoas que, no país de residência do usuário, possam ser consideradas civilmente responsáveis por seus atos. Implementamos os seguintes mecanismos de proteção:</p>
<ul class="policy-list">
  <li><strong>Verificação de idade:</strong> o processo de KYC inclui verificação da data de nascimento e de documento de identificação oficial.</li>
  <li><strong>Proteção diferenciada:</strong> caso seja identificado o cadastro de criança (até 12 anos incompletos) ou adolescente (12 a 18 anos), adotamos as seguintes medidas: (a) cancelamento imediato do cadastro; (b) exclusão de todos os dados pessoais coletados.</li>
  <li><strong>Consentimento parental:</strong> se nossa plataforma for adaptada para incluir usuários menores de 18 anos no futuro, o consentimento dos pais ou responsáveis legais será exigido, com processo verificável.</li>
</ul>
<p>Se você acreditar que coletamos dados de menor, entre em contato imediatamente pelo e-mail privacy@bloxtrade.global.</p>

<h2>21. Anonimização e Pseudonimização</h2>
<p>Adotamos técnicas de anonimização e pseudonimização como medidas de segurança e minimização de risco:</p>
<ul class="policy-list">
  <li><strong>Pseudonimização:</strong> utilizada em ambientes de analytics, desenvolvimento e testes — os identificadores diretos (nome, CPF, e-mail) são substituídos por identificadores sintéticos, mantidos separadamente sob controle do Controlador. Os dados pseudonimizados ainda estão sujeitos à legislação, pois a reidentificação é tecnicamente possível com a chave mantida.</li>
  <li><strong>Anonimização:</strong> ao fim do período de retenção ou para fins exclusivamente estatísticos e de pesquisa, os dados podem ser anonimizados de forma irreversível, tornando impossível a identificação do titular. Dados genuinamente anonimizados não estão sujeitos às obrigações de proteção de dados pessoais.</li>
</ul>

<h2>22. Sub-Processadores</h2>
<p>Utilizamos sub-processadores para apoiar a prestação de nossos serviços. Categorias principais e exemplos:</p>
<ul class="policy-list">
  <li><strong>Infraestrutura de nuvem:</strong> Servidores, armazenamento, CDN.</li>
  <li><strong>KYC / Verificação de identidade:</strong> Verificação facial, validação documental.</li>
  <li><strong>Analytics e monitoramento:</strong> Análise de comportamento, logs.</li>
  <li><strong>Comunicações e suporte:</strong> E-mail, chat, CRM.</li>
  <li><strong>Conformidade AML/CFT:</strong> Triagem de sanções, PEPs, adverse media.</li>
  <li><strong>Processamento de pagamentos:</strong> Roteamento, liquidação, câmbio.</li>
</ul>

<h2>23. Programa de Governança de Privacidade</h2>
<p>A conformidade com esta Política é sustentada por um programa estruturado de governança de privacidade. Esta Política é revisada anualmente ou sempre que houver alteração legislativa relevante, nova atividade de tratamento de alto risco, ou incidente de segurança significativo.</p>

<h2>24. Estrutura Global Transferência Internacional De Dados</h2>
<p><strong>24.1</strong> Como Empresa de Serviços Monetários registrada no Estado de Delaware, Estados Unidos, e com operações globais, a BLOXtrade poderá realizar a transferência internacional dos dados pessoais coletados. Ao utilizar as Plataformas e manifestar o aceite desta Política, o Titular dos Dados declara estar ciente e, quando exigido pela legislação aplicável, consente com a referida transferência internacional de dados, para as finalidades descritas neste instrumento e em conformidade com as normas de proteção de dados aplicáveis.</p>
<p><strong>24.2</strong> Para garantir a proteção, a segurança e a conformidade regulatória dos dados pessoais tratados em nossas Plataformas, a BLOXtrade adota uma estrutura de governança integrada, compatível com as jurisdições em que opera e com as legislações de proteção de dados aplicáveis.</p>

<h2>25. Alterações nesta Política</h2>
<p>Esta Política pode ser atualizada periodicamente para refletir mudanças legislativas, novas atividades de tratamento ou melhorias de transparência. Alterações materiais significativas serão notificadas pelos nossos canais de comunicação e publicadas nesta página. Recomendamos revisão periódica. A versão anterior ficará arquivada e disponível mediante solicitação.</p>

<h2>26. Encarregado (DPO) e Contato</h2>
<p>Nosso Encarregado de Proteção de Dados é:</p>
<ul class="policy-list">
  <li><strong>Nome:</strong> Diego André Martins</li>
  <li><strong>Cargo:</strong> Encarregado de Proteção de Dados / Data Protection Officer</li>
  <li><strong>E-mail dedicado:</strong> dpo@bloxtrade.global</li>
  <li><strong>Endereço:</strong> BLOXtrade LLC, 16192 Coastal Highway, Lewes, Delaware 19958, EUA</li>
  <li><strong>Contato geral de privacidade:</strong> privacy@bloxtrade.global</li>
</ul>
<p>O DPO está disponível para responder a dúvidas, solicitações e reclamações relacionadas ao tratamento de dados pessoais.</p>
`;

// Now create English and Spanish versions. I'll split this up so we don't blow the buffer in one go.
// To ensure it works, we append it to a file.
fs.writeFileSync('generate_pt.js', 'module.exports = ' + JSON.stringify(ptContent) + ';');
console.log('PT generated');
