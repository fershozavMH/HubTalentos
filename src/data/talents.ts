export type TalentId = "arylene" | "yuri" | "manuel" | "carel" | "julio" | "fernando";

export type AreaId =
  | "estructura"
  | "finanzas"
  | "comercial"
  | "legal"
  | "marketing"
  | "branding"
  | "cliente"
  | "liderazgo"
  | "software"
  | "automatizacion";

export type Talent = {
  id: TalentId;
  name: string;
  firstName: string;
  /** Etiqueta superior en mayúsculas */
  field: string;
  role: string;
  credentials?: string[];
  quote: string;
  bio: string[];
  services: { title?: string; text: string }[];
  collaborationsLabel: string;
  collaborations: string;
  highlight?: string;
  photo: string;
  /** Áreas del hub que cubre, según los servicios descritos en su ficha */
  areas: AreaId[];
};

export const founder = {
  name: "Gabriel Iván Buchanan",
  firstName: "Gabriel",
  field: "Fundador y coordinador",
  brand: "Hub de Talentos",
  quote: "El talento correcto, sin perder tiempo buscándolo.",
  bio: [
    "Ayudo a dueños de negocio a dejar de perder tiempo buscando agencias, freelancers o soluciones improvisadas.",
    "Diagnostico su estructura actual, detecto qué está frenando su crecimiento y los conecto con los talentos adecuados de mi red. Desde la primera entrevista identifico el momento real de la empresa, qué necesita para avanzar y quién puede resolverlo con precisión.",
    "Así elimino la incertidumbre de la prospección y evito contrataciones sin dirección, construyendo una base sólida para crecer con estrategia, orden y resultados medibles.",
    "No es que el dueño desconozca lo que su empresa necesita: él la visionó, la empezó y la dirige. Pero opera sin una estructura ni un equipo que comparta esa visión, y el tiempo no le alcanza. Ahí entramos: nos integramos como uno más de la empresa, ordenamos y automatizamos procesos, y dejamos al equipo listo para operar como se debe. Al final, el crecimiento es de todos.",
  ],
  trajectory: [
    "Director General de Machinery Hunters (actual), empresa líder en venta de maquinaria en México",
    "Socio comercial de Sistemas Solares de Sonora (reciente), con 15 años de experiencia en energía renovable",
    "Podcaster en temas empresariales con Trend Minds Podcast",
  ],
  photo: "/talents/gabriel.jpg",
};

