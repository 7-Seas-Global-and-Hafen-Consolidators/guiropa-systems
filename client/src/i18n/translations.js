export const LANG_OPTIONS = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

const shared = {
  brands: {
    guiropa: {
      name: "GUIROPA RADIO",
      instagram: "https://www.instagram.com/guiropasystemss/",
      instagramHandle: "@guiropasystemss",
    },
  },
};

const pt = {
  ...shared,

  meta: {
    title: "GUIROPA RADIO",
    description:
      "GUIROPA RADIO — música de 1950 a 1990. Quatro décadas e um ponto final.",
  },

  a11y: {
    home: "GUIROPA RADIO — início",
    navPrimary: "Navegação principal",
    footerNav: "Navegação do rodapé",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    langSwitch: "Idioma do site",
  },

  nav: [
    { href: "/", label: "Início" },
    { href: "/ouvir", label: "Ouvir", cta: true },
    { href: "/programacao", label: "Programação" },
    { href: "/loja", label: "Loja" },
    { href: "/contato", label: "Contato" },
  ],

  hero: {
    brandTagline: "A música que atravessou gerações.",
    headline: "A música que atravessou gerações.",
    lead:
      "Dos anos 50 até 1990. Rock 'n' roll, soft rock, soul, pop, blues, disco, funk, new wave, baladas e tudo aquilo que fez uma época ter som próprio.",
    ctaPrimary: "Ouvir agora",
  },

  decades: {
    eyebrow: "A linha do tempo",
    headline: "Quarenta anos. Milhares de histórias.",
    lead:
      "A GUIROPA atravessa as décadas sem transformar memória em museu. Aqui, ela continua tocando.",
    items: [
      {
        code: "50",
        year: "1950s",
        title: "A faísca",
        description:
          "Rock 'n' roll, rhythm & blues, doo-wop, harmonias vocais e as canções que deram início a tudo.",
      },
      {
        code: "60",
        year: "1960s",
        title: "Tudo mudou",
        description:
          "Pop, soul, Motown, folk rock, rock melódico e o lado mais suave da British Invasion.",
      },
      {
        code: "70",
        year: "1970s",
        title: "Anos dourados",
        description:
          "Soft rock, baladas clássicas, soul, disco, pop melódico e harmonias inesquecíveis.",
      },
      {
        code: "80",
        year: "1980s",
        title: "Hits eternos",
        description:
          "Soft rock, power ballads, adult contemporary, synthpop, arena rock e as grandes vozes da década.",
      },
      {
        code: "90",
        year: "1990",
        title: "A última parada",
        description:
          "Rock ballads, soft rock e canções eternas. A GUIROPA chega a 1990 — e para exatamente aqui.",
      },
    ],
  },

  hub: {
    eyebrow: "GUIROPA RADIO",
    headline: "Escolha onde entrar.",
    lead:
      "Ouça a rádio, acompanhe a programação ou entre na coleção GUIROPA.",
    cards: [
      {
        href: "/ouvir",
        title: "Ouvir agora",
        description:
          "O coração da GUIROPA. Player, faixa atual e a transmissão.",
      },
      {
        href: "/programacao",
        title: "Programação",
        description:
          "Décadas, programas e blocos construídos em torno da música.",
      },
      {
        href: "/loja",
        title: "GUIROPA Store",
        description:
          "A identidade da rádio fora das caixas de som.",
      },
    ],
  },

  listen: {
    eyebrow: "No ar",
    title: "Ouça a GUIROPA.",
    lead:
      "1950 → 1990. A transmissão terá aqui seu player definitivo.",
    playerTitle: "O player está chegando.",
    playerNote:
      "A estrutura da rádio está sendo preparada. Esta área receberá o stream oficial, faixa atual e histórico.",
    play: "Reproduzir GUIROPA RADIO",
    waiting: "Transmissão em preparação",
  },

  schedule: {
    eyebrow: "Programação",
    title: "Cada década tem sua hora.",
    lead:
      "A programação da GUIROPA será construída sobre cinco pontos da linha do tempo.",
    decades: [
      {
        year: "1950s",
        title: "The Beginning",
        description: "As raízes da revolução.",
      },
      {
        year: "1960s",
        title: "The Explosion",
        description: "Quando tudo começou a mudar.",
      },
      {
        year: "1970s",
        title: "Golden Years",
        description:
          "Soft rock, baladas clássicas e melodias que atravessaram gerações.",
      },
      {
        year: "1980s",
        title: "Timeless Hits",
        description:
          "Power ballads, arena rock, adult contemporary e grandes vozes.",
      },
      {
        year: "1990",
        title: "The Last Stop",
        description:
          "A última parada da linha do tempo GUIROPA.",
      },
    ],
  },

  store: {
    eyebrow: "GUIROPA Store",
    title: "Vista o som.",
    lead:
      "A identidade GUIROPA aplicada a coleções inspiradas nas décadas que a rádio toca.",
    collection: "Collection 1950 — 1990",
    note:
      "Produtos, edições e coleções entram aqui na próxima etapa.",
  },

  footer: {
    statement:
      "GET UP. TURN IT UP. GUIROPA.",
    home: "Início",
    listen: "Ouvir",
    schedule: "Programação",
    store: "Loja",
  },
};

