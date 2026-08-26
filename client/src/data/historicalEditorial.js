/*
 * GUIROPA RADIO · HISTORICAL EDITORIAL
 * Editorial scope is deliberately locked to 1950–1989.
 * This module is independent from every audio/player/tunnel engine.
 *
 * Publication policy:
 * - target: 1 story/day
 * - hard stop: 2 stories/day
 * - monthly planning target: 30 stories
 * - monthly hard stop: 45 stories
 */

export const HISTORICAL_EDITORIAL_POLICY = Object.freeze({
  startYear: 1950,
  endYear: 1989,
  dailyTarget: 1,
  dailyHardStop: 2,
  monthlyTarget: 30,
  monthlyHardStop: 45,
});

export const HISTORICAL_EDITORIAL_SEEDS = Object.freeze([
  {
    slug: "1950s-rock-and-roll-arrives",
    decade: "1950s",
    year: 1956,
    title: "Quando o rock'n'roll deixou de parecer uma moda passageira",
    deck: "A década em que uma nova música atravessou rádios, palcos e gerações — e mudou para sempre a cultura popular.",
    status: "planned",
  },
  {
    slug: "1967-rock-becomes-art",
    decade: "1960s",
    year: 1967,
    title: "1967: quando o rock começou a exigir outra forma de escuta",
    deck: "Psicodelia, estúdio, festivais e ambição artística transformaram a maneira como músicos e público entendiam um disco.",
    status: "planned",
  },
  {
    slug: "1973-progressive-on-the-newsstands",
    decade: "1970s",
    year: 1973,
    title: "Quando o progressive rock tomou as bancas",
    deck: "Álbuns longos, capas monumentais e uma imprensa disposta a discutir música popular como obra de arte.",
    status: "planned",
  },
  {
    slug: "1977-punk-against-the-world",
    decade: "1970s",
    year: 1977,
    title: "1977: punk contra o mundo",
    deck: "Uma geração decidiu que velocidade, urgência e confronto também podiam reescrever as regras da música.",
    status: "planned",
  },
  {
    slug: "1983-second-british-invasion",
    decade: "1980s",
    year: 1983,
    title: "1983: música, imagem e a segunda invasão britânica",
    deck: "Quando new wave, synthpop e televisão musical fizeram a estética se tornar parte inseparável do som.",
    status: "planned",
  },
]);

export function isGuiropaHistoricalYear(year) {
  const value = Number(year);
  return Number.isInteger(value)
    && value >= HISTORICAL_EDITORIAL_POLICY.startYear
    && value <= HISTORICAL_EDITORIAL_POLICY.endYear;
}