export const talents: Talent[] = [
  {
    id: "arylene",
    name: "Arylene Clark",
    firstName: "Arylene",
    field: "Legal",
    role: "Propiedad Intelectual y Derecho Digital",
    credentials: ["Socia Directora de ĀRICE Estudio Legal"],
    quote: "Protejo lo que más vale en tu empresa y que muchas veces no se ve.",
    bio: [
      "Audito los activos intangibles de la empresa (marcas, obras, dominios, trade dress), defino la estrategia de registro y defensa ante el IMPI, y blindo su operación digital con contratos, términos y condiciones, avisos de privacidad y lineamientos de publicidad.",
      "Así el negocio crece sin exponerse a copias, disputas o multas, con la certeza de que su marca le pertenece.",
    ],
    services: [
      { text: "Portafolio de intangibles: auditoría de marcas, obras, dominios y trade dress" },
      { text: "Marcas: estrategia, registro, licenciamiento y defensa ante el IMPI" },
      { text: "Contratos especializados en economía digital y propiedad intelectual" },
      { text: "Políticas web, compliance digital y privacidad" },
      { text: "Formación in-house en P.I. y derecho digital" },
    ],
    collaborationsLabel: "Clientes",
    collaborations:
      "Por confidencialidad, los nombres de sus clientes se mantienen en reserva.",
    photo: "/talents/arylene.jpg",
    areas: ["legal"],
  },
  {
    id: "yuri",
    name: "Yuri Ramírez",
    firstName: "Yuri",
    field: "Arquitectura empresarial",
    role: "Consultoría Integral y Desarrollo Organizacional",
    credentials: [
      "Fundadora de YR Asesoría Empresarial",
      "Creadora de No Más Fuegos™ · MBA · Ingeniera Industrial",
    ],
    quote: "De apagar fuegos a dirigir tu empresa.",
    bio: [
      "Acompaño a dueños de negocio que ya crecieron pero siguen atrapados en la operación: todo pasa por ellos y cada semana aparece un fuego nuevo.",
      "Trabajo la empresa completa y por etapas: planeación estratégica, estructura administrativa, ventas y liderazgo. No entrego un diagnóstico para archivar. Implemento las nuevas estructuras junto con el equipo y las sostengo con desarrollo continuo, hasta que el negocio funciona sin depender del dueño para todo. Este método nació de operar empresas reales, y hoy se llama No Más Fuegos™.",
    ],
    services: [
      {
        title: "Consultoría VIP",
        text: "implementación integral dentro de tu empresa (estrategia, administración, ventas y liderazgo). Duración mínima de 12 meses.",
      },
      {
        title: "Mentoría No Más Fuegos™",
        text: "programa por etapas para dueños que quieren salir de la operación y dirigir.",
      },
      {
        title: "Programas individuales",
        text: "un área específica a la vez, como Planea como los Grandes, Tu Negocio Tus Reglas o Conecta y Vende.",
      },
      {
        title: "Capacitación in-company",
        text: "talleres para líderes y equipos.",
      },
    ],
    collaborationsLabel: "Ha colaborado con",
    collaborations:
      "Machinery Hunters (Sonora), Cosamed (Sonora), Pagoni (Sinaloa), SIMAC (Yucatán), LUESTE (CDMX) y SSGA (Michoacán).",
    highlight:
      "Más de 100 dueños de negocio han pasado por la Mentoría No Más Fuegos™.",
    photo: "/talents/yuri.jpg",
    areas: ["estructura", "comercial", "liderazgo"],
  },
  {
    id: "manuel",
    name: "Manuel Carrillo",
    firstName: "Manuel",
    field: "Consultoría y dirección",
    role: "Consultor y Formador · Innovación Comercial",
    credentials: ["Contador Público · Maestría en Mercadotecnia · MBA"],
    quote: "Una empresa no solo necesita crecer: necesita sostener ese crecimiento.",
    bio: [
      "Acompaño a emprendedores, MIPYMES y empresas familiares a ordenar su operación, profesionalizar sus procesos y liderar con propósito.",
      "Fui gerente general y director comercial en la industria automotriz y de maquinaria pesada, y doy clases en programas de maestría y MBA. No llego con fórmulas: trabajo hombro a hombro para ordenar lo que ya tienes y construir lo que falta.",
    ],
    services: [
      { text: "Diseño organizacional integral" },
      { text: "Gestión financiera integral: P&L y presupuesto" },
      { text: "Diseño comercial estratégico" },
      { text: "Mentoría De la Operación a la Dirección" },
      { text: "Programa Acting Director de 12 meses" },
      { text: "Talleres de servicio al cliente, liderazgo e innovación" },
    ],
    collaborationsLabel: "Ha colaborado con",
    collaborations:
      "Grupo Cadena, Alarmas de San Luis, Jaumex, Maenca, Maderería y Ferretería Río Colorado, Fetasa, Impresiones Carrillo, Printer Boy, Multiservicios, Skycell y Manzo Seguros. Trayectoria en Kenworth, Mazda, BMW y Machinery Hunters.",
    photo: "/talents/manuel.jpg",
    areas: ["estructura", "finanzas", "comercial", "cliente", "liderazgo"],
  },
  {
    id: "carel",
    name: "Carel Medina",
    firstName: "Carel",
    field: "Marketing digital",
    role: "Marketing Digital · Performance e IA aplicada",
    quote: "Tu inversión en publicidad, convertida en clientes reales.",
    bio: [
      "Diseño y optimizo estrategias completas de crecimiento que integran Meta Ads, Google Ads y SEO, apoyadas en inteligencia artificial aplicada a la adquisición de clientes.",
      "Cada mes analizo resultados, hago pruebas controladas y ajusto. Mi enfoque combina visión estratégica con ejecución técnica: estructuras que escalan, campañas que convierten y métricas que respaldan cada decisión.",
    ],
    services: [
      { text: "Estrategia de crecimiento digital integral" },
      { text: "Campañas en Meta Ads (Facebook e Instagram)" },
      { text: "Campañas en Google Ads" },
      { text: "Posicionamiento SEO" },
      { text: "IA aplicada a la captación de clientes" },
      { text: "Análisis mensual, pruebas A/B y optimización continua" },
      { text: "Talleres personalizados para empresas, equipos y profesionales" },
    ],
    collaborationsLabel: "Ha colaborado con",
    collaborations:
      "Machinery Hunters (maquinaria pesada B2B), Printer Boy, ESSI, Yuri Ramírez (marca personal y productos digitales) y Venus Dentistry (sector dental).",
    photo: "/talents/carel.jpg",
    areas: ["marketing"],
  },
  {
    id: "julio",
    name: "Julio Maldonado",
    firstName: "Julio",
    field: "Marca y creatividad",
    role: "Director Creativo · Fundador de Lumen",
    credentials: ["Branding Architect · Fractional Advisor"],
    quote: "Tu comunicación, convertida en resultados de negocio.",
    bio: [
      "Construyo sistemas de branding, contenido y adquisición que combinan estrategia, storytelling, publicidad digital e inteligencia artificial.",
      "Mi enfoque une visión creativa, pensamiento estratégico y ejecución. Trabajo como aliado externo de empresas que necesitan dirección de marca y crecimiento.",
    ],
    services: [
      { text: "Estrategia y arquitectura de marca" },
      { text: "Dirección creativa y storytelling" },
      { text: "Sistemas de contenido" },
      { text: "Publicidad digital y adquisición de clientes" },
      { text: "Asesoría fraccional: dirección de marketing externa" },
    ],
    collaborationsLabel: "Ha colaborado con",
    collaborations:
      "Machinery Hunters, Casas Cadena, One Mini Bodegas, Soluciones Portátiles, Laboratorio Castillo, Orus Dental, AVA Smile Studio, RPM, Colorium, Printer Boy y Renewable Power USA, además de proyectos de marca personal.",
    photo: "/talents/julio.jpg",
    areas: ["marketing", "branding"],
  },
  {
    id: "fernando",
    name: "Fernando Zavala",
    firstName: "Fernando",
    field: "Tecnología",
    role: "Software a la Medida · Automatización e IA",
    credentials: ["Líder de Tecnología en Machinery Hunters · Fundador de Onvexa"],
    quote: "Que tu empresa corra con sistemas, no con hojas de cálculo.",
    bio: [
      "Ayudo a negocios de cualquier sector a resolver sus necesidades tecnológicas: sitios web, sistemas a la medida, automatización de procesos e inteligencia artificial aplicada a sus propios datos.",
      "Con Onvexa, mi agencia de software, primero entiendo cómo trabaja tu negocio y después construyo solo lo que hace falta: soluciones claras, con tecnologías modernas, que tu equipo realmente use.",
    ],
    services: [
      { text: "Sitios web y landing pages profesionales" },
      { text: "Sistemas a la medida: citas en línea, catálogos y paneles de control" },
      { text: "Aplicaciones web y móviles" },
      { text: "Automatización de procesos e integración entre herramientas" },
      { text: "Recolección y análisis de datos" },
      { text: "IA aplicada: asistentes que responden con los datos de tu empresa" },
    ],
    collaborationsLabel: "Su agencia",
    collaborations:
      "Onvexa: software a la medida, automatización e IA para negocios de cualquier sector.",
    photo: "/talents/fernando.jpg",
    areas: ["software", "automatizacion"],
  },
];

