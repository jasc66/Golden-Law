import type { SiteProfile } from "../types";

/**
 * Perfil: Golden Law — Licda. Kristel Godínez Jiménez.
 * Fuente: sitio anterior (v0-next-js-project-requirements-bay-five.vercel.app).
 * Todo lo marcado con `placeholder: true` o entre [corchetes] está pendiente de confirmar con el bufete.
 */

const U = (id: string) => `https://images.unsplash.com/${id}?w=1200&q=70&auto=format&fit=crop`;

export const goldenLaw: SiteProfile = {
  brand: {
    name: "Golden Law",
    wordmark: ["Golden", "Law"],
    monogram: "G",
    legalName: "Golden Law — Licda. Kristel Godínez Jiménez",
    tagline: "Protegemos sus derechos con experiencia",
    description:
      "Servicios legales y notariales con la Licda. Kristel Godínez Jiménez, abogada y notaria en San José, Costa Rica. Escrituras, sociedades, compraventas y asesoría jurídica.",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "es",
  hero: {
    eyebrow: "Abogacía y notariado · San José, Costa Rica",
    title: "Defensa legal y notarial",
    titleEmphasis: "con criterio y rigor.",
    subtitle:
      "Licda. Kristel Godínez Jiménez, abogada y notaria. Escrituras, sociedades, compraventas y asesoría jurídica con un plan claro desde la primera reunión.",
    micro: ["Primera consulta sin costo", "Respuesta en 24 h", "Confidencial"],
  },
  contact: {
    phone: "+50687299222",
    phoneDisplay: "+506 8729-9222",
    whatsapp: "50687299222",
    email: "goldenlawcr@gmail.com",
    hours: [
      { days: "Lunes a viernes", time: "8:00 – 17:00" },
      { days: "Sábado", time: "9:00 – 12:00" },
      { days: "Domingo", time: "Cerrado" },
    ],
    responseTime: "Respondemos en menos de 24 horas hábiles",
    videoCall: true,
  },
  offices: [
    {
      name: "San José",
      street: "Edificio Centro Colón",
      city: "San José",
      region: "San José",
      country: "Costa Rica",
      countryCode: "CR",
      mapQuery: "Edificio Centro Colón, San José, Costa Rica",
    },
  ],
  social: [],
  stats: [
    { value: 10, suffix: "+", label: "Años de experiencia", placeholder: true },
    { value: 200, suffix: "+", label: "Casos atendidos", placeholder: true },
    { value: 98, suffix: "%", label: "Clientes satisfechos", placeholder: true },
    { value: 24, suffix: " h", label: "Tiempo máximo de respuesta" },
  ],
  areas: [
    {
      slug: "servicios-notariales",
      name: "Servicios notariales",
      short: "Escrituras, poderes, autenticaciones y trámites notariales.",
      icon: "pen",
      image: U("photo-1450101499163-c8848c66ca85"),
      intro:
        "Damos fe pública a sus actos y contratos para que tengan plena validez ante el Registro Nacional, bancos e instituciones. Revisamos cada documento antes de firmar para que sepa exactamente qué está otorgando.",
      covers: [
        "Escrituras públicas y protocolizaciones",
        "Poderes generalísimos, generales, especiales y judiciales",
        "Autenticación de firmas y certificaciones",
        "Declaraciones juradas y actas notariales",
        "Testamentos",
        "Trámites de inscripción ante el Registro Nacional",
      ],
      situations: [
        "Necesita que alguien firme o haga trámites en su nombre mientras está fuera del país.",
        "Un banco o institución le pide un documento autenticado o una certificación notarial.",
        "Quiere dejar por escrito cómo se distribuirán sus bienes.",
      ],
      process: [
        { title: "Revisión", text: "Nos cuenta qué necesita y revisamos los documentos y datos registrales." },
        { title: "Borrador", text: "Preparamos el documento y se lo explicamos en lenguaje sencillo antes de firmar." },
        { title: "Firma", text: "Firma en la oficina o, cuando la ley lo permite, coordinamos otra modalidad." },
        { title: "Inscripción", text: "Presentamos el documento donde corresponda y le avisamos cuando queda inscrito." },
      ],
      fees:
        "Los honorarios notariales se rigen por el arancel vigente del Colegio de Abogados y Abogadas de Costa Rica. Antes de empezar le damos un presupuesto por escrito que separa honorarios, timbres e impuestos.",
      faqs: [
        {
          q: "¿Qué tipo de poder necesito?",
          a: "Depende de lo que la otra persona deba hacer. Un poder especial sirve para un acto concreto; uno general o generalísimo da facultades más amplias. En la consulta le recomendamos el mínimo necesario para proteger su patrimonio.",
        },
        {
          q: "¿Qué debo llevar a la firma?",
          a: "Su documento de identidad vigente y los documentos relacionados con el acto (por ejemplo, el número de finca o la cédula jurídica). Le enviamos la lista exacta antes de la cita.",
        },
      ],
      leads: ["kristel-godinez"],
    },
    {
      slug: "asesoria-legal",
      name: "Asesoría jurídica",
      short: "Orientación legal integral en distintas áreas del derecho.",
      icon: "scale",
      image: U("photo-1589829545856-d10d557cf95f"),
      intro:
        "Le explicamos su situación jurídica, sus opciones y los riesgos de cada una, para que decida con información completa. Si su caso requiere un especialista en otra materia, se lo decimos desde el inicio.",
      covers: [
        "Consultas y dictámenes legales",
        "Redacción y revisión de contratos",
        "Cobros y negociación extrajudicial",
        "Acompañamiento en trámites administrativos",
        "Representación en procesos civiles",
      ],
      situations: [
        "Le pidieron firmar un contrato y quiere saber qué implica.",
        "Le deben dinero y quiere intentar recuperarlo sin ir a juicio.",
        "Recibió una notificación y no sabe qué plazo tiene para responder.",
      ],
      process: [
        { title: "Consulta", text: "Escuchamos su caso y revisamos los documentos que tenga." },
        { title: "Estrategia", text: "Le presentamos opciones, costos estimados y tiempos realistas." },
        { title: "Representación", text: "Actuamos en su nombre y le informamos de cada avance." },
        { title: "Cierre", text: "Le entregamos los documentos finales y un resumen de lo resuelto." },
      ],
      fees:
        "Trabajamos con tarifa por consulta, por servicio cerrado o por etapa del proceso, según el caso. Siempre acordamos el monto por escrito antes de empezar.",
      faqs: [
        {
          q: "¿La primera consulta tiene costo?",
          a: "No. La primera consulta sirve para entender su caso y explicarle las opciones. Si decide continuar, le enviamos una propuesta de honorarios.",
        },
        {
          q: "¿Pueden atenderme por videollamada?",
          a: "Sí. Puede agendar la consulta en línea y enviarnos los documentos de forma segura antes de la reunión.",
        },
      ],
      leads: ["kristel-godinez"],
    },
    {
      slug: "derecho-corporativo",
      name: "Derecho corporativo",
      short: "Constitución de empresas, contratos comerciales y cumplimiento.",
      icon: "building",
      image: U("photo-1497366216548-37526070297c"),
      intro:
        "Acompañamos a emprendedores y empresas desde la constitución de la sociedad hasta su operación diaria: contratos, actas, cambios societarios y obligaciones registrales.",
      covers: [
        "Constitución de sociedades anónimas y de responsabilidad limitada",
        "Libros legales, actas de asamblea y cambios de junta directiva",
        "Contratos comerciales, de servicios y de confidencialidad",
        "Registro de Transparencia y Beneficiarios Finales",
        "Fusiones, disoluciones y liquidaciones",
      ],
      situations: [
        "Va a iniciar un negocio y no sabe qué tipo de sociedad le conviene.",
        "Necesita actualizar la junta directiva o el capital social.",
        "Su empresa va a firmar un contrato importante con un proveedor o cliente.",
      ],
      process: [
        { title: "Diagnóstico", text: "Entendemos su modelo de negocio y sus socios." },
        { title: "Estructura", text: "Recomendamos la figura societaria y los pactos entre socios." },
        { title: "Constitución", text: "Redactamos, firmamos e inscribimos ante el Registro Nacional." },
        { title: "Acompañamiento", text: "Le recordamos obligaciones periódicas y atendemos cambios." },
      ],
      fees:
        "Constituciones y trámites societarios con tarifa cerrada. Para empresas en operación ofrecemos un plan mensual de asesoría. [Monto por definir con el bufete]",
      faqs: [
        {
          q: "¿Cuánto tarda constituir una sociedad?",
          a: "Depende de la carga del Registro Nacional y de que los socios tengan sus documentos listos. En la consulta le damos un estimado actualizado.",
        },
        {
          q: "¿Qué obligaciones tiene una sociedad después de inscrita?",
          a: "Entre otras, mantener los libros legales, presentar la declaración de beneficiarios finales y cumplir con las obligaciones tributarias. Le entregamos un calendario con las fechas clave.",
        },
      ],
      leads: ["kristel-godinez"],
    },
    {
      slug: "derecho-inmobiliario",
      name: "Derecho inmobiliario",
      short: "Compraventas, hipotecas, escrituras y trámites de propiedades.",
      icon: "home",
      image: U("photo-1560518883-ce09059eeffa"),
      intro:
        "Revisamos la situación registral de la propiedad antes de que usted pague, redactamos la escritura y la inscribimos. El objetivo es que compre o venda sin sorpresas.",
      covers: [
        "Estudio registral y catastral de la propiedad",
        "Opciones de compra y contratos de arras",
        "Escrituras de compraventa, donación y traspaso",
        "Constitución y cancelación de hipotecas",
        "Segregaciones y reuniones de fincas",
        "Contratos de arrendamiento",
      ],
      situations: [
        "Encontró una propiedad y quiere saber si tiene gravámenes o anotaciones.",
        "Va a firmar con el banco un crédito hipotecario.",
        "Quiere traspasar una propiedad a un familiar.",
      ],
      process: [
        { title: "Estudio", text: "Revisamos el registro, el plano catastrado y los gravámenes." },
        { title: "Contrato", text: "Redactamos la opción o el contrato con las condiciones pactadas." },
        { title: "Escritura", text: "Firmamos la escritura y calculamos impuestos y timbres." },
        { title: "Inscripción", text: "Inscribimos en el Registro Nacional y le entregamos la certificación." },
      ],
      fees:
        "Según el arancel del Colegio de Abogados y Abogadas de Costa Rica, calculado sobre el valor de la operación. El presupuesto separa honorarios, impuesto de traspaso y timbres.",
      faqs: [
        {
          q: "¿Por qué es importante el estudio registral?",
          a: "Porque muestra si la propiedad tiene hipotecas, embargos, servidumbres u otras anotaciones que pueden afectar la compra. Se hace antes de entregar cualquier dinero.",
        },
        {
          q: "¿Quién paga los gastos de traspaso?",
          a: "Lo definen las partes en el contrato. Le explicamos las opciones habituales para que lo negocie con información.",
        },
      ],
      leads: ["kristel-godinez"],
    },
  ],
  team: [
    {
      slug: "kristel-godinez",
      name: "Licda. Kristel Godínez Jiménez",
      role: "Abogada y notaria",
      photo: null,
      areas: ["servicios-notariales", "asesoria-legal", "derecho-corporativo", "derecho-inmobiliario"],
      languages: ["Español", "[Otros idiomas por confirmar]"],
      office: "San José",
      license: "Carné del Colegio de Abogados: [por confirmar]",
      bio: [
        "Abogada y notaria al frente de Golden Law, con práctica en servicios legales y notariales para personas y empresas.",
        "[Biografía ampliada por confirmar con la Licda. Godínez: trayectoria, enfoque de trabajo y casos representativos.]",
      ],
      education: ["[Universidad y título por confirmar]", "[Posgrados o especializaciones por confirmar]"],
      highlights: ["[Casos o logros relevantes por confirmar, sin datos confidenciales de clientes]"],
      email: "goldenlawcr@gmail.com",
      phone: "+50687299222",
      placeholder: true,
    },
  ],
  cases: [
    { id: "c1", area: "derecho-inmobiliario", title: "Compraventa con gravamen no declarado", outcome: "[Resultado de ejemplo: se detectó la anotación antes de la firma y se renegoció el precio.]", year: 2025, placeholder: true },
    { id: "c2", area: "derecho-corporativo", title: "Constitución de sociedad familiar", outcome: "[Resultado de ejemplo: estructura con pacto de socios e inscripción completa.]", year: 2025, placeholder: true },
    { id: "c3", area: "servicios-notariales", title: "Poder especial para cliente en el extranjero", outcome: "[Resultado de ejemplo: trámite completado sin que el cliente viajara.]", year: 2024, placeholder: true },
    { id: "c4", area: "asesoria-legal", title: "Cobro extrajudicial a proveedor", outcome: "[Resultado de ejemplo: acuerdo de pago firmado sin llegar a juicio.]", year: 2024, placeholder: true },
  ],
  testimonials: [],
  affiliations: [
    { name: "Colegio de Abogados y Abogadas de Costa Rica", detail: "Miembro activo · [carné por confirmar]", placeholder: true },
    { name: "Dirección Nacional de Notariado", detail: "Notaria pública habilitada · [por confirmar]", placeholder: true },
  ],
  process: [
    { title: "Consulta", text: "Nos cuenta su situación. La primera consulta es sin costo y confidencial." },
    { title: "Estrategia", text: "Le explicamos sus opciones, el costo y el tiempo estimado de cada una." },
    { title: "Representación", text: "Preparamos los documentos y actuamos en su nombre ante quien corresponda." },
    { title: "Resultado", text: "Cerramos el trámite y le entregamos todo por escrito, sin cabos sueltos." },
  ],
  faqs: [
    {
      q: "¿La primera consulta tiene costo?",
      a: "No. La usamos para entender su caso y explicarle las opciones. Si decide continuar, le enviamos una propuesta de honorarios por escrito.",
    },
    {
      q: "¿Cuánto tardan en responder?",
      a: "Respondemos en menos de 24 horas hábiles por teléfono, WhatsApp o correo.",
    },
    {
      q: "¿Lo que les cuento es confidencial?",
      a: "Sí. Toda la información que comparte con nosotros está protegida por el secreto profesional desde la primera conversación.",
    },
    {
      q: "¿Atienden fuera de San José?",
      a: "Atendemos por videollamada en todo el país y coordinamos firmas presenciales según el trámite.",
    },
    {
      q: "¿Este sitio me da asesoría legal?",
      a: "No. El contenido es informativo y no crea una relación abogado-cliente. Para analizar su caso, agende una consulta.",
    },
  ],
  posts: [
    {
      slug: "que-tipo-de-poder-necesito",
      title: "¿Qué tipo de poder necesito? Generalísimo, general o especial",
      excerpt: "Antes de firmar un poder conviene saber qué facultades está entregando. Le explicamos las diferencias en lenguaje sencillo.",
      author: "kristel-godinez",
      date: "2026-08-12",
      area: "servicios-notariales",
      body: [
        { type: "p", text: "Un poder es un documento por el que usted autoriza a otra persona (apoderado) a actuar en su nombre. En Costa Rica el Código Civil distingue varios tipos, y elegir el correcto protege su patrimonio." },
        { type: "h2", text: "Poder especial" },
        { type: "p", text: "Sirve para un acto concreto: por ejemplo, firmar la venta de una propiedad determinada o retirar un documento. Es el más acotado y, por eso, el más seguro cuando solo necesita resolver una gestión." },
        { type: "h2", text: "Poder general" },
        { type: "p", text: "Permite administrar bienes y realizar actos de administración ordinaria. No incluye, en principio, vender o gravar bienes." },
        { type: "h2", text: "Poder generalísimo" },
        { type: "p", text: "Da facultades amplias, incluida la de vender o hipotecar bienes. Debe otorgarse solo a alguien de absoluta confianza y, en lo posible, con límites claros." },
        { type: "h2", text: "Antes de firmar" },
        { type: "li", text: "Defina qué necesita que haga la otra persona y por cuánto tiempo." },
        { type: "li", text: "Pida que el poder tenga límites de suma o de actos cuando sea posible." },
        { type: "li", text: "Recuerde que puede revocarlo ante notario." },
        { type: "p", text: "Este artículo es informativo y no sustituye una consulta. Cada caso tiene particularidades que conviene revisar con una profesional." },
      ],
    },
    {
      slug: "comprar-propiedad-sin-sorpresas",
      title: "Cómo comprar una propiedad sin sorpresas: el estudio registral",
      excerpt: "Hipotecas, embargos o servidumbres pueden afectar su compra. Así se revisa una propiedad antes de pagar.",
      author: "kristel-godinez",
      date: "2026-07-03",
      area: "derecho-inmobiliario",
      body: [
        { type: "p", text: "Antes de entregar dinero por una propiedad, conviene revisar su situación en el Registro Nacional. A esta revisión se le llama estudio registral." },
        { type: "h2", text: "Qué se revisa" },
        { type: "li", text: "Quién es el propietario registral y si coincide con quien vende." },
        { type: "li", text: "Hipotecas, embargos, anotaciones o servidumbres." },
        { type: "li", text: "Que el plano catastrado corresponda con la finca y con lo que ve en el terreno." },
        { type: "h2", text: "Después del estudio" },
        { type: "p", text: "Con la información completa se negocian el precio y las condiciones, y se firma una opción de compra o directamente la escritura. Finalmente, la escritura se inscribe en el Registro Nacional." },
        { type: "p", text: "Este artículo es informativo y no sustituye una consulta." },
      ],
    },
    {
      slug: "sociedad-anonima-o-srl",
      title: "¿Sociedad anónima o de responsabilidad limitada? Cómo elegir",
      excerpt: "Las dos figuras más comunes para emprender en Costa Rica tienen diferencias prácticas. Le ayudamos a compararlas.",
      author: "kristel-godinez",
      date: "2026-05-21",
      area: "derecho-corporativo",
      body: [
        { type: "p", text: "La sociedad anónima (S.A.) y la sociedad de responsabilidad limitada (S.R.L.) son las figuras más usadas para iniciar un negocio. Ambas separan su patrimonio personal del de la empresa, pero se administran distinto." },
        { type: "h2", text: "Diferencias prácticas" },
        { type: "li", text: "La S.A. se administra con una junta directiva y su capital se divide en acciones." },
        { type: "li", text: "La S.R.L. se administra con uno o varios gerentes y su capital se divide en cuotas." },
        { type: "li", text: "La transmisión de acciones suele ser más sencilla que la de cuotas." },
        { type: "h2", text: "Cómo decidir" },
        { type: "p", text: "Depende de cuántos socios tendrá, si piensa recibir inversión y cómo quiere tomar decisiones. En la consulta revisamos su caso y le recomendamos la figura y los pactos entre socios." },
        { type: "p", text: "Este artículo es informativo y no sustituye una consulta." },
      ],
    },
  ],
  about: {
    story: [
      "Golden Law nace de la práctica de la Licda. Kristel Godínez Jiménez en servicios legales y notariales en San José.",
      "Trabajamos con personas, familias y empresas que buscan una asesora cercana: alguien que explique con claridad, responda rápido y cuide cada detalle del documento. [Historia ampliada por confirmar con el bufete.]",
    ],
    values: [
      { title: "Claridad", text: "Explicamos cada paso y cada costo antes de empezar." },
      { title: "Rigor", text: "Revisamos los documentos con el cuidado que exige la fe pública." },
      { title: "Cercanía", text: "Respondemos en menos de 24 horas y le mantenemos al tanto." },
      { title: "Confidencialidad", text: "Su información está protegida por el secreto profesional." },
    ],
  },
};
