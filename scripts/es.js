const esContent = `
<h2>1. Introducción</h2>
<p>BLOXtrade LLC es una empresa de tecnología financiera especializada en pagos internacionales, cambio de divisas, conversión de monedas estables (stablecoins) y soluciones de tesorería. Operamos como una Empresa de Servicios Monetarios (MSB), sujeta a regulación financiera en múltiples jurisdicciones.</p>
<p>Esta Política de Privacidad (v1.0) incorpora los requisitos de: el Reglamento General de Protección de Datos (GDPR, UE 2016/679); UK GDPR y PECR; la Ley de Privacidad del Consumidor de California (CCPA/CPRA); la Ley Gramm-Leach-Bliley (GLBA, EE. UU.); la Ley General de Protección de Datos de Brasil (LGPD, Ley Nº 13.709/2018); Recomendaciones FATF/GAFI para VASPs; y otras leyes aplicables en las jurisdicciones en las que operamos.</p>
<div class="legal-alert info">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
  <div><strong>NOTA:</strong> Esta política utiliza lenguaje que atiende simultáneamente al titular persona física (consumidor) y al representante de persona jurídica (cliente B2B). Donde exista distinción relevante, se hará explícita.</div>
</div>

<h2 id="definicoes">2. Definiciones</h2>
<p>Para los fines de esta Política:</p>
<ul class="legal-list">
  <li><strong>Datos Personales:</strong> cualquier información relativa a una persona física identificada o identificable.</li>
  <li><strong>Datos Personales Sensibles:</strong> datos sobre origen racial o étnico, convicción religiosa, opinión política, salud, vida sexual, datos genéticos o datos biométricos.</li>
  <li><strong>Titular de los Datos:</strong> la persona física a quien se refieren los datos.</li>
  <li><strong>Controlador:</strong> BLOXtrade LLC — determina los fines y medios del tratamiento.</li>
  <li><strong>Procesador/Operador:</strong> entidad que procesa datos en nombre del Controlador, bajo instrucción documentada.</li>
  <li><strong>DPO/Encargado de Protección de Datos:</strong> la persona responsable de la protección de datos, que sirve como punto de contacto entre los titulares de los datos, el Controlador y la autoridad de supervisión.</li>
  <li><strong>VASP:</strong> Proveedor de Servicios de Activos Virtuales — empresa que presta intermediación, custodia o emisión de criptoactivos.</li>
  <li><strong>Travel Rule:</strong> obligación FATF/GAFI (Recomendación 16) que requiere la transmisión de datos del remitente y beneficiario entre VASPs en transacciones superiores a USD 1,000.</li>
  <li><strong>Seudonimización:</strong> tratamiento que impide la atribución de datos a un titular específico sin el uso de información adicional mantenida por separado.</li>
  <li><strong>Anonimización:</strong> proceso irreversible por el cual el dato pierde cualquier posibilidad de identificar al titular.</li>
</ul>

<h2 id="dados-coletados">3. Datos Personales Recopilados</h2>
<h3>3.1. Datos de Identificación</h3>
<ul class="legal-list">
  <li>Nombre completo, fecha de nacimiento, género, nacionalidad, país de residencia.</li>
  <li>Pasaporte, números de identificación fiscal (CPF/CNPJ, SSN), documento nacional de identidad, licencia de conducir y otros documentos oficiales.</li>
  <li>Fotografías faciales y selfies para verificación de identidad biométrica (KYC) — clasificados como datos sensibles.</li>
</ul>

<h3>3.2. Datos de Contacto</h3>
<ul class="legal-list">
  <li>Correo electrónico, número de teléfono, dirección física y postal, contacto de emergencia.</li>
</ul>

<h3>3.3. Datos Financieros y de Transacción</h3>
<ul class="legal-list">
  <li>Cuentas bancarias, datos de tarjetas de crédito, números de identificación fiscal, historial de transacciones financieras, montos, métodos de pago.</li>
  <li>Direcciones de billeteras digitales (wallets), detalles de ingresos y patrimonio.</li>
  <li>Contratos y documentos probatorios de transacciones; comprobante de origen de fondos (Source of Funds).</li>
</ul>

<h3>3.4. KYC/KYB y Datos de Cumplimiento</h3>
<ul class="legal-list">
  <li>Estructura corporativa, beneficiarios finales, registros corporativos.</li>
  <li>Revisión en listas de sanciones, PEPs (Personas Políticamente Expuestas) y medios adversos.</li>
</ul>

<h3>3.5. Datos Técnicos y de Uso</h3>
<ul class="legal-list">
  <li>Direcciones IP, identificadores de dispositivo, sistema operativo, tipo de navegador, registros (logs), datos de error.</li>
  <li>Datos de ubicación (GPS, Wi-Fi, historial), patrones de uso, duración de las sesiones, páginas visitadas, historial de ubicación.</li>
</ul>

<h3>3.6. Datos de Marketing y Cuenta</h3>
<ul class="legal-list">
  <li>Preferencias de marketing, suscripciones y boletines, nombre de usuario, foto de perfil y avatares, configuración de la cuenta, respuestas a campañas de marketing, interacción con materiales promocionales, fuentes de referencia.</li>
</ul>

<h3>3.7. Datos de Comunicación y Soporte</h3>
<ul class="legal-list">
  <li>Mensajes con nuestro equipo, tickets de soporte, notas de servicio, grabaciones de llamadas (con previo aviso).</li>
</ul>

<h3>3.8. Datos de Reclutamiento</h3>
<ul class="legal-list">
  <li>CV, referencias profesionales, notas de entrevistas — exclusivamente para candidatos a puestos de trabajo.</li>
</ul>

<h3>3.9. Datos de Empleados y Contratistas</h3>
<p>Recopilamos y procesamos datos de empleados y proveedores de servicios con el fin de gestionar la relación laboral o de servicios.</p>

<h2 id="fontes">4. Fuentes de Datos</h2>
<ul class="legal-list">
  <li>Directamente del titular de los datos: registro, transacciones, comunicaciones.</li>
  <li>Del empleador o representante legal (clientes corporativos/KYB).</li>
  <li>Socios de KYC/KYB, proveedores de verificación de identidad y proveedores de análisis de cumplimiento.</li>
  <li>Registros públicos, listas de sanciones, bases de datos judiciales, perfiles profesionales.</li>
  <li>Cookies y tecnologías similares.</li>
  <li>Proveedores de análisis y marketing (con consentimiento, donde sea requerido).</li>
</ul>

<h2 id="papeis">5. Roles: Controlador, Procesador y Registros</h2>
<p>Cuando determinamos los fines y medios del procesamiento (incorporación, cumplimiento, soporte), actuamos como Controlador. Cuando procesamos datos bajo instrucciones documentadas de un cliente (por ejemplo, procesamiento de pagos en nombre del cliente), actuamos como Procesador — regido por un Acuerdo de Procesamiento de Datos (DPA).</p>

<h2 id="finalidades">6. Propósitos del Uso de Datos</h2>
<ul class="legal-list">
  <li><strong>Incorporación y prestación de servicios.</strong></li>
  <li><strong>Cumplimiento AML/CFT, revisión de sanciones, KYC/KYB.</strong></li>
  <li><strong>Provisión y Mantenimiento de Servicios:</strong> Para garantizar la funcionalidad y disponibilidad de nuestros servicios.</li>
  <li><strong>Procesamiento de Pagos y Cumplimiento de Pedidos:</strong> Para procesar pagos y completar pedidos en cumplimiento con las reglas de transparencia y competitividad.</li>
  <li><strong>Prevención de Fraude:</strong> Para detectar y prevenir la pérdida de fondos, incluidas aquellas resultantes de fraudes y mal uso de nuestros servicios y aplicaciones.</li>
  <li><strong>Cumplimiento Legal y Normativo:</strong> Para garantizar el cumplimiento con las leyes y regulaciones aplicables, incluidas las normas de prevención de lavado de dinero y financiamiento del terrorismo.</li>
  <li><strong>Comunicación y Soporte al Usuario:</strong> Para comunicarnos directamente con usted o a través de nuestros socios para atención al cliente, notificaciones de cambios y actualizaciones del servicio, información importante relacionada con el servicio, marketing y promociones.</li>
  <li><strong>Medición y Análisis:</strong> Para comprender cómo interactúan los usuarios con nuestros servicios, analizar el comportamiento del usuario e identificar preferencias.</li>
  <li><strong>Seguridad:</strong> Para promover la seguridad e integridad de sus fondos, nuestros servicios y datos mediante medidas de protección y monitoreo continuo.</li>
  <li><strong>Gestión de Cuentas de Usuario:</strong> Para gestionar las cuentas de los usuarios, incluida la configuración, recuperación y terminación de la cuenta.</li>
  <li><strong>Personalización:</strong> Para adaptar las experiencias del usuario en base a preferencias y comportamientos, proporcionando contenido y recomendaciones personalizadas.</li>
</ul>

<h2 id="dados-sensiveis">7. Datos Personales Sensibles</h2>
<p>Lo siguiente constituye datos personales sensibles según el Art. 5, II de la LGPD y el Art. 9 del GDPR: datos relativos a origen racial o étnico, creencia religiosa, opinión política, afiliación sindical, salud o vida sexual, datos genéticos y datos biométricos cuando se usan para la identificación unívoca de una persona natural.</p>
<p>Como parte del proceso de KYC, BLOXtrade LLC puede, cuando sea necesario, recopilar datos biométricos (fotografías faciales y selfies) para verificación de identidad.</p>
<div class="legal-alert warning">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
  <div><strong>NOTA:</strong> No recopilamos datos sobre condiciones de salud, creencias religiosas u orientación sexual. En caso de que los documentos de identidad revelen incidentalmente datos sensibles en otras categorías, su procesamiento está limitado al propósito de verificación de identidad.</div>
</div>

<h2 id="consentimento">8. Gestión del Consentimiento</h2>
<p>Cuando el consentimiento es la base legal aplicable, seguimos estos principios:</p>
<ul class="legal-list">
  <li><strong>Recopilación:</strong> el consentimiento se obtiene mediante una declaración clara, específica y destacada en lenguaje sencillo, antes de iniciar el procesamiento. Usamos casillas de verificación (opt-in) desmarcadas por defecto (Privacy by Default).</li>
  <li><strong>Granularidad:</strong> el consentimiento se obtiene por separado para cada propósito (ej., marketing, cookies analíticas, cookies publicitarias). No se acepta el consentimiento genérico o agrupado.</li>
  <li><strong>Evidencia:</strong> cada consentimiento se registra con: marca de tiempo, versión de la política presentada, dirección IP e identificador de sesión, garantizando que la carga de la prueba recaiga en el Controlador.</li>
  <li><strong>Retirada:</strong> el consentimiento puede ser revocado en cualquier momento a través del portal de preferencias o enviando un correo a privacy@bloxtrade.global. La retirada no afecta la legalidad del procesamiento realizado antes de dicha retirada.</li>
  <li><strong>Rechazo y consecuencias:</strong> el rechazo del consentimiento para el procesamiento basado en contrato u obligación legal puede impedir la prestación del servicio; esto se comunicará claramente en el punto de recopilación. El rechazo para fines opcionales (como el marketing) no afecta el acceso al servicio principal.</li>
</ul>

<h2 id="decisao-automatizada">9. Toma de Decisiones Automatizada y Elaboración de Perfiles</h2>
<p>Utilizamos sistemas automatizados de apoyo a la toma de decisiones en las siguientes situaciones: (a) puntuación de riesgo de fraude en transacciones; (b) límites dinámicos de transacción basados en el perfil KYC; (c) revisión automática contra listas de sanciones y PEPs; (d) bloqueo preventivo de transacciones con patrones anómalos.</p>
<p>Ninguna de estas decisiones se toma exclusivamente por medios automatizados de una manera que produzca efectos legales o afecte significativamente al titular de los datos sin la posibilidad de revisión humana. En el caso de un bloqueo o restricción automática, el titular de los datos puede:</p>
<ul class="legal-list">
  <li>Solicitar revisión humana enviando un correo a privacy@bloxtrade.global con la identificación del caso.</li>
</ul>

<h2 id="finalidades-secundarias">10. Compatibilidad de Propósitos Secundarios</h2>
<p>El principio de limitación del propósito establece que los datos recopilados para un propósito específico solo pueden ser utilizados para un propósito diferente si: (a) el nuevo propósito es compatible con el original; (b) existe una nueva base legal adecuada; o (c) el titular de los datos ha otorgado su consentimiento explícito.</p>
<p>Para evaluar la compatibilidad, consideramos: la relación entre los propósitos originales y secundarios; la naturaleza de los datos (particularmente si son sensibles); las posibles consecuencias para el titular de los datos; y la existencia de salvaguardas adecuadas. Cuando no se pueda establecer compatibilidad, se requerirá una nueva base legal o consentimiento específico.</p>

<h2 id="compartilhamento">11. Intercambio de Datos Personales</h2>
<p>Podemos compartir su información con terceros para apoyar y mejorar nuestras operaciones comerciales, con las siguientes categorías de destinatarios, siempre bajo salvaguardas contractuales y de seguridad apropiadas:</p>
<ul class="legal-list">
  <li><strong>Afiliadas y subsidiarias:</strong> con fines operativos y de cumplimiento.</li>
  <li><strong>Proveedores y subprocesadores:</strong> alojamiento, KYC/KYB, análisis, soporte — bajo un Acuerdo de Procesamiento de Datos (DPA).</li>
  <li><strong>Instituciones financieras y redes de pago:</strong> según sea necesario para ejecutar transacciones y cumplir con obligaciones regulatorias.</li>
  <li><strong>Otros VASPs (Travel Rule):</strong> cuando lo exija la ley.</li>
  <li><strong>Asesores profesionales (auditores, abogados):</strong> bajo obligaciones de confidencialidad profesional.</li>
  <li><strong>Autoridades y reguladores:</strong> cuando lo exija la ley.</li>
  <li><strong>Socios de marketing y anunciantes:</strong> solo con consentimiento y para propósitos autorizados.</li>
  <li><strong>Transacciones corporativas (fusión, adquisición, insolvencia):</strong> con protecciones contractuales apropiadas.</li>
  <li><strong>Proveedores de servicios:</strong> Podemos compartir su información personal con proveedores de servicios para monitorear y analizar el uso de nuestro servicio y para contactarlo.</li>
  <li><strong>Transferencias comerciales:</strong> Podemos compartir o transferir su información personal en relación con, o durante las negociaciones de, cualquier fusión, venta de activos de la empresa, financiamiento o adquisición de todo o una parte de nuestro negocio por otra empresa.</li>
</ul>
<p><strong>No vendemos ni compartimos datos personales para publicidad comportamental entre contextos (cross-context behavioral advertising).</strong></p>

<h2 id="transferencias">12. Transferencias Internacionales de Datos</h2>
<p>Su información, incluidos los datos personales, es procesada en las oficinas operativas de la empresa y en cualquier otro lugar donde se encuentren las partes involucradas en el procesamiento. Esto significa que dicha información puede ser transferida a — y mantenida en — computadoras ubicadas fuera de su estado, provincia, país u otra jurisdicción gubernamental, donde las leyes de protección de datos pueden diferir de las de su jurisdicción. Su consentimiento a esta Política de Privacidad, seguido del envío de dicha información, representa su acuerdo a esa transferencia. La empresa tomará todas las medidas razonablemente necesarias para asegurar que sus datos sean tratados de forma segura y de acuerdo con esta Política de Privacidad, y no se realizará ninguna transferencia de sus datos personales a una organización o país a menos que existan controles adecuados establecidos, incluida la seguridad de sus datos y otra información personal.</p>

<h2 id="retencao">13. Retención de Datos</h2>
<p>Retenemos datos personales por el período estrictamente necesario para los fines para los que fueron recopilados, observando las obligaciones legales, regulatorias, contractuales y de auditoría. Los períodos de retención varían según la categoría de datos y la jurisdicción aplicable (generalmente de 5 a 7 años para registros financieros, según lo exija la ley).</p>

<h2 id="seguranca">14. Seguridad de los Datos</h2>
<p>Mantenemos un programa de seguridad de la información proporcional a nuestro perfil de riesgo, que incorpora medidas técnicas y organizativas para proteger su información personal contra el acceso, divulgación, alteración y destrucción no autorizados. Estas medidas incluyen:</p>
<ul class="legal-list">
  <li><strong>Capacitación:</strong> un programa anual de concientización sobre privacidad y seguridad para todo el personal; capacitación específica para equipos que manejan datos sensibles.</li>
  <li><strong>Copias de seguridad (Backups):</strong> copias periódicas con pruebas de restauración; almacenamiento aislado y cifrado.</li>
  <li><strong>Controles de Acceso:</strong> restricción del acceso a su información personal al personal autorizado con fines comerciales legítimos.</li>
  <li><strong>Respuesta a Incidentes:</strong> establecimiento de procedimientos de respuesta a incidentes para manejar y mitigar rápidamente cualquier incidente de seguridad.</li>
</ul>

<h2 id="cookies">15. Cookies y Tecnologías Similares</h2>
<h3>15.1. Tecnologías Utilizadas</h3>
<p>Utilizamos cookies, píxeles de seguimiento, web beacons, SDKs, identificadores de dispositivos y tecnologías similares en nuestros sitios web y plataformas.</p>
<h3>15.2. Cómo Gestionar sus Preferencias</h3>
<p>Al acceder a nuestro sitio web por primera vez, mostramos un banner de consentimiento (Plataforma de Gestión del Consentimiento — CMP) que le permite aceptar o rechazar categorías individuales de cookies. Puede cambiar sus preferencias en cualquier momento a través del enlace 'Gestionar Cookies' en el pie de página del sitio web o mediante el panel de configuración de su cuenta. En los estados de EE. UU. que reconocen señales universales de exclusión voluntaria (por ejemplo, Global Privacy Control — GPC), respetamos automáticamente esas señales.</p>

<h2 id="direitos">16. Sus Derechos como Titular de Datos</h2>
<p>Como usuario de nuestros servicios, usted tiene ciertos derechos con respecto a los datos personales que recopilamos y utilizamos. Estos derechos incluyen:</p>
<ul class="legal-list">
  <li><strong>Confirmación y Acceso:</strong> confirmar la existencia del procesamiento y obtener acceso a los datos que tenemos sobre usted.</li>
  <li><strong>Rectificación:</strong> corregir datos inexactos, incompletos o desactualizados.</li>
  <li><strong>Anonimización, Bloqueo o Eliminación:</strong> de datos innecesarios, excesivos o procesados ilegalmente.</li>
  <li><strong>Portabilidad:</strong> recibir datos en un formato estructurado e interoperable, para su transferencia a otro controlador.</li>
  <li><strong>Eliminación (Derecho al Olvido):</strong> eliminación de los datos procesados con base en el consentimiento, sujeto a obligaciones legales.</li>
  <li><strong>Retirada del Consentimiento:</strong> revocar el consentimiento en cualquier momento.</li>
  <li><strong>Revisión de la Toma de Decisiones Automatizada:</strong> solicitar la revisión humana de las decisiones automatizadas que afecten sus intereses.</li>
  <li><strong>Exclusión voluntaria (Opt-out) de Marketing Directo:</strong> oponerse a recibir comunicaciones de marketing y que su solicitud sea procesada.</li>
  <li><strong>No Discriminación:</strong> ejercer cualquiera de los derechos mencionados sin sufrir un trato discriminatorio.</li>
</ul>

<h2 id="reclamacoes">17. Canal Interno de Quejas</h2>
<p>Para asegurar la resolución rápida de solicitudes, los titulares de datos tienen acceso a un canal interno para quejas y solicitudes.</p>
<ul class="legal-list">
  <li>Envíe su queja al DPO a través del correo privacy@bloxtrade.global con el asunto 'QUEJA DE PRIVACIDAD' ('PRIVACY COMPLAINT').</li>
</ul>

<h2 id="limitacoes">18. Limitaciones en el Ejercicio de los Derechos</h2>
<p>Como proveedor de servicios financieros regulados, ciertas obligaciones pueden limitar nuestra capacidad para cumplir con las solicitudes:</p>
<ul class="legal-list">
  <li><strong>AML/CFT:</strong> los datos de transacciones e identificación deben conservarse para cumplir con las normas de prevención de lavado de dinero y financiamiento del terrorismo, así como para la elaboración de Informes de Actividades Sospechosas (SARs).</li>
  <li><strong>Registros financieros:</strong> las leyes aplicables exigen la preservación de los registros por períodos mínimos (de 5 a 7 años dependiendo de la jurisdicción).</li>
  <li><strong>Prevención de fraudes:</strong> los datos pueden ser retenidos para la detección y prevención de actividades fraudulentas.</li>
  <li><strong>Órdenes judiciales y regulatorias:</strong> cuando una autoridad competente haya emitido una orden, es posible que no podamos eliminar o proporcionar acceso a ciertos datos.</li>
</ul>

<h2 id="funcionarios">19. Datos de Empleados y Contratistas</h2>
<p>BLOXtrade LLC procesa datos de empleados, pasantes y proveedores de servicios para fines de gestión de la relación laboral o de servicios. Las categorías incluyen: datos de identificación, contacto y remuneración; antecedentes profesionales y académicos; evaluaciones de desempeño; datos de beneficios y salud ocupacional (donde sea requerido legalmente); registros de acceso a sistemas; registros de tiempo y productividad.</p>
<p>Período de retención: duración de la relación + 5 años (obligaciones laborales/tributarias). Los datos de candidatos no seleccionados se retienen hasta por 2 años con su consentimiento, para futuros procesos de selección.</p>

<h2 id="menores">20. Protección de Menores</h2>
<p>Nuestros servicios están destinados exclusivamente a personas mayores de 18 (dieciocho) años, o a personas que, en el país de residencia del usuario, puedan ser consideradas legalmente responsables de sus actos. Implementamos los siguientes mecanismos de protección:</p>
<ul class="legal-list">
  <li><strong>Verificación de edad:</strong> el proceso KYC incluye la verificación de la fecha de nacimiento y del documento oficial de identidad.</li>
  <li><strong>Protección diferenciada:</strong> en caso de identificarse el registro de un niño (menor de 12 años) o adolescente (entre 12 y 18 años), tomaremos las siguientes medidas: (a) cancelación inmediata del registro; (b) eliminación de todos los datos personales recopilados.</li>
  <li><strong>Consentimiento de los padres:</strong> en caso de que nuestra plataforma se adapte para incluir a usuarios menores de 18 años en el futuro, se requerirá el consentimiento de los padres o tutores legales, con un proceso verificable.</li>
</ul>
<p>Si cree que hemos recopilado datos de un menor, contáctenos inmediatamente a privacy@bloxtrade.global.</p>

<h2 id="anonimizacao">21. Anonimización y Seudonimización</h2>
<p>Adoptamos técnicas de anonimización y seudonimización como medidas de seguridad y mitigación de riesgos:</p>
<ul class="legal-list">
  <li><strong>Seudonimización:</strong> utilizada en entornos analíticos, de desarrollo y de pruebas — los identificadores directos (nombre, identificación fiscal, correo electrónico) son reemplazados por identificadores sintéticos, mantenidos por separado bajo el control del Controlador. Los datos seudonimizados siguen sujetos a la legislación de protección de datos, ya que la reidentificación es técnicamente posible utilizando la clave que se guarda por separado.</li>
  <li><strong>Anonimización:</strong> al final del período de retención, o para fines exclusivamente estadísticos o de investigación, los datos pueden ser anonimizados irreversiblemente, haciendo imposible identificar al titular de los datos. Los datos genuinamente anonimizados no están sujetos a las obligaciones de protección de datos personales.</li>
</ul>

<h2 id="subprocessadores">22. Subprocesadores</h2>
<p>Utilizamos subprocesadores para apoyar la prestación de nuestros servicios. Principales categorías y ejemplos:</p>
<div class="table-responsive">
  <table class="legal-table">
    <thead>
      <tr>
        <th>Categoría</th>
        <th>Ejemplos de Servicios</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Infraestructura en la Nube</td>
        <td>Servidores, almacenamiento, CDN</td>
      </tr>
      <tr>
        <td>KYC / Verificación de Identidad</td>
        <td>Verificación facial, validación de documentos</td>
      </tr>
      <tr>
        <td>Análisis y Monitoreo</td>
        <td>Análisis de comportamiento, registros (logs)</td>
      </tr>
      <tr>
        <td>Comunicaciones y Soporte</td>
        <td>Correo electrónico, chat, CRM</td>
      </tr>
      <tr>
        <td>Cumplimiento AML/CFT</td>
        <td>Revisión de sanciones, PEPs, medios adversos</td>
      </tr>
      <tr>
        <td>Procesamiento de Pagos</td>
        <td>Enrutamiento, liquidación, cambio de divisas</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="governanca">23. Programa de Gobernanza de Privacidad</h2>
<p>El cumplimiento de esta Política está respaldado por un programa estructurado de gobernanza de privacidad. Esta Política se revisa anualmente o siempre que haya un cambio legislativo relevante, una nueva actividad de procesamiento de alto riesgo o un incidente de seguridad significativo.</p>

<h2 id="transferencia-internacional">24. Marco Global — Transferencias Internacionales de Datos</h2>
<p><strong>24.1</strong> Como Empresa de Servicios Monetarios registrada en el Estado de Delaware, Estados Unidos, y con operaciones globales, BLOXtrade puede llevar a cabo transferencias internacionales de datos personales recopilados. Al utilizar las Plataformas y aceptar esta Política, el Titular de los Datos reconoce y, cuando lo exija la ley aplicable, consiente dicha transferencia internacional de datos, para los fines descritos en este documento y en cumplimiento con las normas aplicables de protección de datos.</p>
<p><strong>24.2</strong> Para garantizar la protección, seguridad y cumplimiento normativo de los datos personales procesados en nuestras Plataformas, BLOXtrade adopta un marco de gobernanza integrado compatible con las jurisdicciones en las que opera y con la legislación aplicable de protección de datos.</p>

<h2 id="alteracoes">25. Cambios en Esta Política</h2>
<p>Esta Política puede ser actualizada periódicamente para reflejar cambios legislativos, nuevas actividades de procesamiento o mejoras en la transparencia. Los cambios materiales y significativos serán notificados a través de nuestros canales de comunicación y publicados en esta página. Recomendamos su revisión periódica. La versión anterior será archivada y estará disponible a pedido.</p>

<h2 id="contato">26. Encargado de Protección de Datos (DPO) y Contacto</h2>
<p>Nuestro Encargado de Protección de Datos (DPO, de acuerdo con el Art. 41 de la LGPD y el Art. 37 del GDPR) es:</p>
<p><strong>Nombre:</strong> Diego André Martins<br>
<strong>Cargo:</strong> Encargado de Protección de Datos (Data Protection Officer)<br>
<strong>Correo electrónico dedicado:</strong> dpo@bloxtrade.global<br>
<strong>Dirección:</strong> BLOXtrade LLC, 16192 Coastal Highway, Lewes, Delaware 19958, EE. UU.<br>
<strong>Contacto general de privacidad:</strong> privacy@bloxtrade.global</p>
<p>El DPO está disponible para responder a preguntas, solicitudes y quejas relacionadas con el procesamiento de datos personales.</p>
`;
module.exports = esContent;