export const areas: { id: AreaId; label: string }[] = [
  { id: "estructura", label: "Estructura organizacional" },
  { id: "comercial", label: "Estrategia comercial y ventas" },
  { id: "marketing", label: "Marketing digital y performance" },
  { id: "cliente", label: "Experiencia del cliente" },
  { id: "finanzas", label: "Finanzas y control" },
  { id: "legal", label: "Legal: marcas y derecho digital" },
  { id: "branding", label: "Branding y contenido" },
  { id: "liderazgo", label: "Liderazgo y dirección" },
  { id: "software", label: "Sitios web y software a la medida" },
  { id: "automatizacion", label: "Automatización, datos e IA" },
];

export const stages = [
  {
    title: "Diagnóstico",
    text: "Una plática de confianza para identificar la etapa de tu empresa y qué está frenando su crecimiento.",
  },
  {
    title: "Conexión",
    text: "Te acerco al especialista probado que resuelve justo lo que necesitas.",
  },
  {
    title: "Acompañamiento",
    text: "Plan estratégico bajado a agenda, como un director externo, por 3, 6, 12 meses o más.",
  },
];

export const reasons = [
  {
    title: "Talentos probados",
    text: "Especialistas con los que he trabajado en empresas reales.",
  },
  {
    title: "Sin riesgos ni rodeos",
    text: "Ahorras prospección y evitas a desconocidos o improvisados.",
  },
  {
    title: "Un solo contacto",
    text: "Coordino la relación durante todo el proceso.",
  },
];

export const contact = {
  whatsappDisplay: "653 127 0152",
  whatsappNumber: "526531270152",
  email: "gabrielivanbuchanan@gmail.com",
  instagram: "@soygabrielbuchanan",
  instagramUrl: "https://www.instagram.com/soygabrielbuchanan",
  facebook: "Gabriel Ivan",
  linkedin: "Gabriel Ivan",
  note: "Todo el contacto con nuestros talentos se coordina a través de Gabriel.",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const talentById = Object.fromEntries(
  talents.map((t) => [t.id, t]),
) as Record<TalentId, Talent>;
