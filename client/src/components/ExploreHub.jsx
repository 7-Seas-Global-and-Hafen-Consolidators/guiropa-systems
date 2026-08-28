import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import HomeLiveAgenda from "./HomeLiveAgenda.jsx";

const ARCHIVE_ROUTE = {
  "50": "/decada/1950s/artistas",
  "60": "/decada/1960s/artistas",
  "70": "/decada/1970s/artistas",
  "80": "/decada/1980s/artistas",
  "90": "/decada/1990/artistas",
};

export default function ExploreHub() {
  const { t } = useLanguage();

  return (
    <>
      <section className="guiropa-decades section guiropa-decades-static" id="decadas">
        <div className="container">
          <div className="guiropa-section-heading">
            <span className="guiropa-section-kicker">{t.decades.eyebrow}</span>
            <h2>{t.decades.headline}</h2>
            <p>{t.decades.lead}</p>
          </div>

          <div className="guiropa-decades-grid">
            {t.decades.items.map((item) => (
              <Link
                key={item.year}
                to={ARCHIVE_ROUTE[item.code] || "/programacao"}
                className="guiropa-decade-link"
                aria-label={`Abrir arquivo completo ${item.year}`}
              >
                <article className={`guiropa-decade guiropa-decade--${item.code}`}>
                  <span className="guiropa-decade__number">{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="guiropa-decade__archive-entry">ABRIR ARQUIVO · ARTISTAS + HISTÓRIAS →</span>
                  {item.code === "70" && (
                    <span className="guiropa-decade__tunnel-note">70s TUNNEL™ PRESERVADO DENTRO DO ARQUIVO</span>
                  )}
                </article>
              </Link>
            ))}
          </div>
        </div>

        <style>{`
          .guiropa-decades-static{min-height:0!important;padding:clamp(4.8rem,8vw,7rem) 0!important}.guiropa-decades-static .guiropa-section-heading,.guiropa-decades-static .guiropa-decades-grid,.guiropa-decades-static .guiropa-decade{opacity:1!important;visibility:visible!important;transform:none}.guiropa-decade-link{color:inherit;text-decoration:none;display:block}.guiropa-decade-link .guiropa-decade{height:100%}.guiropa-decades-static .guiropa-decade:hover{transform:translateY(-4px)}.guiropa-decade__archive-entry{display:inline-block;margin-top:1rem;color:currentColor;font-size:.58rem;font-weight:900;letter-spacing:.13em;text-decoration:underline;text-underline-offset:4px}.guiropa-decade__tunnel-note{display:block;margin-top:.55rem;color:#d57a24;font-size:.5rem;font-weight:900;letter-spacing:.1em}@media(max-width:900px){.guiropa-decades-static{padding:4.5rem 0!important}}@media(max-width:600px){.guiropa-decades-static{padding:3.8rem 0!important}}
        `}</style>
      </section>

      <HomeLiveAgenda />
    </>
  );
}
