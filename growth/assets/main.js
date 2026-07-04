(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const brandMarkup = `
    <img class="brand__symbol" src="assets/cuatro-logo-mark.svg" alt="" width="70" height="70">
    <span class="brand__wordmark"><span class="brand__cuatro">CUATRO</span><span class="brand__growth">GROWTH</span></span>`;
  document.querySelectorAll('.brand').forEach((brand) => {
    brand.innerHTML = brandMarkup;
    brand.setAttribute('aria-label', 'CuatroGrowth');
  });
  const savedTheme = localStorage.getItem('waterbed-theme');
  const preferredTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    if (themeButton) {
      themeButton.setAttribute('aria-label', theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro');
      themeButton.textContent = theme === 'dark' ? '☀' : '◐';
    }
  };

  setTheme(savedTheme || preferredTheme);
  themeButton?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('waterbed-theme', nextTheme);
    setTheme(nextTheme);
  });

  const closeMenu = () => {
    menu?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menú');
    document.body.classList.remove('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    const open = !menu?.classList.contains('is-open');
    menu?.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('menu-open', open);
  });
  menuButton?.setAttribute('aria-label', 'Abrir menú');
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  addEventListener('keydown', (event) => event.key === 'Escape' && closeMenu());

  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-menu] a').forEach((link) => {
    if (link.getAttribute('href') === currentPage) link.setAttribute('aria-current', 'page');
  });

  const footerMeta = document.querySelector('.footer__bottom');
  const companyPlaceholders = ['[COMPANY_NAME]', '[LEGAL_ENTITY_TYPE]', '[REGISTRATION_NUMBER]', '[REGISTERED_ADDRESS]', '[CONTACT_EMAIL]', '[PHONE_NUMBER]', '[COPYRIGHT_YEAR]'];
  const missingPlaceholders = companyPlaceholders.filter((value) => !footerMeta?.textContent.includes(value));
  if (footerMeta && missingPlaceholders.length) {
    const details = document.createElement('span');
    details.setAttribute('aria-label', 'Datos editables de la empresa');
    details.textContent = missingPlaceholders.join(' · ');
    footerMeta.append(details);
  }

  document.querySelectorAll('[data-contact-form]').forEach((form) => {
    const status = form.querySelector('[data-form-status]');
    const fields = [...form.querySelectorAll('[data-validate]')];
    const validate = (field) => {
      const wrapper = field.closest('.field');
      const error = wrapper?.querySelector('.field__error');
      let message = '';
      const english = root.dataset.language === 'en';
      if (field.type === 'checkbox' && !field.checked) message = english ? 'Confirm that you accept the Privacy Policy.' : 'Confirma que aceptas la política de privacidad.';
      else if (!field.value.trim()) message = english ? 'This field is required.' : 'Este campo es obligatorio.';
      else if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) message = english ? 'Enter a valid email address.' : 'Introduce un correo electrónico válido.';
      field.setAttribute('aria-invalid', String(Boolean(message)));
      if (error) error.textContent = message;
      return !message;
    };
    fields.forEach((field) => field.addEventListener('blur', () => validate(field)));
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const valid = fields.map(validate).every(Boolean);
      if (!valid) {
        status.textContent = root.dataset.language === 'en' ? 'Review the highlighted fields.' : 'Revisa los campos marcados.';
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }
      status.textContent = root.dataset.language === 'en' ? 'Thank you. Your message is ready to connect to your form service.' : 'Gracias. Tu mensaje está listo para conectarse a tu servicio de formularios.';
      status.classList.add('is-success');
      form.reset();
    });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible'));
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
  }

  const translations = {
    'Saltar al contenido': 'Skip to content', 'Inicio': 'Home', 'Nosotros': 'About', 'Servicios': 'Services', 'Casos': 'Case studies', 'Proceso': 'Process', 'Contactos': 'Contact', 'Hablemos': 'Let\'s talk',
    'Growth partner independiente': 'Independent growth partner', 'Crecimiento con una idea clara detrás.': 'Growth powered by a clear idea.', 'Unimos estrategia, creatividad y performance para convertir atención en resultados que se pueden medir.': 'We bring strategy, creativity and performance together to turn attention into measurable results.', 'Planificar el próximo sprint →': 'Plan the next sprint →', 'Ver casos': 'View case studies', 'crecimiento medio en pipeline': 'average pipeline growth', 'retorno objetivo de campañas': 'target campaign return', '12 sem.': '12 wks.', 'de estrategia a escala': 'from strategy to scale',
    'Estrategia': 'Strategy', 'Qué hacemos': 'What we do', 'Un sistema, no acciones aisladas.': 'One system, not isolated tactics.', 'Diseñamos el motor completo: adquisición, conversión y retención trabajando con una misma señal de negocio.': 'We design the complete engine: acquisition, conversion and retention working from one business signal.', '01 / Estrategia': '01 / Strategy', 'Diagnóstico, propuesta de valor, objetivos y roadmap priorizado para crecer con foco.': 'Diagnosis, value proposition, goals and a prioritised roadmap for focused growth.', 'Explorar servicio →': 'Explore service →', '02 / Adquisición': '02 / Acquisition', 'Campañas, audiencias y creatividades conectadas a métricas comerciales reales.': 'Campaigns, audiences and creative connected to real commercial metrics.', '03 / Conversión': '03 / Conversion', 'Experimentación CRO': 'CRO experimentation', 'Landing pages, journeys y pruebas rápidas que transforman tráfico en demanda.': 'Landing pages, journeys and rapid tests that turn traffic into demand.',
    'Más señal.': 'More signal.', 'Menos ruido.': 'Less noise.', 'Últimos 90 días': 'Last 90 days', 'Por qué Waterbed': 'Why Waterbed', 'Nos obsesiona la calidad de la decisión.': 'We care deeply about decision quality.', 'No acumulamos entregables. Creamos una lectura compartida del negocio y actuamos sobre lo que mueve la aguja.': 'We do not pile up deliverables. We create a shared view of the business and act on what moves the needle.', 'Equipo senior cerca del trabajo diario': 'Senior team close to the daily work', 'Reporting claro, sin métricas de vanidad': 'Clear reporting without vanity metrics', 'Ritmo semanal de hipótesis y aprendizaje': 'A weekly rhythm of hypotheses and learning', 'Capacidad flexible según cada etapa': 'Flexible capacity for every stage', 'Conocer al equipo': 'Meet the team',
    'Cómo trabajamos': 'How we work', 'De la claridad a la escala.': 'From clarity to scale.', 'Ver el proceso': 'View the process', 'Diagnóstico': 'Diagnosis', 'Entendemos negocio, datos, cliente y restricciones antes de proponer.': 'We understand the business, data, customer and constraints before proposing.', 'Diseño del sistema': 'System design', 'Priorizamos canales, mensajes, journeys y medición en un roadmap común.': 'We prioritise channels, messages, journeys and measurement in one roadmap.', 'Lanzamos, aprendemos y mejoramos cada semana con dueños claros.': 'We launch, learn and improve every week with clear owners.', 'Escala': 'Scale', 'Invertimos más donde hay señal y documentamos lo que funciona.': 'We invest more where there is signal and document what works.',
    'Trabajo seleccionado': 'Selected work', 'Resultados listos para contar.': 'Results worth sharing.', 'Bloques preparados para sustituir por casos reales, métricas verificadas y testimonios aprobados.': 'Ready to replace with real cases, verified metrics and approved testimonials.', 'De demanda dispersa a pipeline predecible': 'From scattered demand to predictable pipeline', '+62% oportunidades cualificadas': '+62% qualified opportunities', 'Una nueva lógica para convertir mejor': 'A new approach to better conversion', '1.8x tasa de conversión': '1.8x conversion rate', 'Retención diseñada desde el primer día': 'Retention designed from day one', '−24% churn temprano': '−24% early churn', '¿Hay una oportunidad de crecimiento sobre la mesa?': 'Is there a growth opportunity on the table?', 'Hagamos un plan →': 'Let\'s make a plan →', 'Agencia de crecimiento digital para equipos que necesitan convertir ambición en un sistema medible.': 'A digital growth agency for teams turning ambition into a measurable system.',
    'Explorar': 'Explore', 'Legal': 'Legal', 'Política de Privacidad': 'Privacy Policy', 'Términos de Uso': 'Terms of Use', 'Documentos': 'Documents', 'Tratamiento de Datos': 'Data Processing',
    'Pequeños por diseño. Grandes en implicación.': 'Small by design. Deeply involved.', 'Una extensión del equipo, no otra capa.': 'An extension of your team, not another layer.', 'Nacimos para evitar la distancia habitual entre quien piensa la estrategia y quien ejecuta el trabajo.': 'We were built to close the usual gap between strategic thinking and execution.', 'Claridad antes que volumen': 'Clarity before volume', 'Curiosidad respaldada por datos': 'Curiosity backed by data', 'Velocidad con responsabilidad': 'Speed with accountability', 'Relaciones transparentes': 'Transparent relationships', 'Principios': 'Principles', 'Cómo tomamos decisiones.': 'How we make decisions.', 'Negocio primero': 'Business first', 'La métrica correcta empieza por el objetivo comercial, no por el canal.': 'The right metric starts with the commercial goal, not the channel.', 'Aprender en público': 'Learn openly', 'Compartimos hipótesis, resultados y dudas para avanzar como un solo equipo.': 'We share hypotheses, results and doubts so we can move as one team.', 'Construir capacidad': 'Build capability', 'Dejamos sistemas y conocimiento que siguen funcionando cuando termina el proyecto.': 'We leave systems and knowledge that keep working after the project ends.', 'Conoce cómo encajaría nuestro equipo en el tuyo.': 'See how our team could fit into yours.', 'Iniciar conversación →': 'Start a conversation →', 'Growth para equipos con ambición y foco.': 'Growth for ambitious, focused teams.',
    'Capacidades conectadas a un resultado.': 'Capabilities connected to an outcome.', 'Entramos donde está el cuello de botella y diseñamos un sistema que el equipo pueda sostener.': 'We enter where the bottleneck is and design a system the team can sustain.', 'Estrategia de crecimiento': 'Growth strategy', 'Diagnóstico, research, posicionamiento, objetivos, forecasting y roadmap de oportunidades.': 'Diagnosis, research, positioning, goals, forecasting and opportunity roadmap.', 'Plan de medios, paid social, paid search, audiencias, creatividades y optimización.': 'Media planning, paid social, paid search, audiences, creative and optimisation.', 'Sistema de conceptos, producción ágil, mensajes y aprendizaje creativo continuo.': 'A system for concepts, agile production, messaging and continuous creative learning.', 'CRO y journeys': 'CRO and journeys', 'Auditoría, landing pages, experimentos, analytics y mejoras de conversión.': 'Audits, landing pages, experiments, analytics and conversion improvements.', 'Lifecycle y retención': 'Lifecycle and retention', 'Onboarding, automatizaciones, CRM, segmentación y reducción de churn.': 'Onboarding, automation, CRM, segmentation and churn reduction.', 'Medición y reporting': 'Measurement and reporting', 'Arquitectura de eventos, dashboards y una cadencia de decisión útil.': 'Event architecture, dashboards and a useful decision cadence.', 'Modelos de colaboración': 'Ways to work together', 'La forma sigue al problema.': 'The model follows the problem.', 'Sprint de diagnóstico — 2 a 4 semanas': 'Diagnosis sprint — 2 to 4 weeks', 'Proyecto de aceleración — 8 a 12 semanas': 'Acceleration project — 8 to 12 weeks', 'Growth partner — colaboración continua': 'Growth partner — ongoing collaboration', 'Equipo especialista — refuerzo temporal': 'Specialist team — temporary support', 'Cuéntanos dónde se frena hoy el crecimiento.': 'Tell us where growth is slowing down.', 'Solicitar diagnóstico →': 'Request a diagnosis →', 'Estrategia, creatividad y performance en un solo sistema.': 'Strategy, creativity and performance in one system.',
    'El trabajo se entiende mejor con resultados.': 'The work is clearer through results.', 'Estructuras representativas listas para incorporar clientes, cifras y testimonios aprobados.': 'Representative layouts ready for approved clients, figures and testimonials.', 'Rediseño del motor de demanda': 'Redesigning the demand engine', 'De campañas fragmentadas a un pipeline medible en doce semanas.': 'From fragmented campaigns to a measurable pipeline in twelve weeks.', 'Conversión con intención': 'Conversion with intent', 'Nueva arquitectura de landing, oferta y sistema de experimentación.': 'A new landing architecture, offer and experimentation system.', 'Suscripción': 'Subscription', 'Un onboarding que retiene': 'Onboarding that retains', 'Segmentación conductual y mensajes activados por momentos clave.': 'Behavioural segmentation and messages triggered at key moments.', 'Escala sin perder eficiencia': 'Scale without losing efficiency', 'Testing creativo y reasignación semanal de inversión por señal.': 'Creative testing and weekly budget reallocation based on signal.', '¿Quieres que el próximo caso sea el tuyo?': 'Want the next case to be yours?', 'Empezar →': 'Get started →',
    'Ritmo, foco y aprendizaje compartido.': 'Rhythm, focus and shared learning.', 'Un proceso visible que reduce incertidumbre y convierte estrategia en movimiento.': 'A visible process that reduces uncertainty and turns strategy into action.', 'Descubrir': 'Discover', 'Kickoff, acceso a datos, entrevistas y definición del problema correcto.': 'Kickoff, data access, interviews and definition of the right problem.', 'Alinear': 'Align', 'Objetivos, indicadores, prioridades, responsabilidades y plan de 90 días.': 'Goals, indicators, priorities, responsibilities and a 90-day plan.', 'Construir': 'Build', 'Activos, campañas, journeys y medición listos para aprender rápido.': 'Assets, campaigns, journeys and measurement built for rapid learning.', 'Experimentar': 'Experiment', 'Hipótesis semanales, lectura de señal y decisiones documentadas.': 'Weekly hypotheses, signal reading and documented decisions.', 'Escalar': 'Scale', 'Más recursos para lo que funciona; pausa honesta para lo que no.': 'More resources for what works; an honest pause for what does not.', 'Cada semana': 'Every week', 'Stand-up operativo, tablero de experimentos y actualización de métricas.': 'Operational stand-up, experiment board and metric updates.', 'Cada mes': 'Every month', 'Revisión de aprendizajes, presupuesto y nuevas prioridades.': 'Review of learning, budget and new priorities.', 'Cada trimestre': 'Every quarter', 'Decisión estratégica: consolidar, rediseñar o abrir el siguiente frente.': 'Strategic decision: consolidate, redesign or open the next front.', 'Un buen proceso debe hacer el trabajo más ligero.': 'A good process should make the work lighter.', 'Hablar del reto →': 'Discuss the challenge →',
    'Cuéntanos qué quieres mover.': 'Tell us what you want to move.', 'Comparte el contexto, el objetivo y el principal bloqueo. Respondemos en uno o dos días laborables.': 'Share the context, goal and main blocker. We reply within one or two business days.', 'Empecemos con una conversación útil.': 'Let\'s start with a useful conversation.', 'No hace falta tener un briefing perfecto. Nos basta con saber dónde estás y qué debería cambiar.': 'You do not need a perfect brief. We only need to know where you are and what should change.', 'Nombre y empresa': 'Name and company', 'Correo electrónico': 'Email address', 'Área de interés': 'Area of interest', 'Otro': 'Other', '¿Qué debería cambiar?': 'What should change?', 'He leído y acepto la': 'I have read and accept the', 'Enviar consulta →': 'Send enquiry →',
    'Waterbed Growth reúne estrategia, media, creatividad y datos en un equipo senior que trabaja cerca de cada decisión.': 'Waterbed Growth brings strategy, media, creativity and data together in a senior team close to every decision.'
  };

  const legalPages = new Set(['privacy-policy.html', 'terms-of-use.html', 'documents.html', 'personal-data-processing.html']);
  const i18nEntries = [];
  const i18nRoots = legalPages.has(currentPage) ? [document.querySelector('.site-header'), document.querySelector('.site-footer')] : [document.body];
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
  themeButton?.before(languageSwitch);

  const titles = { 'index.html': 'Waterbed Growth — Digital Growth Agency', 'about.html': 'About — Waterbed Growth', 'services.html': 'Services — Waterbed Growth', 'portfolio.html': 'Case Studies — Waterbed Growth', 'process.html': 'Process — Waterbed Growth', 'contact.html': 'Contact — Waterbed Growth' };
  const syncLanguageControls = (language) => {
    const english = language === 'en';
    languageSwitch.setAttribute('aria-label', english ? 'Select language' : 'Seleccionar idioma');
    languageSwitch.querySelectorAll('button').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
    themeButton?.setAttribute('aria-label', root.dataset.theme === 'dark' ? (english ? 'Activate light mode' : 'Activar modo claro') : (english ? 'Activate dark mode' : 'Activar modo oscuro'));
    menuButton?.setAttribute('aria-label', menu?.classList.contains('is-open') ? (english ? 'Close menu' : 'Cerrar menú') : (english ? 'Open menu' : 'Abrir menú'));
  };
  const setLanguage = (language) => {
    const next = language === 'en' ? 'en' : 'es';
    root.lang = legalPages.has(currentPage) ? 'es' : next;
    root.dataset.language = next;
    i18nEntries.forEach((entry) => {
      entry.node.nodeValue = entry[next];
      if (legalPages.has(currentPage)) entry.node.parentElement?.setAttribute('lang', next);
    });
    if (!legalPages.has(currentPage)) document.title = next === 'en' ? titles[currentPage] : spanishTitle;
    localStorage.setItem('waterbed-language', next);
    syncLanguageControls(next);
  };
  const spanishTitle = document.title;
  languageSwitch.addEventListener('click', (event) => {
    const button = event.target.closest('[data-language]');
    if (button) {
      setLanguage(button.dataset.language);
      if (button.dataset.language === 'es') document.title = spanishTitle;
    }
  });
  themeButton?.addEventListener('click', () => queueMicrotask(() => syncLanguageControls(root.dataset.language)));
  menuButton?.addEventListener('click', () => queueMicrotask(() => syncLanguageControls(root.dataset.language)));
  setLanguage(localStorage.getItem('waterbed-language') || 'es');
})();