const en = {
  ...shared,

  meta: {
    title: "GUIROPA RADIO",
    description:
      "GUIROPA RADIO — music from 1950 to 1990.",
  },

  a11y: {
    home: "GUIROPA RADIO — home",
    navPrimary: "Main navigation",
    footerNav: "Footer navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    langSwitch: "Site language",
  },

  nav: [
    { href: "/", label: "Home" },
    { href: "/ouvir", label: "Listen", cta: true },
    { href: "/programacao", label: "Schedule" },
    { href: "/loja", label: "Store" },
    { href: "/contato", label: "Contact" },
  ],

  hero: {
    brandTagline: "The music that crossed generations.",
    headline: "The music that crossed generations.",
    lead:
      "From the 1950s to 1990. Rock 'n' roll, soft rock, soul, pop, blues, disco, funk, new wave, ballads and everything that gave each era its own sound.",
    ctaPrimary: "Listen now",
  },

  decades: {
    eyebrow: "The timeline",
    headline: "Forty years. Thousands of stories.",
    lead:
      "GUIROPA crosses the decades without turning memory into a museum. Here, it keeps playing.",
    items: [
      {
        code: "50",
        year: "1950s",
        title: "The spark",
        description:
          "Rock 'n' roll, rhythm & blues, doo-wop, vocal harmonies and the songs that started it all.",
      },
      {
        code: "60",
        year: "1960s",
        title: "Everything changed",
        description:
          "Pop, soul, Motown, folk rock, melodic rock and the softer side of the British Invasion.",
      },
      {
        code: "70",
        year: "1970s",
        title: "Golden years",
        description:
          "Soft rock, classic ballads, soul, disco, melodic pop and unforgettable harmonies.",
      },
      {
        code: "80",
        year: "1980s",
        title: "Timeless hits",
        description:
          "Soft rock, power ballads, adult contemporary, synthpop, arena rock and the great voices of the decade.",
      },
      {
        code: "90",
        year: "1990",
        title: "The final stop",
        description:
          "Rock ballads, soft rock and timeless songs. GUIROPA reaches 1990 — and stops right there.",
      },
    ],
  },

  hub: {
    eyebrow: "GUIROPA RADIO",
    headline: "Choose where to enter.",
    lead:
      "Listen to the radio, explore the schedule or enter the GUIROPA collection.",
    cards: [
      {
        href: "/ouvir",
        title: "Listen now",
        description:
          "The heart of GUIROPA. Player, current track and broadcast.",
      },
      {
        href: "/programacao",
        title: "Schedule",
        description:
          "Decades, shows and programming built around music.",
      },
      {
        href: "/loja",
        title: "GUIROPA Store",
        description:
          "The identity of the station beyond the speakers.",
      },
    ],
  },

  listen: {
    eyebrow: "On air",
    title: "Listen to GUIROPA.",
    lead:
      "1950 → 1990. The official player will live here.",
    playerTitle: "The player is coming.",
    playerNote:
      "This area will receive the official stream, current track and listening history.",
    play: "Play GUIROPA RADIO",
    waiting: "Broadcast in preparation",
  },

  schedule: {
    eyebrow: "Schedule",
    title: "Every decade gets its moment.",
    lead:
      "GUIROPA programming is built around five points in the timeline.",
    decades: [
      {
        year: "1950s",
        title: "The Beginning",
        description:
          "The songs and voices that started the journey.",
      },
      {
        year: "1960s",
        title: "The Explosion",
        description:
          "Pop, soul and melodic sounds changing everything.",
      },
      {
        year: "1970s",
        title: "Golden Years",
        description:
          "Soft rock, classic ballads and melodies built to last.",
      },
      {
        year: "1980s",
        title: "Timeless Hits",
        description:
          "Power ballads, arena rock, adult contemporary and great voices.",
      },
      {
        year: "1990",
        title: "The Last Stop",
        description:
          "GUIROPA's timeline makes its final stop here.",
      },
    ],
  },

  store: {
    eyebrow: "GUIROPA Store",
    title: "Wear the sound.",
    lead:
      "GUIROPA identity applied to collections inspired by the eras we play.",
    collection: "Collection 1950 — 1990",
    note:
      "Products, editions and collections arrive in the next stage.",
  },

  footer: {
    statement:
      "GET UP. TURN IT UP. GUIROPA.",
    home: "Home",
    listen: "Listen",
    schedule: "Schedule",
    store: "Store",
  },
};

