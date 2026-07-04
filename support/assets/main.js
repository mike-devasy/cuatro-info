(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  if (!document.querySelector('[data-cuatro-wordmark-font]')) {
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css?family=Zalando+Sans+Expanded:900italic&display=swap';
    fontLink.dataset.cuatroWordmarkFont = '';
    document.head.append(fontLink);
  }
  const brandMarkup = `
    <img class="brand__symbol" src="assets/cuatro-logo-mark.svg" alt="" width="70" height="70">
    <span class="brand__wordmark"><span class="brand__cuatro">CUATRO</span><span class="brand__suffix">SUPPORT</span></span>`;
  document.querySelectorAll('.brand').forEach((brand) => {
    brand.innerHTML = brandMarkup;
    brand.setAttribute('aria-label', 'CuatroSupport');
  });
  const setTheme = (theme) => {
    root.dataset.theme = theme;
    if (themeToggle) { themeToggle.textContent = theme === 'dark' ? '☀' : '☾'; themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'); }
  };
  setTheme(localStorage.getItem('waterbed-theme') || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'));
  themeToggle?.addEventListener('click', () => { const next = root.dataset.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('waterbed-theme', next); setTheme(next); });
  const closeMenu = () => { menu?.classList.remove('is-open'); menuToggle?.setAttribute('aria-expanded', 'false'); menuToggle?.setAttribute('aria-label', 'Abrir menú'); };
  menuToggle?.addEventListener('click', () => { const open = !menu?.classList.contains('is-open'); menu?.classList.toggle('is-open', open); menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú'); });
  menuToggle?.setAttribute('aria-label', 'Abrir menú');
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  addEventListener('keydown', (event) => event.key === 'Escape' && closeMenu());
  const page = location.pathname.split('/').pop() || 'index.html';
  menu?.querySelectorAll('a').forEach((link) => link.getAttribute('href') === page && link.setAttribute('aria-current', 'page'));
  const footerMeta = document.querySelector('.footer-bottom');
  const companyPlaceholders = ['[COMPANY_NAME]', '[LEGAL_ENTITY_TYPE]', '[REGISTRATION_NUMBER]', '[REGISTERED_ADDRESS]', '[CONTACT_EMAIL]', '[PHONE_NUMBER]', '[COPYRIGHT_YEAR]'];
  const missingPlaceholders = companyPlaceholders.filter((value) => !footerMeta?.textContent.includes(value));
  if (footerMeta && missingPlaceholders.length) {
    const details = document.createElement('span');
    details.setAttribute('aria-label', 'Datos editables de la empresa');
    details.textContent = missingPlaceholders.join(' · ');
    footerMeta.append(details);
  }
  document.querySelectorAll('[data-contact-form]').forEach((form) => {
    const fields = [...form.querySelectorAll('[data-validate]')];
    const status = form.querySelector('[data-form-status]');
    const validate = (field) => {
      let message = '';
      const english = root.dataset.language === 'en';
      if (field.type === 'checkbox' ? !field.checked : !field.value.trim()) message = english ? 'This field is required.' : 'Este campo es obligatorio.';
      else if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) message = english ? 'Enter a valid email address.' : 'Introduce un correo electrónico válido.';
      field.setAttribute('aria-invalid', String(Boolean(message)));
      const error = field.closest('.field')?.querySelector('.field-error');
      if (error) error.textContent = message;
      return !message;
    };
    fields.forEach((field) => field.addEventListener('blur', () => validate(field)));
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!fields.map(validate).every(Boolean)) { status.textContent = root.dataset.language === 'en' ? 'Review the highlighted fields.' : 'Revisa los campos indicados.'; form.querySelector('[aria-invalid="true"]')?.focus(); return; }
      status.textContent = root.dataset.language === 'en' ? 'Enquiry recorded in this demo. Connect the form to your system to send it.' : 'Consulta registrada en esta demostración. Conecta el formulario con tu sistema para enviarla.';
      status.classList.add('success'); form.reset();
    });
  });

  const translations = {
    'Saltar al contenido': 'Skip to content', 'Inicio': 'Home', 'Compañía': 'Company', 'Servicios': 'Services', 'Casos': 'Case studies', 'Operaciones': 'Operations', 'Contactos': 'Contact', 'Hablar con un experto': 'Talk to an expert',
    'Soporte que tus clientes recuerdan por las razones correctas.': 'Support your customers remember for the right reasons.', 'Creamos y operamos equipos de soporte B2B que responden mejor, aprenden más rápido y representan tu marca con criterio.': 'We build and operate B2B support teams that respond better, learn faster and represent your brand with sound judgement.', 'Diseñar mi operación →': 'Design my operation →', 'Ver capacidades': 'View capabilities', 'Cola prioritaria': 'Priority queue', 'Operación estable': 'Stable operation', 'Cuenta estratégica · En curso': 'Strategic account · In progress', 'Consulta de integración': 'Integration enquiry', 'Soporte técnico · Respondido': 'Technical support · Answered', 'Revisión de acceso': 'Access review', 'Operaciones · Resuelto': 'Operations · Resolved', 'SLA cumplido': 'SLA achieved', 'CSAT objetivo': 'CSAT target', 'tiempo de respuesta': 'response time', 'Equipos SaaS': 'SaaS teams', 'Servicios profesionales': 'Professional services', 'Operaciones globales': 'Global operations',
    'La capa operativa que hace fácil confiar.': 'The operational layer that makes trust easy.', 'Desde la primera respuesta hasta la mejora del sistema completo, cubrimos personas, procesos y conocimiento.': 'From the first response to improving the whole system, we cover people, process and knowledge.', 'Soporte gestionado': 'Managed support', 'Equipos dedicados o compartidos, multicanal y alineados con tu tono y prioridades.': 'Dedicated or shared omnichannel teams aligned with your tone and priorities.', 'Onboarding, coordinación, renovaciones y tareas operativas que sostienen la relación.': 'Onboarding, coordination, renewals and operational work that supports the relationship.', 'Base de conocimiento, playbooks, calibración y mejora continua de calidad.': 'Knowledge base, playbooks, calibration and continuous quality improvement.', 'Objetivo SLA · últimos 30 días': 'SLA target · last 30 days', 'Diseñado para B2B': 'Built for B2B', 'Contexto humano. Disciplina operativa.': 'Human context. Operational discipline.', 'Tus clientes no son tickets. Nuestro modelo combina propiedad clara, acceso a contexto y una cadencia rigurosa de mejora.': 'Your customers are not tickets. Our model combines clear ownership, access to context and a rigorous improvement cadence.', 'Especialistas formados en tu producto': 'Specialists trained on your product', 'Escalados con criterios y responsables claros': 'Escalations with clear criteria and owners', 'Visibilidad semanal de riesgos y patrones': 'Weekly visibility into risks and patterns', 'Feedback que vuelve a producto y ventas': 'Feedback that returns to product and sales', 'Cómo pensamos': 'How we think', 'Una transición sin sobresaltos.': 'A smooth transition.', 'Ver operaciones': 'View operations', '01 / MAPEAR': '01 / MAP', 'Descubrimiento': 'Discovery', 'Volumen, canales, complejidad y expectativas.': 'Volume, channels, complexity and expectations.', '02 / DISEÑAR': '02 / DESIGN', 'Equipo, SLAs, herramientas y escalados.': 'Team, SLAs, tools and escalations.', '03 / ACTIVAR': '03 / ACTIVATE', 'Transición': 'Transition', 'Formación, shadowing y salida controlada.': 'Training, shadowing and a controlled launch.', '04 / MEJORAR': '04 / IMPROVE', 'Operación': 'Operation', 'QA, reporting y optimización continua.': 'QA, reporting and continuous optimisation.',
    'Impacto': 'Impact', 'Casos preparados para demostrar valor.': 'Cases ready to demonstrate value.', 'Sustituye estos ejemplos por datos verificados y testimonios aprobados.': 'Replace these examples with verified data and approved testimonials.', 'TIEMPO DE RESPUESTA': 'RESPONSE TIME', 'Una operación que escala con el producto': 'An operation that scales with the product', 'Rediseño de colas, playbooks y niveles de escalado.': 'Redesign of queues, playbooks and escalation levels.', 'SLA CUMPLIDO': 'SLA ACHIEVED', 'Consistencia en un entorno exigente': 'Consistency in a demanding environment', 'QA semanal y gestión de conocimiento centralizada.': 'Weekly QA and centralised knowledge management.', 'La experiencia como ventaja': 'Experience as an advantage', 'Onboarding gestionado y ownership por cuenta.': 'Managed onboarding and account ownership.', 'Hablemos de la operación que tus clientes necesitan.': 'Let\'s discuss the operation your customers need.', 'Agendar conversación →': 'Book a conversation →', 'Soporte B2B y operaciones de clientes diseñadas para proteger relaciones y hacer crecer la confianza.': 'B2B support and client operations designed to protect relationships and grow trust.',
    'Nosotros': 'About', 'Legal': 'Legal', 'Política de Privacidad': 'Privacy Policy', 'Términos de Uso': 'Terms of Use', 'Documentos': 'Documents', 'Tratamiento de Datos': 'Data Processing', 'Privacidad': 'Privacy', 'Términos': 'Terms',
    'Un equipo de operaciones con mentalidad de partner.': 'An operations team with a partner mindset.', 'Cuidar la relación y mejorar el sistema.': 'Protect the relationship and improve the system.', 'No medimos el éxito solo por cerrar conversaciones. Buscamos resolver bien, detectar patrones y evitar que el mismo problema vuelva.': 'We do not measure success by closing conversations alone. We solve well, spot patterns and prevent the same issue from returning.', 'Ownership de principio a fin': 'End-to-end ownership', 'Comunicación clara y empática': 'Clear, empathetic communication', 'Documentación como hábito': 'Documentation as a habit', 'Mejora basada en evidencia': 'Evidence-based improvement', 'Transparencia cuando algo falla': 'Transparency when something fails', 'Cerca del cliente': 'Close to the customer', 'El contexto importa tanto como la velocidad.': 'Context matters as much as speed.', 'Cerca del producto': 'Close to the product', 'El feedback útil vuelve al equipo que puede actuar.': 'Useful feedback returns to the team that can act.', 'Cerca del negocio': 'Close to the business', 'Prioridad y nivel de servicio siguen el valor y el riesgo.': 'Priority and service level follow value and risk.', 'Construyamos una función de soporte que dé confianza.': 'Let\'s build a support function that inspires confidence.', 'Conocernos →': 'Meet us →',
    'Personas, procesos y conocimiento alineados.': 'People, process and knowledge aligned.', 'Diseñamos una cobertura operativa que encaja con la complejidad, el volumen y la promesa de tu negocio.': 'We design operational coverage around the complexity, volume and promise of your business.', 'Soporte B2B gestionado': 'Managed B2B support', 'Correo, chat, portal y reuniones con equipos dedicados o compartidos.': 'Email, chat, portal and meetings with dedicated or shared teams.', 'Niveles L1 y L2': 'L1 and L2 coverage', 'Horarios configurables': 'Flexible schedules', 'SLAs por segmento': 'SLAs by segment', 'Procesos operativos que conectan soporte, success, ventas y finanzas.': 'Operational processes connecting support, success, sales and finance.', 'Gestión de acceso': 'Access management', 'Renovaciones y coordinación': 'Renewals and coordination', 'Contenido interno y externo que mejora consistencia y autoservicio.': 'Internal and external content that improves consistency and self-service.', 'Base de conocimiento': 'Knowledge base', 'Gobernanza editorial': 'Editorial governance', 'Evaluación, calibración y lectura de señales para mejorar la experiencia.': 'Evaluation, calibration and signal analysis to improve the experience.', 'QA y coaching': 'QA and coaching', 'Reporting ejecutivo': 'Executive reporting', 'Cobertura flexible': 'Flexible coverage', 'Empezar pequeño. Escalar con control.': 'Start small. Scale with control.', 'Piloto de 6–8 semanas': '6–8 week pilot', 'Equipo dedicado para cuentas estratégicas': 'Dedicated team for strategic accounts', 'Cobertura compartida para menor volumen': 'Shared coverage for lower volume', 'Refuerzo temporal para picos y lanzamientos': 'Temporary support for peaks and launches', 'Diseñemos el modelo adecuado para tu volumen.': 'Let\'s design the right model for your volume.', 'Solicitar propuesta →': 'Request a proposal →',
    'Resultados que se notan en cada conversación.': 'Results you can feel in every conversation.', 'Plantillas listas para incorporar clientes, métricas verificadas y testimonios aprobados.': 'Templates ready for clients, verified metrics and approved testimonials.', 'TIEMPO DE PRIMERA RESPUESTA': 'FIRST RESPONSE TIME', 'De una cola reactiva a una operación predecible': 'From a reactive queue to a predictable operation', 'Segmentación, nuevos escalados y base de conocimiento operativa.': 'Segmentation, new escalations and an operational knowledge base.', 'Calidad consistente bajo mayor volumen': 'Consistent quality at higher volume', 'Programa de QA, calibraciones y planificación de capacidad.': 'QA programme, calibrations and capacity planning.', 'Onboarding con ownership real': 'Onboarding with real ownership', 'Un responsable operativo y playbook por segmento de cliente.': 'An operational owner and playbook for each customer segment.', 'CONTACTOS REPETIDOS': 'REPEAT CONTACTS', 'Resolver la causa, no solo el caso': 'Solve the cause, not just the case', 'Análisis temático y feedback mensual hacia producto.': 'Thematic analysis and monthly feedback to product.', '¿Qué métrica de servicio debería cambiar primero?': 'Which service metric should change first?', 'Hablar del reto →': 'Discuss the challenge →',
    'Una transición controlada. Una mejora continua.': 'A controlled transition. Continuous improvement.', 'El proceso protege la experiencia actual mientras construye una forma mejor de operar.': 'The process protects the current experience while building a better way to operate.', '01 / DESCUBRIR': '01 / DISCOVER', 'Mapa operativo': 'Operational map', 'Datos, demanda, herramientas, roles, riesgos y expectativas.': 'Data, demand, tools, roles, risks and expectations.', '02 / DISEÑAR': '02 / DESIGN', 'Cobertura, SLAs, colas, escalados, QA y reporting.': 'Coverage, SLAs, queues, escalations, QA and reporting.', '03 / TRANSFERIR': '03 / TRANSFER', 'Documentación, formación, shadowing y certificación.': 'Documentation, training, shadowing and certification.', '04 / ACTIVAR': '04 / ACTIVATE', 'Salida gradual, control diario y plan de contingencia.': 'Gradual launch, daily control and contingency plan.', 'Diario': 'Daily', 'Gestión de colas, riesgos, bloqueos y escalados.': 'Queue, risk, blocker and escalation management.', 'Semanal': 'Weekly', 'QA, capacidad, temas emergentes y decisiones operativas.': 'QA, capacity, emerging themes and operational decisions.', 'Mensual': 'Monthly', 'Business review, tendencias, causas raíz y roadmap de mejora.': 'Business review, trends, root causes and improvement roadmap.', 'Gobernanza que mantiene a todos alineados.': 'Governance that keeps everyone aligned.', 'Métricas con definición común, responsables visibles y canales de escalado que funcionan también cuando algo se complica.': 'Metrics with shared definitions, visible owners and escalation channels that work when things get difficult.', 'RACI operativo': 'Operational RACI', 'Catálogo de SLAs': 'SLA catalogue', 'Registro de riesgos': 'Risk register', 'Plan de continuidad': 'Continuity plan', 'Roadmap de automatización': 'Automation roadmap', 'Planifica una transición sin perder calidad.': 'Plan a transition without losing quality.', 'Preparar el plan →': 'Prepare the plan →',
    'Cuéntanos cómo funciona hoy tu soporte.': 'Tell us how your support works today.', 'Con volumen aproximado, canales y principal reto podemos preparar una primera conversación útil.': 'With approximate volume, channels and your main challenge, we can prepare a useful first conversation.', 'Hablemos de clientes, capacidad y calidad.': 'Let\'s talk about customers, capacity and quality.', 'Respondemos habitualmente en uno o dos días laborables.': 'We usually reply within one or two business days.', 'Nombre y empresa': 'Name and company', 'Correo de trabajo': 'Work email', 'Volumen mensual aproximado': 'Approximate monthly volume', 'Menos de 500 conversaciones': 'Fewer than 500 conversations', 'Más de 10.000': 'More than 10,000', 'Aún no lo sabemos': 'We do not know yet', 'Principal reto': 'Main challenge', 'Acepto la': 'I accept the', 'Enviar consulta →': 'Send enquiry →',
    'Waterbed Support existe para que las empresas B2B puedan ofrecer una atención excelente sin perder foco en su producto.': 'Waterbed Support helps B2B companies deliver excellent service without losing focus on their product.'
  };
  const legalPages = new Set(['privacy-policy.html', 'terms-of-use.html', 'documents.html', 'personal-data-processing.html']);
  const i18nEntries = [];
  const i18nRoots = legalPages.has(page) ? [document.querySelector('.header'), document.querySelector('.footer')] : [document.body];
  let i18nIndex = 0;
  i18nRoots.filter(Boolean).forEach((scope) => {
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement?.closest('[data-language-switch], script, style')) continue;
      const source = node.nodeValue.trim().replace(/\s+/g, ' ');
      const translated = translations[source];
      if (!translated) continue;
      const leading = node.nodeValue.match(/^\s*/)?.[0] || '';
      const trailing = node.nodeValue.match(/\s*$/)?.[0] || '';
      node.parentElement?.setAttribute('data-i18n', `text-${i18nIndex++}`);
      i18nEntries.push({ node, es: `${leading}${source}${trailing}`, en: `${leading}${translated}${trailing}` });
    }
  });
  const languageSwitch = document.createElement('div');
  languageSwitch.className = 'language-switch';
  languageSwitch.dataset.languageSwitch = '';
  languageSwitch.setAttribute('role', 'group');
  languageSwitch.innerHTML = '<button type="button" data-language="es">ES</button><button type="button" data-language="en">EN</button>';
  themeToggle?.before(languageSwitch);
  const titles = { 'index.html': 'Waterbed Support — B2B Client Operations', 'about.html': 'Company — Waterbed Support', 'services.html': 'Services — Waterbed Support', 'portfolio.html': 'Case Studies — Waterbed Support', 'process.html': 'Operations — Waterbed Support', 'contact.html': 'Contact — Waterbed Support' };
  const spanishTitle = document.title;
  const syncLanguageControls = (language) => {
    const english = language === 'en';
    languageSwitch.setAttribute('aria-label', english ? 'Select language' : 'Seleccionar idioma');
    languageSwitch.querySelectorAll('button').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
    themeToggle?.setAttribute('aria-label', root.dataset.theme === 'dark' ? (english ? 'Activate light mode' : 'Activar modo claro') : (english ? 'Activate dark mode' : 'Activar modo oscuro'));
    menuToggle?.setAttribute('aria-label', menu?.classList.contains('is-open') ? (english ? 'Close menu' : 'Cerrar menú') : (english ? 'Open menu' : 'Abrir menú'));
  };
  const setLanguage = (language) => {
    const next = language === 'en' ? 'en' : 'es';
    root.lang = legalPages.has(page) ? 'es' : next;
    root.dataset.language = next;
    i18nEntries.forEach((entry) => {
      entry.node.nodeValue = entry[next];
      if (legalPages.has(page)) entry.node.parentElement?.setAttribute('lang', next);
    });
    if (!legalPages.has(page)) document.title = next === 'en' ? titles[page] : spanishTitle;
    localStorage.setItem('waterbed-language', next);
    syncLanguageControls(next);
  };
  languageSwitch.addEventListener('click', (event) => {
    const button = event.target.closest('[data-language]');
    if (button) setLanguage(button.dataset.language);
  });
  themeToggle?.addEventListener('click', () => queueMicrotask(() => syncLanguageControls(root.dataset.language)));
  menuToggle?.addEventListener('click', () => queueMicrotask(() => syncLanguageControls(root.dataset.language)));
  setLanguage(localStorage.getItem('waterbed-language') || 'es');
})();
