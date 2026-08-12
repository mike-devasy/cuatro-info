(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const page = location.pathname.split('/').pop() || 'index.html';

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
    if (themeToggle) themeToggle.textContent = theme === 'dark' ? '☀' : '☾';
  };
  setTheme(localStorage.getItem('waterbed-theme') || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'));
  themeToggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('waterbed-theme', next);
    setTheme(next);
  });

  const closeMenu = () => {
    menu?.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  };
  menuToggle?.addEventListener('click', () => {
    const open = !menu?.classList.contains('is-open');
    menu?.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  addEventListener('keydown', (event) => event.key === 'Escape' && closeMenu());
  addEventListener('resize', () => innerWidth > 1400 && closeMenu());
  menu?.querySelectorAll('a').forEach((link) => link.getAttribute('href') === page && link.setAttribute('aria-current', 'page'));

  document.querySelectorAll('[data-contact-form]').forEach((form) => {
    const fields = [...form.querySelectorAll('[data-validate]')];
    const status = form.querySelector('[data-form-status]');
    const validate = (field) => {
      let message = '';
      const english = root.dataset.language === 'en';
      if (field.type === 'checkbox' ? !field.checked : !field.value.trim()) message = english ? 'This field is required.' : 'Este campo es obligatorio.';
      else if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) message = english ? 'Enter a valid email address.' : 'Introducí un email válido.';
      field.setAttribute('aria-invalid', String(Boolean(message)));
      const error = field.closest('.field')?.querySelector('.field-error');
      if (error) error.textContent = message;
      return !message;
    };
    fields.forEach((field) => field.addEventListener('blur', () => validate(field)));
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!fields.map(validate).every(Boolean)) {
        status.textContent = root.dataset.language === 'en' ? 'Review the highlighted fields.' : 'Revisá los campos indicados.';
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }
      status.textContent = root.dataset.language === 'en' ? 'Request recorded in this demo. Connect the form to your system to send it.' : 'Solicitud registrada en esta demostración. Conectá el formulario con tu sistema para enviarla.';
      status.classList.add('success');
      form.reset();
    });
  });

  const translations = {
    'Saltar al contenido': 'Skip to content',
    'Inicio': 'Home', 'Empresa': 'Company', 'Servicios': 'Services', 'Soluciones': 'Solutions', 'Operaciones': 'Operations', 'Contacto': 'Contact',
    'Hablar con nuestro equipo': 'Talk to our team', 'Nosotros': 'About', 'Legal': 'Legal',
    'Política de Privacidad': 'Privacy Policy', 'Términos de Uso': 'Terms of Use', 'Información de la empresa': 'Company Information',
    'Soporte que mantiene tu negocio en movimiento.': 'Support that keeps business moving.',

    'Operaciones de atención confiables': 'Reliable customer operations',
    'Soporte en el que tus clientes confían.': 'Support that customers trust.',
    'Ayudamos a las empresas a ofrecer una atención al cliente ágil, una comunicación clara y un soporte operativo confiable mediante equipos dedicados y procesos bien definidos.': 'We help businesses deliver responsive customer support, clear communication, and reliable operational assistance through dedicated teams and structured workflows.',
    'Hablemos →': "Let's talk →", 'Explorar servicios': 'Explore services',
    'Operaciones activas': 'Active operations', 'Operación estable': 'Operations running',
    'Incorporación de clientes': 'Customer onboarding', 'Configuración inicial · En progreso': 'Client setup · In progress',
    'Solicitud de servicio': 'Service request', 'Comunicación · En revisión': 'Communication · In review',
    'Caso resuelto': 'Case resolved', 'Operaciones · Completado': 'Operations · Completed',
    'Nivel de servicio': 'Service level', 'Satisfacción del cliente': 'Customer satisfaction', 'Tiempo promedio de primera respuesta': 'Average first response',
    'Atención al cliente': 'Customer care', 'Comunicación': 'Communication', 'Control de calidad': 'Quality assurance', 'Soporte administrativo': 'Back-office support',
    'Todo lo que necesitan tus operaciones de atención al cliente.': 'Everything your customer operations need.',
    'Nuestros servicios combinan atención al cliente, asistencia operativa y gestión de calidad para ayudar a las empresas a ofrecer experiencias consistentes todos los días.': 'Our services combine customer support, operational assistance, and quality management to help businesses deliver reliable customer experiences every day.',
    'Equipos de soporte dedicados que brindan asistencia ágil a través de múltiples canales de comunicación.': 'Dedicated support teams providing responsive assistance across multiple communication channels.',
    'Asistencia operativa': 'Operational assistance',
    'Coordinación administrativa, incorporaciones, gestión de procesos y soporte operativo para las tareas diarias.': 'Administrative coordination, onboarding, workflow management, and day-to-day operational support.',
    'Gestión de calidad': 'Quality management',
    'Monitoreo de calidad, recursos de conocimiento, revisión de procesos y mejora continua del servicio.': 'Quality monitoring, knowledge resources, process reviews, and continuous service improvement.',
    'Diseñado para B2B': 'Built for B2B', 'Soporte diseñado para tus operaciones.': 'Support built around your operations.',
    'Cada solicitud sigue un flujo de trabajo estructurado, con responsables definidos, procesos documentados y controles de calidad consistentes. Este enfoque permite ofrecer un soporte confiable desde la primera respuesta hasta la resolución final.': 'Every request follows a structured workflow with clearly defined ownership, documented processes, and consistent quality checks. This approach helps teams deliver reliable support from the first response to final resolution.',
    'Responsables claros en cada etapa': 'Clear ownership at every stage', 'Procesos documentados': 'Documented workflows',
    'Revisiones de calidad continuas': 'Consistent quality reviews', 'Reportes operativos transparentes': 'Transparent operational reporting', 'Nuestro enfoque': 'Our approach',
    'Proceso de implementación': 'Implementation process', 'De la planificación al soporte continuo.': 'From planning to ongoing support.', 'Conocé más': 'Learn more',
    '01 / DESCUBRIR': '01 / DISCOVER', 'Evaluación': 'Assessment',
    'Analizamos tus canales de atención, necesidades operativas y expectativas de servicio.': 'We review your support channels, operational needs, and service expectations.',
    '02 / PLANIFICAR': '02 / PLAN', 'Configuración del servicio': 'Service setup',
    'Definimos flujos de trabajo, canales de comunicación, responsabilidades y lineamientos operativos.': 'We define workflows, communication channels, responsibilities, and operational guidelines.',
    '03 / IMPLEMENTAR': '03 / LAUNCH', 'Puesta en marcha': 'Implementation',
    'Incorporamos al equipo, validamos los procesos y comenzamos la operación.': 'We onboard the team, test processes, and begin supporting your customers.',
    '04 / OPTIMIZAR': '04 / OPTIMIZE', 'Mejora continua': 'Continuous improvement',
    'Supervisamos el desempeño, revisamos la calidad y optimizamos la operación de forma continua.': 'We monitor performance, review quality, and refine operations over time.',
    'Casos de uso': 'Use cases', 'Soporte diseñado para diferentes entornos de negocio.': 'Support built for different business environments.',
    'Soporte adaptado para empresas de todos los tamaños.': 'Tailored support for businesses of every size.',
    'Empresas SaaS': 'SaaS Companies', 'Estructurado': 'Structured', 'INCORPORACIÓN DE CLIENTES': 'CUSTOMER ONBOARDING',
    'Ayudamos a los usuarios a comenzar con un proceso de incorporación estructurado y un soporte ágil.': 'Helping users get started through structured onboarding and responsive customer support.',
    'Servicios financieros': 'Financial Services', 'Confiable': 'Reliable', 'SOPORTE OPERATIVO': 'OPERATIONAL SUPPORT',
    'Gestionamos consultas, coordinación interna y procesos operativos del día a día.': 'Supporting customer requests, internal coordination, and day-to-day operational processes.',
    'Negocios digitales': 'Digital Businesses', 'Continuo': 'Continuous', 'GESTIÓN DE CALIDAD': 'QUALITY MANAGEMENT',
    'Mantenemos la calidad del servicio mediante revisiones de procesos, monitoreo y mejora continua.': 'Maintaining service quality through process reviews, monitoring, and continuous improvement.',
    'Un mejor soporte empieza con la estructura adecuada.': 'Better support starts with the right setup.', 'Iniciá una conversación →': 'Start a conversation →',

    'Pensados para trabajar junto a tu negocio.': 'Built to work alongside your business.',
    'CuatroSupport integra la comunicación con clientes y la asistencia operativa en un servicio de soporte confiable y coordinado.': 'CuatroSupport brings customer communication and operational assistance together in one reliable support partnership.',
    'Un buen soporte empieza por entender tu negocio.': 'Good support starts with understanding your business.',
    'Entendemos cómo funciona tu negocio, qué es importante para tus clientes y adaptamos nuestro soporte a la forma de trabajar de tu equipo.': 'We learn how your business works, understand what matters to your customers, and adapt our support to the way your team operates.',
    'Una colaboración centrada en tus prioridades': 'A partnership built around your priorities', 'Comunicación alineada con tu marca': 'Communication that reflects your brand',
    'Soporte adaptado a tus flujos de trabajo': 'Support shaped around your workflows', 'Flexibilidad a medida que cambian tus necesidades': 'Flexibility as your needs change',
    'Transparencia desde el primer día': 'Openness from day one',
    'Entendemos a la persona, no solo la consulta.': 'Understand the person, not just the request.', 'Usamos el contexto para entender qué necesita realmente el cliente.': 'We use context to understand what the customer really needs.',
    'Convertimos interacciones en información útil.': 'Turn interactions into useful insight.', 'Detectamos patrones y feedback que tu equipo puede aprovechar.': 'We surface patterns and feedback your team can act on.',
    'Fortalecemos el negocio a través del soporte.': 'Strengthen the business through support.', 'Alineamos el soporte con tus prioridades operativas.': 'We align support with your operational priorities.',
    'Hacé que cada interacción refleje lo mejor de tu marca.': 'Make every interaction feel like your brand at its best.', 'Trabajemos juntos →': "Let's work together →",

    'Convertí cada parte del soporte en una ventaja.': 'Turn every part of support into an advantage.',
    'Cuatro áreas de servicio conectadas integran atención al cliente, operaciones diarias, conocimiento y calidad.': 'Four connected service areas bring together customer care, daily operations, knowledge, and quality.',
    'Atención ágil a través de los canales de comunicación que utilizan tus clientes.': 'Responsive assistance across the communication channels your customers use.',
    'Atención multicanal': 'Multichannel assistance', 'Gestión y seguimiento de consultas': 'Request handling and follow-up', 'Cobertura de soporte flexible': 'Flexible support coverage',
    'Asistencia práctica para las tareas recurrentes y la coordinación detrás de las operaciones de atención al cliente.': 'Practical support for the recurring tasks and coordination behind customer operations.',
    'Coordinación administrativa': 'Administrative coordination', 'Gestión de procesos': 'Workflow management',
    'Gestión del conocimiento': 'Knowledge Management',
    'Recursos claros y estructurados que ayudan a los equipos a encontrar respuestas y brindar un soporte consistente.': 'Clear, structured resources that help teams find answers and deliver consistent support.',
    'Bases de conocimiento': 'Knowledge bases', 'Guías de soporte': 'Support guidelines', 'Mantenimiento de contenidos': 'Content maintenance',
    'Monitoreo y revisión continua para mantener los estándares del servicio e identificar oportunidades de mejora.': 'Ongoing monitoring and review to maintain service standards and identify opportunities to improve.',
    'Revisiones de calidad': 'Quality reviews', 'Feedback de clientes': 'Customer feedback',
    'Ampliá tus capacidades': 'Extend your capabilities', 'Sumá el soporte que le falta a tu operación.': 'Add the support your operation is missing.',
    'Reforzá tus equipos actuales': 'Strengthen existing teams', 'Cubrí procesos específicos': 'Cover specific workflows', 'Sumá capacidad operativa': 'Add operational capacity',
    'Ampliá el soporte cuando lo necesites': 'Extend support when needed', 'Cubrí lo que falta. Conservá lo que ya funciona.': 'Fill the gaps. Keep what already works.', 'Reforzá tu soporte →': 'Strengthen your support →',

    'Soporte adaptado a distintas necesidades de negocio.': 'Support shaped around different business needs.',
    'Descubrí cómo la atención al cliente, la asistencia operativa, la gestión del conocimiento y la gestión de calidad pueden responder a las necesidades diarias de distintos negocios.': 'Explore how customer support, operational assistance, knowledge, and quality management can address the day-to-day needs of different businesses.',
    'Dale a cada nuevo cliente un camino claro desde el comienzo.': 'Give every new customer a clear path from the start.',
    'Una incorporación estructurada, una atención ágil y una guía accesible ayudan a los clientes a comenzar y encontrar el soporte que necesitan durante el proceso.': 'Structured onboarding, responsive assistance, and accessible guidance help customers get started and find the support they need along the way.',
    'Mantené las operaciones diarias en marcha con menos interrupciones.': 'Keep everyday operations moving with fewer gaps.',
    'Las consultas de clientes, la coordinación interna, los seguimientos y las tareas operativas recurrentes se mantienen organizados dentro de un flujo de soporte claro.': 'Customer requests, internal coordination, follow-ups, and recurring operational tasks stay organised within a clear support workflow.',
    'Hacé que la calidad del servicio forme parte de la operación diaria.': 'Make service quality part of the everyday operation.',
    'El monitoreo regular, las revisiones de procesos y el conocimiento estructurado ayudan a los equipos a mantener la consistencia e identificar oportunidades de mejora.': 'Regular monitoring, process reviews, and structured knowledge help teams maintain consistency and identify where the service can improve.',
    'Negocios en crecimiento': 'Growing Businesses', 'Adaptable': 'Adaptable', 'CAPACIDAD FLEXIBLE': 'FLEXIBLE CAPACITY',
    'Sumá capacidad de soporte a medida que evolucionan tus necesidades.': 'Add support capacity as your needs evolve.',
    'Ampliá la cobertura, reforzá tus equipos actuales o sumá soporte operativo donde el crecimiento genere nuevas demandas.': 'Extend coverage, reinforce existing teams, or add operational support where growing workloads create new demands.',
    'Encontremos el enfoque adecuado para tu negocio.': "Let's find the right approach for your business.",

    'Desde el primer análisis hasta una operación más sólida.': 'From first assessment to a stronger operation.', 'Diseñamos operaciones preparadas para funcionar, adaptarse y mejorar.': 'We build operations designed to work, adapt, and improve.',
    '01 / ENTENDER': '01 / UNDERSTAND', 'Analizamos procesos, herramientas, responsabilidades, prioridades y expectativas de servicio.': 'We map workflows, tools, responsibilities, priorities, and service expectations.',
    '02 / DISEÑAR': '02 / BUILD', 'Modelo': 'Model', 'Definimos procesos, responsabilidades, estándares de calidad y reportes.': 'We define workflows, responsibilities, quality standards, and reporting.',
    '03 / PREPARAR': '03 / PREPARE', 'Equipo': 'Team', 'Convertimos el conocimiento en guías prácticas y capacitación para el equipo.': 'We turn knowledge into practical guidance and team training.',
    '04 / LANZAR': '04 / LAUNCH', 'Implementación': 'Rollout', 'Implementamos de forma gradual, monitoreamos el desempeño y ajustamos según las necesidades.': 'We launch gradually, monitor performance, and adjust as needs emerge.',
    'Cada día': 'Every day', 'Mantenemos las solicitudes en movimiento, resolvemos bloqueos y gestionamos prioridades cambiantes.': 'Keep requests moving, resolve blockers, and manage changing priorities.',
    'Cada semana': 'Every week', 'Revisamos la calidad, la capacidad, los patrones recurrentes y los ajustes necesarios.': 'Review quality, capacity, recurring patterns, and needed adjustments.',
    'A largo plazo': 'Over time', 'Convertimos los aprendizajes operativos en mejores procesos y mejora continua.': 'Turn operational insights into better processes and continuous improvement.',
    'Seguí el progreso. Detectá los riesgos a tiempo.': 'See progress. Spot risks early.',
    'Señales claras, roles definidos y prioridades compartidas ayudan a los equipos a mantenerse informados y responder antes de que los problemas crezcan.': 'Clear signals, defined roles, and shared priorities help teams stay informed and respond before issues grow.',
    'Roles definidos': 'Defined roles', 'Expectativas compartidas': 'Shared expectations', 'Señales tempranas de riesgo': 'Early risk signals', 'Planes de respaldo': 'Backup plans', 'Planificación de próximos pasos': 'Next-step planning',
    'Mantenete al tanto sin tener que gestionar cada detalle.': 'Stay informed without managing every detail.', 'Mantenete un paso adelante →': 'Stay one step ahead →',

    'Encontremos el modelo de soporte adecuado.': "Let's find the right support model.",
    'Contanos cómo funciona hoy tu operación y qué querés mejorar. Te ayudamos a definir un enfoque adaptado a tus necesidades.': "Share how your operation works today and what you want to improve. We'll help shape an approach around your needs.",
    'Tus necesidades son el punto de partida.': 'Your needs are the starting point.', 'Revisaremos tu solicitud y nos pondremos en contacto con los próximos pasos.': "We'll review your request and follow up with the next steps.",
    'Nombre y empresa': 'Name and company', 'Email laboral': 'Work email', 'Volumen mensual de soporte': 'Monthly support volume',
    'Menos de 500': 'Under 500', 'Más de 10.000': 'Over 10,000', 'Todavía no lo sabemos': 'Not sure yet', '¿Qué necesitás resolver?': 'What are you looking to solve?',
    'Acepto la': 'I accept the', 'Enviar solicitud →': 'Send request →',

    'Última actualización: 2026': 'Last updated: 2026',
    'Tu información forma parte de cada interacción de soporte. En CuatroSupport la gestionamos con cuidado y la utilizamos únicamente cuando es necesaria para comunicarnos con vos y prestar nuestros servicios.': 'Your information is part of every support interaction. CuatroSupport handles it with care and uses it only where it is needed to communicate with you and deliver our services.',
    'Esta política explica qué información personal podemos recibir a través de este sitio web, para qué la utilizamos, durante cuánto tiempo la conservamos y qué opciones tenés sobre tus datos.': 'This policy outlines what personal information we may receive through this website, why we use it, how long we keep it, and the choices available to you.',
    'Responsable: CuatroSupport. Podés enviar cualquier consulta sobre privacidad a través de los canales oficiales de contacto disponibles en este sitio web.': 'Responsible party: CuatroSupport. Privacy questions can be submitted through the official contact channels listed on this website.',
    '1. Qué información recibimos': '1. What Information We Receive',
    'Cuando te comunicás con CuatroSupport, podemos recibir información como tu nombre, empresa, datos de contacto y cualquier otro dato que decidas incluir en tu mensaje o solicitud.': 'When you contact CuatroSupport, we may receive information such as your name, company, contact details, and anything you choose to include in your message or request.',
    '2. Cómo usamos tu información': '2. How We Use Your Information',
    'Utilizamos esta información para revisar y responder solicitudes, comunicarnos con vos, entender qué tipo de soporte necesitás, coordinar los próximos pasos y prestar nuestros servicios.': 'We use this information to review and respond to requests, communicate with you, understand the support you need, coordinate next steps, and provide our services.',
    'Cuando corresponde, tratamos la información personal sobre la base del consentimiento, intereses legítimos, medidas precontractuales o requisitos legales aplicables.': 'Where required, we process personal information on the basis of consent, legitimate interests, pre-contractual steps, or applicable legal requirements.',
    '3. Durante cuánto tiempo la conservamos y quién puede acceder': '3. How Long We Keep It and Who May Access It',
    'No conservamos la información personal durante más tiempo del necesario para la finalidad para la que fue recopilada o para cumplir con los requisitos legales aplicables.': 'We do not keep personal information longer than necessary for the reason it was collected or for any applicable legal requirements.',
    'El acceso se limita a quienes necesitan la información para fines comerciales legítimos. Cuando sea necesario, también podremos compartirla con proveedores de servicios o autoridades sobre una base legal adecuada.': 'Access is limited to those who need the information for legitimate business purposes. Where necessary, information may also be shared with service providers or authorities under an appropriate legal basis.',
    '4. Tu información, tus opciones': '4. Your Information, Your Choices',
    'Según la legislación aplicable, podés pedirnos que te proporcionemos, corrijamos, eliminemos, limitemos o transfiramos tu información personal, u oponerte a determinados usos de tus datos.': 'Depending on applicable law, you may ask us to provide, correct, delete, restrict, or transfer your personal information, or object to certain ways we use it.',
    'Si nos diste tu consentimiento para tratar tu información, podés retirarlo. También podés tener derecho a dirigirte a la autoridad de protección de datos correspondiente.': 'If you have given us consent to process your information, you can withdraw it. You may also have the right to contact the relevant data protection authority.',
    '5. Cómo protegemos tu información': '5. Keeping Your Information Safe',
    'Aplicamos medidas de protección razonables para proteger la información personal frente a pérdidas, accesos no autorizados, uso indebido o modificaciones.': 'We use reasonable safeguards designed to protect personal information against loss, unauthorized access, misuse, or alteration.',
    'Podemos actualizar esta política cuando cambien nuestros servicios, nuestro sitio web o nuestras prácticas de gestión de datos. La versión más reciente estará siempre disponible en esta página.': 'We may revise this policy when our services, website, or data practices change. The latest version will always be published on this page.',

    'Estos Términos de Uso explican las condiciones aplicables cuando visitás y utilizás el sitio web de CuatroSupport.': 'These Terms of Use explain the conditions that apply when you visit and use the CuatroSupport website.',
    'Este sitio web ofrece información sobre CuatroSupport, nuestro enfoque y los servicios de soporte y operaciones que ofrecemos. Al utilizar el sitio, aceptás cumplir con estos términos y utilizar su contenido de manera responsable.': 'This website provides information about CuatroSupport, our approach, and the support and operational services we offer. By using the website, you agree to follow these terms and use its content responsibly.',
    'Responsable: CuatroSupport. Podés enviar cualquier consulta sobre estos términos a través de los canales oficiales de contacto disponibles en este sitio web.': 'Responsible party: CuatroSupport. Questions regarding these terms can be submitted through the official contact channels available on this website.',
    '1. Uso de este sitio web': '1. Using This Website',
    'Podés utilizar este sitio web para conocer CuatroSupport, explorar nuestros servicios y contactarnos sobre tus necesidades de soporte u operaciones.': 'You may use this website to learn about CuatroSupport, explore our services, and contact us about your support or operational needs.',
    'Aceptás no hacer un uso indebido del sitio, interferir con su funcionamiento, intentar acceder sin autorización ni utilizar su contenido con fines ilícitos.': 'You agree not to misuse the website, disrupt its operation, attempt unauthorized access, or use its content for unlawful purposes.',
    '2. Nuestros servicios y el contenido del sitio': '2. Our Services and Website Content',
    'La información de este sitio ofrece una descripción general de lo que hace CuatroSupport y cómo trabajamos. Su objetivo es ayudarte a comprender nuestros servicios y no constituye por sí sola un acuerdo de prestación de servicios ni otra relación contractual.': 'The information on this website provides a general overview of what CuatroSupport does and how we work. It is intended to help you understand our services and does not by itself create a service agreement or other contractual relationship.',
    'Los servicios específicos, las responsabilidades, el alcance, los plazos y las condiciones comerciales se acordarán por separado cuando corresponda.': 'Specific services, responsibilities, scope, timelines, and commercial terms will be agreed separately where applicable.',
    '3. Propiedad y uso del contenido': '3. Ownership and Use of Content',
    'Los textos, diseños, gráficos, elementos de marca y demás materiales presentados en este sitio pertenecen a CuatroSupport o se utilizan con las autorizaciones correspondientes.': 'The text, design, graphics, branding, and other materials presented on this website belong to CuatroSupport or are used with the appropriate permissions.',
    'Podés consultar y utilizar el sitio para la finalidad prevista, pero su contenido no puede copiarse, modificarse, distribuirse, volver a publicarse ni utilizarse comercialmente sin autorización previa.': 'You may view and use the website for its intended purpose, but its content may not be copied, modified, distributed, republished, or used commercially without prior authorization.',
    '4. Disponibilidad y recursos de terceros': '4. Availability and Third-Party Resources',
    'Trabajamos para mantener el sitio accesible y su información útil, pero su disponibilidad puede interrumpirse ocasionalmente y el contenido puede cambiar a medida que evolucionan nuestros servicios.': 'We work to keep the website accessible and its information useful, but availability may occasionally be interrupted and content may change as our services evolve.',
    'Cuando incluimos enlaces a sitios web o recursos de terceros, los ofrecemos por conveniencia o como información adicional. CuatroSupport no controla esos recursos externos ni su contenido.': 'Where we provide links to third-party websites or resources, they are offered for convenience or additional information. CuatroSupport does not control those external resources or their content.',
    '5. Responsabilidad': '5. Responsibility',
    'El sitio web y su contenido se ofrecen con fines informativos generales. Las decisiones relacionadas con servicios específicos de soporte u operaciones deben basarse en las condiciones acordadas directamente con CuatroSupport.': 'The website and its content are provided for general informational purposes. Decisions related to specific support or operational services should be based on the terms agreed directly with CuatroSupport.',
    'En la medida permitida por la legislación aplicable, CuatroSupport no se responsabiliza por pérdidas derivadas del uso indebido del sitio, su indisponibilidad temporal o la confianza depositada en recursos de terceros.': 'To the extent permitted by applicable law, CuatroSupport is not responsible for losses resulting from misuse of the website, temporary unavailability, or reliance on third-party resources.',
    '6. Normativa aplicable': '6. Applicable Rules',
    'Estos Términos de Uso se rigen e interpretan de acuerdo con las leyes y normativas aplicables a CuatroSupport y al uso de este sitio web.': 'These Terms of Use are governed and interpreted in accordance with the laws and regulations applicable to CuatroSupport and the use of this website.',
    'Cualquier disputa o asunto legal relacionado con estos términos se tratará a través de las vías competentes previstas por la legislación aplicable.': 'Any dispute or legal matter related to these terms will be addressed through the competent channels required under applicable law.',
    '7. Cambios en estos términos': '7. Changes to These Terms',
    'Podemos revisar estos Términos de Uso cuando cambien el sitio web, nuestros servicios o los requisitos aplicables.': 'We may revise these Terms of Use when the website, our services, or applicable requirements change.',
    'La versión vigente estará publicada en esta página, por lo que te recomendamos consultarla cuando necesites conocer las condiciones más recientes aplicables al sitio web.': 'The current version will be published on this page, so we recommend checking it when you need the latest information about the terms that apply to the website.',

    'Información legal y de la empresa': 'Legal & Company Information', 'Información de la empresa y políticas.': 'Company information and policies.',
    'Encontrá información clave sobre CuatroSupport, nuestras políticas del sitio web y los canales oficiales para comunicarte con nosotros.': 'Find key information about CuatroSupport, our website policies, and the official channels for getting in touch with us.',
    'Sobre CuatroSupport': 'About CuatroSupport',
    'CuatroSupport ayuda a las empresas a desarrollar y fortalecer sus operaciones de atención al cliente mediante procesos estructurados, equipos capacitados, estándares de calidad y soporte operativo continuo.': 'CuatroSupport helps businesses build and strengthen customer support operations through structured processes, trained teams, quality standards, and ongoing operational support.',
    'Los datos oficiales de registro y otra información de la empresa se publicarán aquí cuando estén disponibles.': 'Official registration details and other company information will be published here once available.',
    'Políticas del sitio': 'Website Policies', 'Consultá las políticas que explican cómo puede utilizarse este sitio web y cómo se gestiona la información personal.': 'Review the policies that explain how this website can be used and how personal information is handled.',
    'Contacto oficial': 'Official Contact', 'Para consultas sobre nuestros servicios, información de la empresa u otras comunicaciones oficiales, utilizá los canales de contacto disponibles en este sitio web.': 'For service inquiries, company information, or other official communication, please use the contact channels provided on this website.'
  };

  const i18nEntries = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (node.parentElement?.closest('[data-language-switch], script, style')) continue;
    const source = node.nodeValue.trim().replace(/\s+/g, ' ');
    const translated = translations[source];
    if (!translated) continue;
    const leading = node.nodeValue.match(/^\s*/)?.[0] || '';
    const trailing = node.nodeValue.match(/\s*$/)?.[0] || '';
    i18nEntries.push({ node, es: `${leading}${source}${trailing}`, en: `${leading}${translated}${trailing}` });
  }

  const languageSwitch = document.createElement('div');
  languageSwitch.className = 'language-switch';
  languageSwitch.dataset.languageSwitch = '';
  languageSwitch.setAttribute('role', 'group');
  languageSwitch.innerHTML = '<button type="button" data-language="es">ES</button><button type="button" data-language="en">EN</button>';
  themeToggle?.before(languageSwitch);

  const titles = {
    'index.html': 'Cuatro Support — B2B Support Solutions',
    'about.html': 'Company — CuatroSupport',
    'services.html': 'Services — CuatroSupport',
    'portfolio.html': 'Solutions — CuatroSupport',
    'process.html': 'Operations — CuatroSupport',
    'contact.html': 'Contact — CuatroSupport',
    'privacy-policy.html': 'Privacy Policy — CuatroSupport',
    'terms-of-use.html': 'Terms of Use — CuatroSupport',
    'documents.html': 'Company Information — CuatroSupport'
  };
  const spanishTitle = document.title;

  const syncLanguageControls = (language) => {
    const english = language === 'en';
    languageSwitch.setAttribute('aria-label', english ? 'Select language' : 'Seleccionar idioma');
    languageSwitch.querySelectorAll('button').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
    const lightTarget = root.dataset.theme === 'dark';
    themeToggle?.setAttribute('aria-label', lightTarget ? (english ? 'Activate light mode' : 'Activar modo claro') : (english ? 'Activate dark mode' : 'Activar modo oscuro'));
    menuToggle?.setAttribute('aria-label', menu?.classList.contains('is-open') ? (english ? 'Close menu' : 'Cerrar menú') : (english ? 'Open menu' : 'Abrir menú'));
  };

  const setLanguage = (language) => {
    const next = language === 'en' ? 'en' : 'es';
    root.lang = next;
    root.dataset.language = next;
    i18nEntries.forEach((entry) => { entry.node.nodeValue = entry[next]; });
    document.title = next === 'en' ? (titles[page] || spanishTitle) : spanishTitle;
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
