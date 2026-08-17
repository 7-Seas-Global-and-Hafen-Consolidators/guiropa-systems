import Hero from "../components/Hero.jsx";
import ExploreHub from "../components/ExploreHub.jsx";
import ActionHub from "../components/ActionHub.jsx";

export default function HomePage() {
  return (
    <main className="guiropa-radio-home">
      <Hero />
      <ExploreHub />
      <ActionHub />
    </main>
  );
}
