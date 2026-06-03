import PageHero from "./PageHero.jsx";

export default function SectionPage({ hero, children }) {
  return (
    <main className="page-main">
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lead={hero.lead} wide />
      {children}
    </main>
  );
}