const es = {
  ...shared,

  meta: {
    title: "GUIROPA RADIO",
    description:
      "GUIROPA RADIO — música de 1950 a 1990.",
  },

  a11y: {
    home: "GUIROPA RADIO — inicio",
    navPrimary: "Navegación principal",
    footerNav: "Navegación del pie",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    langSwitch: "Idioma del sitio",
  },

  nav: [
    { href: "/", label: "Inicio" },
    { href: "/ouvir", label: "Escuchar", cta: true },
    { href: "/programacao", label: "Programación" },
    { href: "/loja", label: "Tienda" },
    { href: "/contato", label: "Contacto" },
  ],

  hero: {
    brandTagline:
      "La música que atravesó generaciones.",
    headline:
      "La música que atravesó generaciones.",
    lead:
      "De los años 50 hasta 1990. Rock 'n' roll, soft rock, soul, pop, blues, disco, funk, new wave, baladas y todo lo que dio sonido propio a cada época.",
    ctaPrimary: "Escuchar ahora",
  },

  decades: {
    eyebrow: "La línea del tiempo",
    headline:
      "Cuarenta años. Miles de historias.",
    lead:
      "GUIROPA atraviesa las décadas sin convertir la memoria en museo. Aquí sigue sonando.",
    items: [
      {
        code: "50",
        year: "1950s",
        title: "La chispa",
        description:
          "Rock 'n' roll, rhythm & blues, doo-wop, armonías vocales y las canciones que lo iniciaron todo.",
      },
      {
        code: "60",
        year: "1960s",
        title: "Todo cambió",
        description:
          "Pop, soul, Motown, folk rock, rock melódico y el lado más suave de la British Invasion.",
      },
      {
        code: "70",
        year: "1970s",
        title: "Años dorados",
        description:
          "Soft rock, baladas clásicas, soul, disco, pop melódico y armonías inolvidables.",
      },
      {
        code: "80",
        year: "1980s",
        title: "Éxitos eternos",
        description:
          "Soft rock, power ballads, adult contemporary, synthpop, arena rock y las grandes voces de la década.",
      },
      {
        code: "90",
        year: "1990",
        title: "La última parada",
        description:
          "Rock ballads, soft rock y canciones eternas. GUIROPA llega a 1990 — y se detiene exactamente aquí.",
      },
    ],
  },

  hub: {
    eyebrow: "GUIROPA RADIO",
    headline: "Elige dónde entrar.",
    lead:
      "Escucha la radio, descubre la programación o entra en la colección GUIROPA.",
    cards: [
      {
        href: "/ouvir",
        title: "Escuchar ahora",
        description:
          "El corazón de GUIROPA. Player, canción actual y transmisión.",
      },
      {
        href: "/programacao",
        title: "Programación",
        description:
          "Décadas y programas construidos alrededor de la música.",
      },
      {
        href: "/loja",
        title: "GUIROPA Store",
        description:
          "La identidad de la radio fuera de los altavoces.",
      },
    ],
  },

  listen: {
    eyebrow: "Al aire",
    title: "Escucha GUIROPA.",
    lead:
      "1950 → 1990. Aquí estará el player oficial.",
    playerTitle: "El player está llegando.",
    playerNote:
      "Esta área recibirá el stream oficial, canción actual e historial.",
    play: "Reproducir GUIROPA RADIO",
    waiting: "Transmisión en preparación",
  },

  schedule: {
    eyebrow: "Programación",
    title: "Cada década tiene su momento.",
    lead:
      "La programación GUIROPA se construye alrededor de cinco puntos de la línea del tiempo.",
    decades: [
      {
        year: "1950s",
        title: "The Beginning",
        description:
          "Las canciones y voces que iniciaron el viaje.",
      },
      {
        year: "1960s",
        title: "The Explosion",
        description:
          "Pop, soul y sonidos melódicos cambiándolo todo.",
      },
      {
        year: "1970s",
        title: "Golden Years",
        description:
          "Soft rock, baladas clásicas y melodías para siempre.",
      },
      {
        year: "1980s",
        title: "Timeless Hits",
        description:
          "Power ballads, arena rock, adult contemporary y grandes voces.",
      },
      {
        year: "1990",
        title: "The Last Stop",
        description:
          "La línea del tiempo GUIROPA hace aquí su última parada.",
      },
    ],
  },

  store: {
    eyebrow: "GUIROPA Store",
    title: "Viste el sonido.",
    lead:
      "La identidad GUIROPA aplicada a colecciones inspiradas en nuestras décadas.",
    collection: "Collection 1950 — 1990",
    note:
      "Productos, ediciones y colecciones llegan en la próxima etapa.",
  },

  footer: {
    statement:
      "GET UP. TURN IT UP. GUIROPA.",
    home: "Inicio",
    listen: "Escuchar",
    schedule: "Programación",
    store: "Tienda",
  },
};

export const translations = {
  pt,
  en,
  es,
};
