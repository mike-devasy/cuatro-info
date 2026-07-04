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
    <span class="brand__wordmark"><span class="brand__cuatro">CUATRO</span><span class="brand__suffix">STUDIO</span></span>`;
  document.querySelectorAll('.logo').forEach((logo) => {
    logo.innerHTML = brandMarkup;
    logo.setAttribute('aria-label', 'CuatroStudio');
  });
  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (themeToggle) {
      themeToggle.textContent = theme === 'dark' ? 'LIGHT' : 'DARK';
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro');
    }
  };
  applyTheme(localStorage.getItem('waterbed-theme') || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'));
  themeToggle?.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('waterbed-theme', theme);
    applyTheme(theme);
  });
  const closeMenu = () => { menu?.classList.remove('open'); menuToggle?.setAttribute('aria-expanded', 'false'); menuToggle?.setAttribute('aria-label', 'Abrir menú'); };
  menuToggle?.addEventListener('click', () => {
    const open = !menu?.classList.contains('open');
    menu?.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  menuToggle?.setAttribute('aria-label', 'Abrir menú');
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  addEventListener('keydown', (event) => event.key === 'Escape' && closeMenu());
  const page = location.pathname.split('/').pop() || 'index.html';
  menu?.querySelectorAll('a').forEach((link) => link.getAttribute('href') === page && link.setAttribute('aria-current', 'page'));
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
    const fields = [...form.querySelectorAll('[data-validate]')];
    const status = form.querySelector('[data-form-status]');
    const validate = (field) => {
      let error = '';
      const english = root.dataset.language === 'en';
      if (field.type === 'checkbox' ? !field.checked : !field.value.trim()) error = english ? 'Required field.' : 'Campo obligatorio.';
      else if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) error = english ? 'Enter a valid email address.' : 'Escribe un correo válido.';
      field.setAttribute('aria-invalid', String(Boolean(error)));
      const output = field.closest('.field')?.querySelector('.error');
      if (output) output.textContent = error;
      return !error;
    };
    fields.forEach((field) => field.addEventListener('blur', () => validate(field)));
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!fields.map(validate).every(Boolean)) { status.textContent = root.dataset.language === 'en' ? 'Review the highlighted fields.' : 'Revisa los campos marcados.'; form.querySelector('[aria-invalid="true"]')?.focus(); return; }
      status.textContent = root.dataset.language === 'en' ? 'Message ready. Connect the form to your provider to send it.' : 'Mensaje preparado. Conecta el formulario con tu proveedor para enviarlo.';
      status.className = 'form-status success';
      form.reset();
    });
  });

  const translations = {
    'Saltar al contenido': 'Skip to content', 'Inicio': 'Home', 'Estudio': 'Studio', 'Servicios': 'Services', 'Trabajo': 'Work', 'Proceso': 'Process', 'Contactos': 'Contact', 'Nuevo proyecto': 'New project',
    'Creamos marcas, productos digitales y campañas que se sienten claras, actuales y completamente propias.': 'We create brands, digital products and campaigns that feel clear, current and unmistakably their own.', 'Ver trabajo ↗': 'View work ↗', 'Sobre el estudio': 'About the studio', 'Del concepto al mundo real.': 'From concept to the real world.', 'Combinamos pensamiento estratégico y oficio visual para construir sistemas que funcionan en cada punto de contacto.': 'We combine strategic thinking and visual craft to build systems that work at every touchpoint.', 'Posicionamiento, narrativa, arquitectura y una dirección que ayuda a decidir.': 'Positioning, narrative, architecture and a direction that helps teams decide.', 'Sistemas visuales flexibles, reconocibles y preparados para crecer.': 'Flexible, recognisable visual systems built to grow.', 'Sitios, productos y experiencias donde forma y utilidad se refuerzan.': 'Sites, products and experiences where form and utility reinforce each other.', 'Conceptos y kits de lanzamiento que mantienen una idea viva en todos los formatos.': 'Concepts and launch kits that keep one idea alive across every format.', 'Una muestra de lo que hacemos.': 'A selection of what we do.', 'Casos representativos preparados para añadir proyectos, clientes y resultados reales.': 'Representative cases ready for real projects, clients and results.', 'Nos gusta lo simple cuando tiene una idea fuerte debajo.': 'We like simplicity when there is a strong idea underneath.', 'Trabajamos con fundadores y equipos que quieren claridad, no decoración.': 'We work with founders and teams who want clarity, not decoration.', 'Contacto directo con el equipo creativo': 'Direct contact with the creative team', 'Una narrativa que guía el sistema': 'A narrative that guides the system', 'Diseño pensado para ser usado': 'Design made to be used', 'Entregables claros y editables': 'Clear, editable deliverables', 'Cuatro movimientos.': 'Four moves.', 'Descubrir': 'Discover', 'Contexto, cultura, personas y ambición.': 'Context, culture, people and ambition.', 'Enfocar': 'Focus', 'Una idea estratégica capaz de ordenar.': 'A strategic idea strong enough to organise.', 'Crear': 'Create', 'Exploración, sistema y prototipos reales.': 'Exploration, system and real prototypes.', 'Lanzar': 'Launch', 'Herramientas, guía y acompañamiento.': 'Tools, guidance and support.', 'Cuéntanos tu idea ↗': 'Tell us your idea ↗', 'Estudio creativo independiente para marcas, productos y experiencias con una voz propia.': 'Independent creative studio for brands, products and experiences with a voice of their own.',
    'Nosotros': 'About', 'Legal': 'Legal', 'Política de Privacidad': 'Privacy Policy', 'Términos de Uso': 'Terms of Use', 'Documentos': 'Documents', 'Tratamiento de Datos': 'Data Processing', 'Privacidad': 'Privacy', 'Términos': 'Terms',
    'Somos un estudio independiente que une estrategia y diseño para ayudar a organizaciones interesantes a expresarse con claridad.': 'We are an independent studio bringing strategy and design together to help interesting organisations express themselves clearly.', 'Creemos que una marca es una forma compartida de mirar.': 'We believe a brand is a shared way of seeing.', 'Trabajamos en equipos pequeños y senior. La persona que está en la conversación también está en los archivos.': 'We work in small, senior teams. The person in the conversation is also in the files.', 'Ideas antes que estilos': 'Ideas before styles', 'Sistemas antes que piezas sueltas': 'Systems before isolated assets', 'Colaboración sin teatro': 'Collaboration without theatre', 'Calidad que se puede usar': 'Quality that can be used', 'Estrategia': 'Strategy', 'Entender el contexto y elegir una dirección con sentido.': 'Understand the context and choose a meaningful direction.', 'Diseño': 'Design', 'Dar forma a una idea hasta que se vuelve reconocible y útil.': 'Shape an idea until it becomes recognisable and useful.', 'Implementación': 'Implementation', 'Acompañar el salto desde el archivo hasta el mundo real.': 'Support the leap from the file to the real world.', 'Contactar ↗': 'Get in touch ↗', 'Ideas claras, sistemas vivos.': 'Clear ideas, living systems.',
    'Una práctica integrada para construir desde la idea central hasta cada aplicación.': 'An integrated practice that builds from the central idea to every application.', 'Research, posicionamiento, arquitectura, naming, narrativa y principios de marca.': 'Research, positioning, architecture, naming, narrative and brand principles.', 'Dirección visual, logotipo, tipografía, color, imagen, tono y sistema de diseño.': 'Visual direction, logo, typography, colour, imagery, tone and design system.', 'Estrategia de experiencia, UX/UI, sitios corporativos y sistemas de contenido.': 'Experience strategy, UX/UI, corporate sites and content systems.', 'Concepto creativo, lanzamiento, social toolkits, motion y dirección de producción.': 'Creative concept, launch, social toolkits, motion and production direction.', 'Dirección creativa y soporte de marca para equipos que necesitan continuidad.': 'Creative direction and brand support for teams that need continuity.', 'Podemos entrar al principio o ayudar a desbloquear la siguiente etapa.': 'We can join at the beginning or help unlock the next stage.', 'Brand sprint — 2 a 3 semanas': 'Brand sprint — 2 to 3 weeks', 'Identity programme — 8 a 14 semanas': 'Identity programme — 8 to 14 weeks', 'Digital launch — 10 a 16 semanas': 'Digital launch — 10 to 16 weeks', 'Studio partnership — mensual': 'Studio partnership — monthly',
    'Una colección representativa lista para sustituir por casos reales y materiales aprobados.': 'A representative collection ready for real cases and approved materials.', 'La buena colaboración no es misteriosa. Tiene preguntas claras, momentos de decisión y espacio para probar.': 'Good collaboration is not mysterious. It has clear questions, decision points and room to test.', 'Objetivos, contexto, audiencia, cultura y tensión central.': 'Goals, context, audience, culture and central tension.', 'Estrategia, narrativa y criterios que ordenan el trabajo.': 'Strategy, narrative and criteria that organise the work.', 'Rutas creativas, pruebas, sistema y aplicaciones prioritarias.': 'Creative routes, tests, system and priority applications.', 'Producción, documentación, capacitación y acompañamiento.': 'Production, documentation, training and support.', 'Cada fase termina con una decisión, no con una presentación.': 'Every phase ends with a decision, not a presentation.', 'Un equipo central pequeño': 'A small core team', 'Check-ins breves y frecuentes': 'Short, frequent check-ins', 'Feedback agrupado y accionable': 'Consolidated, actionable feedback', 'Archivos y derechos claramente entregados': 'Files and rights clearly handed over',
    'Un poco de contexto es suficiente para empezar. Respondemos normalmente en dos días laborables.': 'A little context is enough to begin. We normally reply within two business days.', '¿Qué quieres poner en movimiento?': 'What do you want to set in motion?', 'Nombre / Empresa': 'Name / Company', 'Correo electrónico': 'Email address', 'Tipo de proyecto': 'Project type', 'Nueva marca': 'New brand', 'Sitio web / producto': 'Website / product', 'Campaña': 'Campaign', 'Otro': 'Other', 'Cuéntanos algo': 'Tell us a little', 'Acepto la': 'I accept the', 'Enviar proyecto ↗': 'Send project ↗'
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
  const titles = { 'index.html': 'Waterbed Studio — Independent Creative Studio', 'about.html': 'About — Waterbed Studio', 'services.html': 'Services — Waterbed Studio', 'portfolio.html': 'Work — Waterbed Studio', 'process.html': 'Process — Waterbed Studio', 'contact.html': 'Contact — Waterbed Studio' };
  const spanishTitle = document.title;
  const syncLanguageControls = (language) => {
    const english = language === 'en';
    languageSwitch.setAttribute('aria-label', english ? 'Select language' : 'Seleccionar idioma');
    languageSwitch.querySelectorAll('button').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
    const lightTarget = root.dataset.theme === 'dark';
    themeToggle.textContent = english ? (lightTarget ? 'LIGHT' : 'DARK') : (lightTarget ? 'CLARO' : 'OSCURO');
    themeToggle?.setAttribute('aria-label', lightTarget ? (english ? 'Activate light mode' : 'Activar modo claro') : (english ? 'Activate dark mode' : 'Activar modo oscuro'));
    menuToggle?.setAttribute('aria-label', menu?.classList.contains('open') ? (english ? 'Close menu' : 'Cerrar menú') : (english ? 'Open menu' : 'Abrir menú'));
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
