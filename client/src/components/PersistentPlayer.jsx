import {
  Link,
  useLocation,
} from "react-router-dom";

import { useRadioPlayer } from "../audio/RadioPlayerContext.jsx";

export default function PersistentPlayer() {
  const location = useLocation();

  const {
    streamConfigured,
    statusText,
    isPlaying,
    isLoading,
    displayTitle,
    displayArtist,
    volume,
    isMuted,
    togglePlayback,
    setVolume,
    toggleMute,
  } = useRadioPlayer();

  /*
   * A página OUVIR já possui o player completo.
   * Portanto o mini-player global não deve aparecer ali.
   */
  const normalizedPath =
    location.pathname
      .replace(/\/+$/, "")
      .toLowerCase();

  const isListenPage =
    normalizedPath === "/ouvir" ||
    normalizedPath === "/listen";

  if (isListenPage) {
    return null;
  }

  return (
    <>
      <style>{`
        .guiropa-persistent-player {
          position: fixed;

          z-index: 9999;

          left: 50%;
          bottom: 18px;

          width:
            min(
              960px,
              calc(100% - 30px)
            );

          transform:
            translateX(-50%);

          display: grid;

          grid-template-columns:
            auto
            minmax(0, 1fr)
            auto
            auto;

          align-items: center;

          gap: 18px;

          padding:
            13px 17px;

          border:
            1px solid
            rgba(
              180,
              138,
              67,
              0.34
            );

          border-radius:
            18px;

          background:
            rgba(
              20,
              17,
              14,
              0.97
            );

          color:
            #f4eadc;

          box-shadow:
            0 22px 70px
            rgba(
              32,
              24,
              16,
              0.30
            );

          backdrop-filter:
            blur(16px);

          -webkit-backdrop-filter:
            blur(16px);
        }

        .guiropa-persistent-player__play {
          width: 48px;
          height: 48px;

          display: grid;

          place-items: center;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.13
            );

          border-radius:
            50%;

          background:
            linear-gradient(
              145deg,
              #9b753a,
              #67491f
            );

          color:
            #fff5e3;

          font-size:
            17px;

          cursor:
            pointer;

          transition:
            transform 0.2s ease,
            filter 0.2s ease;
        }

        .guiropa-persistent-player__play:hover {
          transform:
            translateY(-1px);

          filter:
            brightness(1.08);
        }

        .guiropa-persistent-player__play:disabled {
          opacity: 0.45;

          cursor:
            not-allowed;

          transform:
            none;
        }

        .guiropa-persistent-player__copy {
          min-width: 0;
        }

        .guiropa-persistent-player__status {
          display: flex;

          align-items: center;

          gap: 7px;

          margin-bottom: 3px;

          color:
            #d0aa60;

          font-size: 9px;

          font-weight: 900;

          letter-spacing:
            0.16em;

          text-transform:
            uppercase;
        }

        .guiropa-persistent-player__dot {
          width: 6px;
          height: 6px;

          flex: 0 0 auto;

          border-radius:
            50%;

          background:
            #b83224;

          box-shadow:
            0 0 0 4px
            rgba(
              184,
              50,
              36,
              0.12
            );
        }

        .guiropa-persistent-player__title {
          display: block;

          overflow: hidden;

          color:
            #f7efe3;

          font-size: 13px;

          font-weight: 800;

          text-overflow:
            ellipsis;

          white-space:
            nowrap;
        }

        .guiropa-persistent-player__artist {
          display: block;

          margin-top: 2px;

          overflow: hidden;

          color:
            #9f9282;

          font-size: 10px;

          text-overflow:
            ellipsis;

          white-space:
            nowrap;
        }

        .guiropa-persistent-player__volume {
          display: flex;

          align-items: center;

          gap: 9px;
        }

        .guiropa-persistent-player__mute {
          width: 34px;
          height: 34px;

          display: grid;

          place-items: center;

          border: 0;

          border-radius:
            50%;

          background:
            rgba(
              255,
              255,
              255,
              0.07
            );

          color:
            #eee2d1;

          cursor:
            pointer;
        }

        .guiropa-persistent-player__volume input {
          width: 92px;

          accent-color:
            #b58a45;

          cursor:
            pointer;
        }

        .guiropa-persistent-player__open {
          display:
            inline-flex;

          align-items:
            center;

          justify-content:
            center;

          min-height:
            38px;

          padding:
            0 13px;

          border:
            1px solid
            rgba(
              180,
              138,
              67,
              0.32
            );

          color:
            #d9c29b;

          font-size:
            9px;

          font-weight:
            900;

          letter-spacing:
            0.12em;

          text-decoration:
            none;

          text-transform:
            uppercase;

          transition:
            border-color 0.2s ease,
            color 0.2s ease,
            background 0.2s ease;
        }

        .guiropa-persistent-player__open:hover {
          border-color:
            rgba(
              210,
              176,
              108,
              0.62
            );

          color:
            #f4dfb5;

          background:
            rgba(
              180,
              138,
              67,
              0.05
            );
        }

        @media (
          max-width: 720px
        ) {
          .guiropa-persistent-player {
            bottom: 9px;

            width:
              calc(
                100% - 18px
              );

            grid-template-columns:
              auto
              minmax(0, 1fr)
              auto;

            gap: 11px;

            padding:
              10px 12px;

            border-radius:
              15px;
          }

          .guiropa-persistent-player__volume {
            display:
              none;
          }

          .guiropa-persistent-player__open {
            width: 36px;

            min-height:
              36px;

            padding: 0;

            font-size: 0;
          }

          .guiropa-persistent-player__open::after {
            content: "↗";

            font-size: 16px;
          }

          .guiropa-persistent-player__play {
            width: 42px;
            height: 42px;
          }
        }
      `}</style>

      <aside
        className="guiropa-persistent-player"
        aria-label="GUIROPA RADIO player global"
      >
        <button
          type="button"
          className="guiropa-persistent-player__play"
          onClick={
            togglePlayback
          }
          disabled={
            !streamConfigured ||
            isLoading
          }
          aria-label={
            isPlaying
              ? "Pausar GUIROPA RADIO"
              : "Ouvir GUIROPA RADIO"
          }
        >
          {isLoading
            ? "…"
            : isPlaying
              ? "Ⅱ"
              : "▶"}
        </button>

        <div className="guiropa-persistent-player__copy">
          <div className="guiropa-persistent-player__status">
            <span className="guiropa-persistent-player__dot" />

            {statusText}
          </div>

          <strong className="guiropa-persistent-player__title">
            {displayTitle}
          </strong>

          <span className="guiropa-persistent-player__artist">
            {displayArtist}
          </span>
        </div>

        <div className="guiropa-persistent-player__volume">
          <button
            type="button"
            className="guiropa-persistent-player__mute"
            onClick={
              toggleMute
            }
            aria-label={
              isMuted
                ? "Ativar som"
                : "Silenciar"
            }
          >
            {isMuted ||
            volume === 0
              ? "×"
              : "◖"}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={
              volume
            }
            onChange={
              (event) =>
                setVolume(
                  event.target.value
                )
            }
            aria-label="Volume"
          />
        </div>

        <Link
          to="/ouvir"
          className="guiropa-persistent-player__open"
        >
          Abrir player
        </Link>
      </aside>
    </>
  );
}
