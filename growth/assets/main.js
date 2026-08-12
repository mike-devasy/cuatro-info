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
  const desktopHeader = matchMedia('(min-width: 1401px)');
  desktopHeader.addEventListener('change', (event) => event.matches && closeMenu());

  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-menu] a').forEach((link) => {
    if (link.getAttribute('href') === currentPage) link.setAttribute('aria-current', 'page');
  });

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

  Object.assign(translations,
  {
    "Inicio": "Home",
    "Nosotros": "About",
    "Servicios": "Services",
    "Nuestra experiencia": "Our Expertise",
    "Cómo trabajamos": "How We Work",
    "Contacto": "Contact",
    "CONSULTORA DE CRECIMIENTO DIGITAL": "DIGITAL GROWTH CONSULTANCY",
    "Estrategia digital para impulsar un crecimiento sostenible": "Digital strategy that drives sustainable growth.",
    "Estrategia digital para impulsar un crecimiento sostenible.": "Digital strategy that drives sustainable growth.",
    "Ayudamos a empresas a crecer con marketing estratégico, optimización de performance y toma de decisiones basadas en datos. Desde la planificación hasta la ejecución, impulsamos un crecimiento digital sostenible adaptado a los objetivos de cada negocio.": "We help businesses grow through strategic marketing, performance optimization, and data-driven decision-making. From planning to execution, we focus on sustainable digital growth tailored to your business goals.",
    "Planificá el próximo sprint": "Plan the next sprint",
    "Explorá nuestra experiencia": "Explore our expertise",
    "Decisiones basadas en datos": "Data-Driven Decisions",
    "Información clave respaldada por analítica": "Insights backed by analytics",
    "Estrategias a medida": "Tailored Strategies",
    "Soluciones diseñadas según tus objetivos": "Solutions built around your goals",
    "Acompañamiento a largo plazo": "Long-Term Partnership",
    "Soporte continuo y optimización": "Continuous support and optimization",
    "LO QUE HACEMOS": "WHAT WE DO",
    "Un sistema de crecimiento. Todos los canales conectados.": "One growth system. Every channel connected.",
    "Conectamos estrategia, adquisición, conversión y fidelización en un sistema integral alineado con los objetivos de tu negocio.": "We connect strategy, acquisition, conversion, and retention into one coordinated system built around your business goals.",
    "01 / Estrategia": "01 / Strategy",
    "Estrategia de Crecimiento": "Growth Strategy",
    "Analizamos tu situación actual, definimos prioridades y construimos una hoja de ruta clara alineada con los objetivos de tu negocio.": "We assess your current position, define priorities, and build a clear roadmap aligned with your business goals.",
    "Explorá el servicio →": "Explore service →",
    "02 / Adquisición": "02 / Acquisition",
    "Medios de Performance": "Performance Media",
    "Planificamos y optimizamos campañas, audiencias y creatividades en función de objetivos comerciales y de marketing relevantes.": "We plan and optimize campaigns, audiences, and creative around meaningful business and marketing objectives.",
    "03 / Conversión": "03 / Conversion",
    "Optimización de Conversión": "Conversion Optimization",
    "Mejoramos landing pages, recorridos de usuario y puntos de conversión mediante pruebas estructuradas y optimización continua.": "We improve landing pages, user journeys, and conversion paths through structured testing and continuous optimization.",
    "ESTRATEGIA PAID MEDIA TESTING CREATIVO ANALÍTICA CRO LIFECYCLE MARKETING": "STRATEGY PAID MEDIA CREATIVE TESTING ANALYTICS CRO LIFECYCLE",
    "POR QUÉ TRABAJAR CON NOSOTROS": "WHY WORK WITH US",
    "Mejores decisiones impulsan un mejor crecimiento.": "Better decisions lead to better growth.",
    "Trabajamos junto a tu equipo para identificar prioridades, transformar datos en acciones claras y enfocar los recursos en las oportunidades más relevantes.": "We work closely with your team to identify priorities, turn data into clear actions, and focus resources on the opportunities that matter most.",
    "Colaboración directa con especialistas con experiencia": "Direct collaboration with experienced specialists",
    "Reportes claros enfocados en resultados de negocio relevantes": "Clear reporting focused on meaningful business outcomes",
    "Pruebas continuas, aprendizaje y optimización": "Continuous testing, learning, and optimization",
    "Soporte flexible adaptado a la etapa actual de tu negocio": "Flexible support tailored to your current stage",
    "Nuestro enfoque": "Our approach",
    "PANORAMA DE CRECIMIENTO": "GROWTH OVERVIEW",
    "Información clara. Acciones enfocadas.": "Clear insights. Focused action.",
    "Prioridades del negocio": "Business priorities",
    "Optimización continua": "Continuous optimization",
    "CÓMO TRABAJAMOS": "HOW WE WORK",
    "Un enfoque estructurado para un crecimiento sostenible.": "A structured approach to sustainable growth.",
    "Explorá el proceso de trabajo": "Explore the workflow",
    "Descubrimiento": "Discovery",
    "Conocemos tu negocio, objetivos, audiencia y desafíos actuales antes de recomendar soluciones.": "We learn about your business, objectives, audience, and current challenges before recommending solutions.",
    "Desarrollo de Estrategia": "Strategy Development",
    "Definimos prioridades, canales de marketing, mensajes y una hoja de ruta práctica alineada con los objetivos de tu negocio.": "We define priorities, marketing channels, messaging, and a practical roadmap aligned with your business goals.",
    "Ejecución y Optimización": "Execution & Optimization",
    "Implementamos iniciativas, monitoreamos el rendimiento y optimizamos continuamente en función de resultados medibles.": "We implement initiatives, monitor performance, and continuously optimize based on measurable results.",
    "Crecimiento y Expansión": "Growth & Expansion",
    "Escalamos las iniciativas que funcionan, ajustamos la estrategia y acompañamos el crecimiento del negocio a largo plazo.": "We scale successful initiatives, refine strategy, and support long-term business growth.",
    "NUESTRA EXPERIENCIA": "OUR EXPERTISE",
    "Experiencia que impulsa un crecimiento sostenible.": "Expertise that supports sustainable growth.",
    "Combinamos estrategia, marketing de performance, optimización y analítica para ayudar a las empresas a lograr un crecimiento digital sostenible.": "We combine strategy, performance marketing, optimization, and analytics to help businesses achieve sustainable digital growth.",
    "SaaS | Paid Media": "SaaS | Paid Media",
    "Adquisición de Clientes": "Customer Acquisition",
    "Desarrollamos estrategias de adquisición escalables que atraen audiencias calificadas y acompañan el crecimiento a largo plazo.": "Building scalable acquisition strategies that attract qualified audiences and support long-term growth.",
    "Retail | CRO": "Retail | CRO",
    "Mejoramos los recorridos de usuario y las experiencias digitales para aumentar las oportunidades de conversión.": "Improving user journeys and digital experiences to increase conversion opportunities.",
    "Servicios | Lifecycle": "Services | Lifecycle",
    "Retención de Clientes": "Customer Retention",
    "​​Construimos relaciones duraderas con clientes a través de estrategias de lifecycle marketing y engagement.": "Building long-term customer relationships through lifecycle marketing and engagement strategies.",
    "¿Listo para acelerar el crecimiento de tu negocio?": "Ready to accelerate your business growth?",
    "Agendá una consulta →": "Schedule a consultation →",
    "Ayudamos a las empresas a lograr un crecimiento digital sostenible mediante estrategia, marketing de performance y toma de decisiones basadas en datos.": "Helping businesses achieve sustainable digital growth through strategy, performance marketing, and data-driven decision-making.",
    "Explorar": "Explore",
    "Legal": "Legal",
    "Política de Privacidad": "Privacy Policy",
    "Términos de Uso": "Terms of Use",
    "NOSOTROS": "ABOUT",
    "Estrategia respaldada por la ejecución.": "Strategy backed by execution.",
    "Combinamos estrategia, marketing de performance, pensamiento creativo y analítica para ayudar a las empresas a lograr un crecimiento digital sostenible mediante soluciones prácticas basadas en datos.": "We combine strategy, performance marketing, creative thinking, and analytics to help businesses achieve sustainable digital growth through practical, data-driven solutions.",
    "Un socio estratégico para un crecimiento sostenible.": "A strategic partner for sustainable growth.",
    "Trabajamos junto a tu empresa para transformar la estrategia en acciones medibles y un crecimiento digital sostenible a largo plazo.": "We work alongside your business to transform strategy into measurable actions and long-term digital growth.",
    "Los objetivos del negocio primero": "Business goals before tactics",
    "Toma de decisiones basada en datos": "Data-driven decision-making",
    "Ejecución transparente": "Transparent execution",
    "Alianzas a largo plazo": "Long-term partnership",
    "PRINCIPIOS": "PRINCIPLES",
    "Los principios que guían cada decisión.": "The principles behind every decision.",
    "Estrategia orientada al negocio": "Business-Driven Strategy",
    "Cada recomendación parte de los objetivos de tu negocio para asegurar que las acciones de marketing contribuyan a resultados comerciales medibles.": "Every recommendation starts with your business objectives, ensuring marketing efforts support measurable commercial outcomes.",
    "Mejora Continua": "Continuous Improvement",
    "Analizamos continuamente el rendimiento, aplicamos los aprendizajes y optimizamos las estrategias para lograr mejores resultados con el tiempo.": "We continuously analyze performance, apply insights, and refine strategies to achieve better results over time.",
    "Crecimiento Sostenible": "Sustainable Growth",
    "Desarrollamos procesos y estrategias escalables que siguen generando valor a medida que tu negocio crece.": "We build scalable processes and strategies that continue creating value as your business grows.",
    "Construyamos la próxima etapa de crecimiento de tu negocio.": "Let's build your next stage of growth.",
    "SERVICIOS": "SERVICES",
    "Servicios diseñados en función de los objetivos de tu negocio.": "Services built around your business goals.",
    "Ayudamos a las empresas a crecer mediante consultoría estratégica, marketing de performance, optimización de conversiones y analítica, ofreciendo soluciones prácticas que generan un impacto medible en el negocio.": "We help businesses grow through strategic consulting, performance marketing, conversion optimization, and analytics – delivering practical solutions that create measurable business impact.",
    "Análisis del negocio, investigación de mercado, posicionamiento, planificación estratégica y hojas de ruta de crecimiento adaptadas a tus objetivos.": "Business analysis, market research, positioning, strategic planning, and growth roadmaps tailored to your objectives.",
    "Marketing de Performance": "Performance Marketing",
    "Estrategia de paid media, segmentación de audiencias, gestión de campañas, optimización creativa y análisis de performance.": "Paid media strategy, audience targeting, campaign management, creative optimization, and performance analysis.",
    "Optimización Creativa": "Creative Optimization",
    "Estrategia creativa, testing de mensajes, optimización de piezas creativas y mejora continua del rendimiento.": "Creative strategy, message testing, asset optimization, and continuous performance improvement.",
    "Optimización de Conversiones": "Conversion Optimization",
    "Auditorías de conversión, optimización de landing pages, análisis del recorrido del usuario y experimentación para mejorar el rendimiento del negocio.": "Conversion audits, landing page optimization, user journey analysis, and experimentation to improve business performance.",
    "Lifecycle y Retención": "Lifecycle and Retention",
    "Estrategia de lifecycle, optimización de CRM, automatización, segmentación y programas de retención.": "Customer lifecycle strategy, CRM optimization, automation, segmentation, and retention programs.",
    "Analítica y Reporting": "Analytics and Reporting",
    "Implementación de analítica, dashboards de performance, reporting e insights accionables para la toma de decisiones.": "Analytics implementation, performance dashboards, reporting, and actionable business insights.",
    "FORMAS DE TRABAJAR JUNTOS": "WAYS TO WORK TOGETHER",
    "Modelos de colaboración flexibles para cada etapa de crecimiento.": "Flexible engagement models for every stage of growth.",
    "Workshop Estratégico — de 2 a 4 semanas": "Strategy Workshop — 2 to 4 weeks",
    "Proyecto de Crecimiento — de 8 a 12 semanas": "Growth Project — 8 to 12 weeks",
    "Alianza a Largo Plazo — acompañamiento estratégico continuo": "Long-Term Partnership — ongoing strategic support",
    "Soporte Especializado — colaboración flexible según las necesidades del proyecto": "Expert Support — flexible project-based collaboration",
    "Identifiquemos la próxima oportunidad de crecimiento para tu negocio.": "Let's identify your next growth opportunity.",
    "Ponete en contacto →": "Get in touch →",
    "Experiencia que transforma desafíos de negocio en resultados medibles.": "Expertise that turns business challenges into measurable outcomes.",
    "Descubrí cómo ayudamos a las empresas a mejorar su performance de marketing, optimizar sus experiencias digitales y desarrollar estrategias escalables para un crecimiento sostenible.": "Discover how we help businesses improve marketing performance, optimize digital experiences, and build scalable strategies for sustainable success.",
    "ATRAER": "ATTRACT",
    "Generación de Demanda": "Demand Generation",
    "Construí pipelines predecibles mediante segmentación de audiencias, estrategia de campañas y adquisición orientada al performance.": "Build predictable pipelines through audience targeting, campaign strategy, and performance-driven acquisition.",
    "CONVERTIR": "CONVERT",
    "Aumentá las tasas de conversión mediante investigación de usuarios, testing y optimización continua del sitio web.": "Increase conversion rates through user research, testing, and continuous website optimization.",
    "RETENER": "RETAIN",
    "Marketing de Lifecycle": "Lifecycle Marketing",
    "Fortalecé la retención de clientes mediante recorridos automatizados, mensajes personalizados e insights basados en el comportamiento.": "Strengthen customer retention with automated journeys, personalized messaging, and behavioral insights.",
    "ESCALAR": "SCALE",
    "Optimizá la inversión en marketing mediante planificación de medios, asignación de presupuesto y análisis continuo del performance.": "Optimize marketing investment through media planning, budget allocation, and ongoing performance analysis.",
    "¿Listo para hacer crecer tu negocio con confianza?": "Ready to grow with confidence?",
    "Hablemos →": "Let's talk →",
    "Un proceso claro desde la estrategia hasta la ejecución.": "A clear process from strategy to execution.",
    "Nuestro enfoque colaborativo mantiene cada etapa transparente, alineada con los objetivos de tu negocio y enfocada en avances medibles.": "Our collaborative approach keeps every stage transparent, aligned with your business goals, and focused on measurable progress.",
    "Descubrir": "Discover",
    "Conocemos tu negocio, revisamos los datos disponibles y definimos los desafíos más relevantes.": "We learn about your business, review available data, and define the challenges that matter most.",
    "Alinear": "Align",
    "Juntos, definimos prioridades, métricas de éxito, responsabilidades y una hoja de ruta clara.": "Together, we define priorities, success metrics, responsibilities, and a clear roadmap.",
    "Construir": "Build",
    "Creamos las campañas, experiencias y el marco de medición necesarios para llevar la estrategia a la práctica.": "We create the campaigns, experiences, and measurement framework needed to bring the strategy to life.",
    "Experimentar": "Experiment",
    "Probamos, medimos y optimizamos cada iniciativa utilizando datos reales de performance.": "We test, measure, and refine every initiative using real performance data.",
    "Escalar": "Scale",
    "Escalamos lo que genera resultados y mejoramos o reemplazamos lo que no funciona.": "We expand what delivers results and improve or replace what doesn't.",
    "Cada semana": "Every week",
    "Revisamos el progreso en curso, conversamos sobre prioridades y evaluamos métricas de performance.": "Review ongoing progress, discuss priorities, and evaluate performance metrics.",
    "Cada mes": "Every month",
    "Evaluamos resultados, ajustamos prioridades y optimizamos presupuestos en función del performance.": "Evaluate results, adjust priorities, and optimize budgets based on performance.",
    "Cada trimestre": "Every quarter",
    "Revisamos el progreso a largo plazo, ajustamos la estrategia e identificamos nuevas oportunidades de crecimiento.": "Review long-term progress, refine the strategy, and identify new growth opportunities.",
    "El buen trabajo empieza con un proceso claro.": "Great work starts with a clear process.",
    "Iniciá tu proyecto →": "Start your project →",
    "Contanos sobre tus objetivos.": "Tell us about your goals.",
    "Contanos sobre tus desafíos actuales y el contexto relevante. Te responderemos dentro de los próximos dos días hábiles.": "Share your current challenges and relevant context. We'll get back to you within two business days.",
    "Convertí la ambición en acción.": "Turn ambition into action.",
    "No necesitás tener todas las respuestas. Contanos dónde estás hoy, hacia dónde querés llegar y te ayudaremos a definir los próximos pasos.": "You don't need all the answers. Tell us where you are today, where you want to go, and we'll help define the next steps.",
    "Nombre / Empresa": "Name / Company",
    "Correo electrónico": "Email address",
    "Área de interés": "Area of interest",
    "Contanos sobre tu proyecto": "Tell us about your project",
    "Leí y acepto la Política de Privacidad.": "I have read and agree to the Privacy Policy.",
    "Enviar mensaje →": "Send message →",
    "POLÍTICA DE PRIVACIDAD": "PRIVACY POLICY",
    "Última actualización: 2026": "Last updated: 2026",
    "CuatroGrowth respeta tu privacidad y se compromete a proteger la información que compartís con nosotros.": "CuatroGrowth respects your privacy and is committed to protecting the information you share with us.",
    "Esta Política de Privacidad explica cómo recopilamos, utilizamos y protegemos la información personal proporcionada a través de este sitio web.": "This Privacy Policy explains how we collect, use, and protect personal information provided through this website.",
    "Responsable: CuatroGrowth. La información de contacto oficial estará disponible a través de los canales de comunicación proporcionados en este sitio web.": "Responsible party: CuatroGrowth. For privacy-related questions, please contact us through the official communication channels available on this website.",
    "1. Información que tratamos": "1. Information We Process",
    "Podemos tratar la información que nos proporcionás mediante formularios de contacto, correo electrónico u otras interacciones con nuestro sitio web, incluyendo tu nombre, datos de empresa, información de contacto y el contenido de tu consulta.": "We may process information provided through contact forms, email communication, or other interactions with our website, including your name, company details, contact information, and the content of your inquiry.",
    "2. Finalidades y base jurídica": "2. Purposes and Legal Basis",
    "Utilizamos la información personal para responder consultas, proporcionar información sobre nuestros servicios, preparar propuestas, mantener relaciones comerciales y mejorar nuestra comunicación.": "We use personal information to respond to inquiries, provide information about our services, prepare proposals, maintain business relationships, and improve our communication.",
    "El tratamiento de datos personales puede basarse en tu consentimiento, medidas precontractuales, interés legítimo u otras obligaciones legales aplicables.": "The processing of personal data may be based on your consent, pre-contractual measures, legitimate interest, or other applicable legal obligations.",
    "3. Conservación y destinatarios": "3. Data Retention and Recipients",
    "Conservamos la información personal únicamente durante el tiempo necesario para cumplir con las finalidades descritas en esta política y con los requisitos legales aplicables.": "We retain personal information only for as long as necessary to fulfill the purposes described in this policy and comply with applicable legal requirements.",
    "La información puede compartirse únicamente con proveedores de servicios, socios, autoridades u otros terceros cuando sea necesario y exista una base legal válida.": "Information may only be shared with service providers, partners, authorities, or other third parties when necessary and when there is a valid legal basis.",
    "4. Tus derechos": "4. Your Rights",
    "Podés solicitar acceso, rectificación, eliminación, oposición, limitación o portabilidad de tu información personal contactándonos a través de los canales de comunicación disponibles.": "You may request access, correction, deletion, objection, restriction, or portability of your personal information by contacting us through the available communication channels.",
    "También podés retirar tu consentimiento cuando el tratamiento se base en él y presentar una reclamación ante la autoridad de protección de datos correspondiente.": "You may also withdraw your consent at any time when processing is based on consent and submit a complaint to the relevant data protection authority.",
    "5. Seguridad y actualizaciones": "5. Security and Updates",
    "Aplicamos medidas razonables para proteger la información personal frente a accesos no autorizados, pérdida o uso indebido.": "We apply reasonable measures to protect personal information from unauthorized access, loss, or misuse.",
    "Esta Política de Privacidad puede actualizarse periódicamente para reflejar cambios en nuestros servicios, requisitos legales o prácticas de privacidad.": "This Privacy Policy may be updated from time to time to reflect changes in our services, legal requirements, or privacy practices.",
    "TÉRMINOS DE USO": "TERMS OF USE",
    "Estos Términos de Uso establecen las condiciones para acceder y utilizar el sitio web de CuatroGrowth.": "These Terms of Use define the conditions for accessing and using the CuatroGrowth website.",
    "Al acceder a este sitio web, aceptás estos términos y confirmás que utilizarás el sitio y su contenido de manera responsable y de acuerdo con la normativa aplicable.": "By accessing this website, you agree to these terms and confirm that you will use the website and its content responsibly and in accordance with applicable laws.",
    "1. Aceptación": "1. Acceptance",
    "Al acceder a este sitio web, aceptás estos Términos de Uso. Si no estás de acuerdo con estos términos, no utilices este sitio web.": "By accessing this website, you agree to these Terms of Use. If you do not agree with these terms, please do not use this website.",
    "2. Uso permitido": "2. Permitted Use",
    "El contenido disponible en este sitio web se proporciona con fines informativos generales.": "The content available on this website is provided for general informational purposes.",
    "No debés utilizar este sitio web para fines ilícitos, interferir con su funcionamiento ni intentar acceder a sistemas o información sin autorización.": "You must not use this website for unlawful purposes, interfere with its operation, or attempt to access systems or information without authorization.",
    "3. Propiedad intelectual": "3. Intellectual Property",
    "Todo el contenido del sitio web, incluyendo textos, elementos de diseño, materiales visuales y otros recursos, pertenece a CuatroGrowth o se utiliza con la autorización correspondiente.": "All website content, including text, design elements, visual materials, and other resources, belongs to CuatroGrowth or is used with appropriate authorization.",
    "No se otorgan derechos ni licencias salvo que se indique expresamente. No podés copiar, reproducir, modificar, distribuir ni utilizar el contenido del sitio sin autorización previa.": "No rights or licenses are granted unless explicitly stated. You may not copy, reproduce, modify, distribute, or use website content without prior permission.",
    "4. Responsabilidad y enlaces externos": "4. Responsibility and External Links",
    "Procuramos mantener la información de este sitio web actualizada y correcta, pero no garantizamos que todo el contenido sea completo, actual o esté libre de errores.": "We aim to keep the information on this website accurate and up to date, but we do not guarantee that all content is complete, current, or free from errors.",
    "Este sitio web puede incluir enlaces a sitios externos o recursos de terceros. CuatroGrowth no es responsable por la disponibilidad, contenido o prácticas de sitios externos.": "This website may include links to external websites or third-party resources. CuatroGrowth is not responsible for the availability, content, or practices of external websites.",
    "5. Ley aplicable": "5. Applicable Law",
    "Estos Términos de Uso se interpretan conforme a la normativa aplicable.": "These Terms of Use are interpreted in accordance with applicable laws.",
    "Cualquier asunto relacionado con estos términos será tratado por las autoridades correspondientes cuando la ley así lo requiera.": "Any matters arising from these terms will be handled by the relevant authorities where required by law.",
    "6. Actualizaciones de estos términos": "6. Updates to These Terms",
    "Estos Términos de Uso pueden actualizarse periódicamente para reflejar cambios en nuestro sitio web, servicios o requisitos legales.": "These Terms of Use may be updated periodically to reflect changes in our website, services, or legal requirements.",
    "Al continuar utilizando este sitio web después de la publicación de actualizaciones, aceptás los términos modificados.": "By continuing to use this website after updates are published, you agree to the revised terms.",
    "Información clara.": "Clear insights.",
    "Acciones enfocadas.": "Focused action.",
    "Construimos relaciones duraderas con clientes a través de estrategias de lifecycle marketing y engagement.": "Building long-term customer relationships through lifecycle marketing and engagement strategies.",
    "Leí y acepto la": "I have read and agree to the"
  }
  );

  const legalPages = new Set(['privacy-policy.html', 'terms-of-use.html', 'documents.html', 'personal-data-processing.html']);
  const i18nEntries = [];
  const i18nRoots = [document.body];
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

  const titles = { 'index.html': 'Cuatro Growth — Digital Agency', 'about.html': 'About — CuatroGrowth', 'services.html': 'Services — CuatroGrowth', 'portfolio.html': 'Our Expertise — CuatroGrowth', 'process.html': 'How We Work — CuatroGrowth', 'contact.html': 'Contact — CuatroGrowth', 'privacy-policy.html': 'Privacy Policy — CuatroGrowth', 'terms-of-use.html': 'Terms of Use — CuatroGrowth' };
  const syncLanguageControls = (language) => {
    const english = language === 'en';
    languageSwitch.setAttribute('aria-label', english ? 'Select language' : 'Seleccionar idioma');
    languageSwitch.querySelectorAll('button').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
    themeButton?.setAttribute('aria-label', root.dataset.theme === 'dark' ? (english ? 'Activate light mode' : 'Activar modo claro') : (english ? 'Activate dark mode' : 'Activar modo oscuro'));
    menuButton?.setAttribute('aria-label', menu?.classList.contains('is-open') ? (english ? 'Close menu' : 'Cerrar menú') : (english ? 'Open menu' : 'Abrir menú'));
  };
  const setLanguage = (language) => {
    const next = language === 'en' ? 'en' : 'es';
    root.lang = next;
    root.dataset.language = next;
    i18nEntries.forEach((entry) => {
      entry.node.nodeValue = entry[next];
    });
    document.title = next === 'en' ? (titles[currentPage] || spanishTitle) : spanishTitle;
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
