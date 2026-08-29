import { useParams } from "react-router-dom";
import DecadeNewsFeed from "../components/DecadeNewsFeed.jsx";
import DecadeArchivePage from "./DecadeArchivePage.jsx";

export default function DecadeArchiveWithNewsPage() {
  const { decade } = useParams();

  return (
    <>
      <DecadeArchivePage />
      <section className="decade-rss-placement" aria-label={`RSS editorial ${decade || "GUIROPA"}`}>
        <style>{`
          .decade-rss-placement{background:#f4e6cf;color:#211c17;padding:0 0 110px}
          .decade-rss-placement__shell{width:min(1040px,calc(100% - 32px));margin:auto}
        `}</style>
        <div className="decade-rss-placement__shell">
          <DecadeNewsFeed decade={decade} />
        </div>
      </section>
    </>
  );
}
