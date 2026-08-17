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
  ],

  hero: {
    brandTagline: "A música que atravessou gerações.",
    headline: "A música que atravessou gerações.",
    lead:
      "Dos anos 50 até 1990. Rock, soul, pop, blues, disco, funk, metal, new wave e tudo aquilo que fez uma época ter som próprio.",
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
          "Rock 'n' roll, rhythm & blues, doo-wop, jazz e o início de uma revolução.",
      },
      {
        code: "60",
        year: "1960s",
        title: "Tudo mudou",
        description:
          "Beat, soul, psicodelia, Motown, British Invasion e uma geração encontrando sua própria voz.",
      },
      {
        code: "70",
        year: "1970s",
        title: "Sem limites",
        description:
          "Hard rock, progressive, disco, funk, punk, glam e música ocupando todos os espaços.",
      },
      {
        code: "80",
        year: "1980s",
        title: "Volume máximo",
        description:
          "New wave, synthpop, heavy metal, arena rock, pop e uma década impossível de ignorar.",
      },
      {
        code: "90",
        year: "1990",
        title: "Ponto final",
        description:
          "A última parada da GUIROPA. Chegou 1990. Daqui não passa.",
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
        title: "No Rules",
        description: "A década em que cabia tudo.",
      },
      {
        year: "1980s",
        title: "Turn It Up",
        description: "Som grande. Identidade maior ainda.",
      },
      {
        year: "1990",
        title: "The Last Stop",
        description: "Aqui termina a linha do tempo.",
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
  ],

  hero: {
    brandTagline: "The music that crossed generations.",
    headline: "The music that crossed generations.",
    lead:
      "From the 1950s to 1990. Rock, soul, pop, blues, disco, funk, metal, new wave and everything that gave each era its own sound.",
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
          "Rock 'n' roll, rhythm & blues, doo-wop, jazz and the beginning of a revolution.",
      },
      {
        code: "60",
        year: "1960s",
        title: "Everything changed",
        description:
          "Beat, soul, psychedelia, Motown and the British Invasion.",
      },
      {
        code: "70",
        year: "1970s",
        title: "No limits",
        description:
          "Hard rock, progressive, disco, funk, punk and glam.",
      },
      {
        code: "80",
        year: "1980s",
        title: "Maximum volume",
        description:
          "New wave, synthpop, heavy metal, arena rock and pop.",
      },
      {
        code: "90",
        year: "1990",
        title: "The end",
        description:
          "GUIROPA's final stop. 1990. Nothing beyond.",
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
        description: "The roots of the revolution.",
      },
      {
        year: "1960s",
        title: "The Explosion",
        description: "When everything began to change.",
      },
      {
        year: "1970s",
        title: "No Rules",
        description: "The decade where everything fit.",
      },
      {
        year: "1980s",
        title: "Turn It Up",
        description: "Big sound. Even bigger identity.",
      },
      {
        year: "1990",
        title: "The Last Stop",
        description: "The timeline ends here.",
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
  ],

  hero: {
    brandTagline:
      "La música que atravesó generaciones.",
    headline:
      "La música que atravesó generaciones.",
    lead:
      "De los años 50 hasta 1990. Rock, soul, pop, blues, disco, funk, metal, new wave y todo lo que dio sonido propio a cada época.",
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
          "Rock 'n' roll, rhythm & blues, doo-wop y jazz.",
      },
      {
        code: "60",
        year: "1960s",
        title: "Todo cambió",
        description:
          "Beat, soul, psicodelia, Motown y British Invasion.",
      },
      {
        code: "70",
        year: "1970s",
        title: "Sin límites",
        description:
          "Hard rock, progressive, disco, funk, punk y glam.",
      },
      {
        code: "80",
        year: "1980s",
        title: "Volumen máximo",
        description:
          "New wave, synthpop, heavy metal, arena rock y pop.",
      },
      {
        code: "90",
        year: "1990",
        title: "Punto final",
        description:
          "La última parada de GUIROPA. Hasta aquí.",
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
        description: "Las raíces de la revolución.",
      },
      {
        year: "1960s",
        title: "The Explosion",
        description: "Cuando todo comenzó a cambiar.",
      },
      {
        year: "1970s",
        title: "No Rules",
        description: "La década donde cabía todo.",
      },
      {
        year: "1980s",
        title: "Turn It Up",
        description: "Sonido grande. Identidad mayor.",
      },
      {
        year: "1990",
        title: "The Last Stop",
        description: "La línea termina aquí.",
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
