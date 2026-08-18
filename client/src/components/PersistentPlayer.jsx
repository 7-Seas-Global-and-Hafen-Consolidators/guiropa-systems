import {
  Link,
  useLocation,
} from "react-router-dom";

import { useRadioPlayer } from "../audio/RadioPlayerContext.jsx";
import { assetUrl } from "../utils/assetUrl.js";

const PLAYER_ART =
  assetUrl("assets/guiropa-radio-player-artdeco.jpg");

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
        /* =====================================================
           GUIROPA RADIO — ART DECO PERSISTENT PLAYER
           Preto + ouro envelhecido + âmbar.
           Sem alterar o motor de áudio.
           ===================================================== */

        .guiropa-artdeco-player {
          --gr-black: #0d0c0b;
          --gr-black-2: #161310;
          --gr-black-3: #211a14;

          --gr-gold: #c99a45;
          --gr-gold-light: #e0bb70;
          --gr-gold-dark: #76501f;

          --gr-amber: #d68a23;
          --gr-red: #bd3828;

          position: fixed;

          z-index: 9999;

          left: 50%;
          bottom: 18px;

          width:
            min(
              1080px,
              calc(100% - 30px)
            );

          min-height: 94px;

          transform:
            translateX(-50%);

          display: grid;

          grid-template-columns:
            164px
            minmax(210px, 1.25fr)
            minmax(250px, 1fr)
            auto;

          align-items: stretch;

          overflow: hidden;

          border:
            1px solid
            rgba(
              201,
              154,
              69,
              0.68
            );

          border-radius: 14px;

          background:
            linear-gradient(
              180deg,
              #171411 0%,
              #0c0b0a 55%,
              #15110e 100%
            );

          color: #f2e3c6;

          box-shadow:
            0 24px 72px
            rgba(
              39,
              26,
              15,
              0.34
            ),
            inset
            0 1px 0
            rgba(
              240,
              197,
              113,
              0.13
            );

          isolation: isolate;
        }

        .guiropa-artdeco-player::before {
          content: "";

          position: absolute;

          inset: 5px;

          z-index: -1;

          pointer-events: none;

          border:
            1px solid
            rgba(
              201,
              154,
              69,
              0.20
            );

          border-radius: 10px;
        }

        /* =========================
           PLACA ART DÉCO
           ========================= */

        .guiropa-artdeco-player__art {
          position: relative;

          min-width: 0;

          overflow: hidden;

          border-right:
            1px solid
            rgba(
              201,
              154,
              69,
              0.28
            );

          background:
            #0e0d0c;
        }

        .guiropa-artdeco-player__art img {
          display: block;

          width: 100%;
          height: 100%;

          object-fit: cover;

          object-position:
            13% center;

          filter:
            brightness(0.98)
            contrast(1.06)
            saturate(1.04);
        }

        .guiropa-artdeco-player__art::after {
          content: "";

          position: absolute;

          inset: 0;

          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              transparent 58%,
              rgba(
                13,
                12,
                11,
                0.72
              ) 100%
            );
        }

        /* =========================
           INFORMAÇÃO
           ========================= */

        .guiropa-artdeco-player__info {
          min-width: 0;

          display: flex;
          flex-direction: column;

          justify-content: center;

          padding:
            16px 20px;
        }

        .guiropa-artdeco-player__status {
          display: flex;

          align-items: center;

          gap: 8px;

          margin-bottom: 7px;

          color:
            var(--gr-gold-light);

          font-size: 8px;

          font-weight: 900;

          letter-spacing:
            0.18em;

          text-transform:
            uppercase;
        }

        .guiropa-artdeco-player__dot {
          width: 7px;
          height: 7px;

          flex: 0 0 auto;

          border-radius: 50%;

          background:
            var(--gr-red);

          box-shadow:
            0 0 0 4px
            rgba(
              189,
              56,
              40,
              0.11
            ),
            0 0 12px
            rgba(
              189,
              56,
              40,
              0.42
            );
        }

        .guiropa-artdeco-player__title {
          display: block;

          overflow: hidden;

          color:
            #f2dfbb;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              1.05rem,
              2vw,
              1.42rem
            );

          font-weight: 400;

          letter-spacing:
            -0.02em;

          text-overflow:
            ellipsis;

          white-space:
            nowrap;
        }

        .guiropa-artdeco-player__artist {
          display: block;

          margin-top: 4px;

          overflow: hidden;

          color:
            #a89170;

          font-size: 9px;

          text-overflow:
            ellipsis;

          white-space:
            nowrap;
        }

        /* =========================
           ESCALA 1950 — 1990
           ========================= */

        .guiropa-artdeco-player__dial {
          position: relative;

          display: flex;

          align-items: center;

          padding:
            15px 20px;

          border-left:
            1px solid
            rgba(
              201,
              154,
              69,
              0.16
            );

          border-right:
            1px solid
            rgba(
              201,
              154,
              69,
              0.16
            );
        }

        .guiropa-artdeco-player__dial-box {
          position: relative;

          width: 100%;

          padding:
            14px 14px
            13px;

          border:
            1px solid
            rgba(
              201,
              154,
              69,
              0.38
            );

          border-radius: 8px;

          background:
            linear-gradient(
              180deg,
              #17120d,
              #2a190c
            );

          box-shadow:
            inset
            0 0 18px
            rgba(
              214,
              138,
              35,
              0.12
            );
        }

        .guiropa-artdeco-player__years {
          display: grid;

          grid-template-columns:
            repeat(5, 1fr);

          gap: 3px;

          color:
            #d9b36b;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 10px;

          text-align: center;
        }

        .guiropa-artdeco-player__scale {
          position: relative;

          height: 17px;

          margin-top: 8px;

          border-top:
            1px solid
            rgba(
              214,
              138,
              35,
              0.70
            );

          background:
            repeating-linear-gradient(
              90deg,
              transparent 0,
              transparent 8px,
              rgba(
                214,
                138,
                35,
                0.72
              ) 9px,
              rgba(
                214,
                138,
                35,
                0.72
              ) 10px
            );
        }

        .guiropa-artdeco-player__needle {
          position: absolute;

          left: 50%;
          top: 3px;

          width: 2px;
          height: 28px;

          transform:
            translateX(-50%);

          background:
            linear-gradient(
              180deg,
              #ffcf73,
              #c4611e
            );

          box-shadow:
            0 0 9px
            rgba(
              255,
              165,
              56,
              0.68
            );
        }

        /* =========================
           CONTROLES
           ========================= */

        .guiropa-artdeco-player__controls {
          display: grid;

          grid-template-columns:
            auto
            auto
            auto;

          align-items: center;

          gap: 13px;

          padding:
            14px 18px;
        }

        .guiropa-artdeco-player__play {
          width: 50px;
          height: 50px;

          display: grid;

          place-items: center;

          border:
            1px solid
            #a9782e;

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 35% 30%,
              #e4bb70 0%,
              #b27e31 36%,
              #65431d 76%,
              #2a1b0e 100%
            );

          color:
            #160f09;

          font-size: 16px;

          font-weight: 900;

          cursor: pointer;

          box-shadow:
            inset
            0 1px 0
            rgba(
              255,
              238,
              196,
              0.42
            ),
            0 5px 12px
            rgba(
              0,
              0,
              0,
              0.30
            );

          transition:
            transform 0.2s ease,
            filter 0.2s ease;
        }

        .guiropa-artdeco-player__play:hover {
          transform:
            translateY(-1px);

          filter:
            brightness(1.08);
        }

        .guiropa-artdeco-player__play:disabled {
          opacity: 0.42;

          cursor:
            not-allowed;

          transform: none;
        }

        .guiropa-artdeco-player__volume {
          display: flex;

          align-items: center;

          gap: 8px;
        }

        .guiropa-artdeco-player__mute {
          width: 32px;
          height: 32px;

          display: grid;

          place-items: center;

          border:
            1px solid
            rgba(
              201,
              154,
              69,
              0.28
            );

          border-radius: 50%;

          background:
            #1d1711;

          color:
            #d5af69;

          cursor: pointer;
        }

        .guiropa-artdeco-player__volume input {
          width: 78px;

          accent-color:
            var(--gr-gold);

          cursor: pointer;
        }

        .guiropa-artdeco-player__open {
          min-height: 40px;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          padding:
            0 13px;

          border:
            1px solid
            rgba(
              201,
              154,
              69,
              0.55
            );

          color:
            #e1bd76;

          background:
            linear-gradient(
              180deg,
              rgba(
                201,
                154,
                69,
                0.08
              ),
              transparent
            );

          font-size: 8px;

          font-weight: 900;

          letter-spacing:
            0.13em;

          text-decoration: none;

          text-transform:
            uppercase;

          white-space: nowrap;

          transition:
            color 0.2s ease,
            background 0.2s ease,
            border-color 0.2s ease;
        }

        .guiropa-artdeco-player__open:hover {
          color:
            #f6ddb0;

          border-color:
            rgba(
              224,
              187,
              112,
              0.82
            );

          background:
            rgba(
              201,
              154,
              69,
              0.11
            );
        }

        /* =========================
           TABLET
           ========================= */

        @media (max-width: 900px) {
          .guiropa-artdeco-player {
            grid-template-columns:
              130px
              minmax(180px, 1fr)
              minmax(210px, 0.9fr)
              auto;
          }

          .guiropa-artdeco-player__info {
            padding:
              13px 15px;
          }

          .guiropa-artdeco-player__dial {
            padding:
              12px 14px;
          }

          .guiropa-artdeco-player__controls {
            padding:
              12px 13px;
          }

          .guiropa-artdeco-player__volume input {
            width: 60px;
          }
        }

        /* =========================
           MOBILE
           ========================= */

        @media (max-width: 720px) {
          .guiropa-artdeco-player {
            bottom: 9px;

            width:
              calc(
                100% - 18px
              );

            min-height: 72px;

            grid-template-columns:
              76px
              minmax(0, 1fr)
              auto;

            border-radius: 11px;
          }

          .guiropa-artdeco-player__art {
            min-height: 72px;
          }

          .guiropa-artdeco-player__info {
            padding:
              10px 11px;
          }

          .guiropa-artdeco-player__status {
            margin-bottom: 3px;

            font-size: 6px;
          }

          .guiropa-artdeco-player__title {
            font-size:
              0.92rem;
          }

          .guiropa-artdeco-player__artist {
            font-size: 7px;
          }

          .guiropa-artdeco-player__dial {
            display: none;
          }

          .guiropa-artdeco-player__controls {
            grid-template-columns:
              auto
              auto;

            gap: 8px;

            padding:
              9px 10px;
          }

          .guiropa-artdeco-player__volume {
            display: none;
          }

          .guiropa-artdeco-player__play {
            width: 42px;
            height: 42px;
          }

          .guiropa-artdeco-player__open {
            width: 34px;

            min-height: 34px;

            padding: 0;

            font-size: 0;
          }

          .guiropa-artdeco-player__open::after {
            content: "↗";

            font-size: 14px;
          }
        }

        @media (max-width: 430px) {
          .guiropa-artdeco-player {
            grid-template-columns:
              62px
              minmax(0, 1fr)
              auto;
          }

          .guiropa-artdeco-player__art img {
            object-position:
              10% center;
          }

          .guiropa-artdeco-player__play {
            width: 38px;
            height: 38px;

            font-size: 13px;
          }
        }
      `}</style>

      <aside
        className="guiropa-artdeco-player"
        aria-label="GUIROPA RADIO player global"
      >
        <div
          className="guiropa-artdeco-player__art"
          aria-hidden="true"
        >
          <img
            src={PLAYER_ART}
            alt=""
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="guiropa-artdeco-player__info">
          <div className="guiropa-artdeco-player__status">
            <span className="guiropa-artdeco-player__dot" />

            {statusText}
          </div>

          <strong className="guiropa-artdeco-player__title">
            {displayTitle}
          </strong>

          <span className="guiropa-artdeco-player__artist">
            {displayArtist}
          </span>
        </div>

        <div
          className="guiropa-artdeco-player__dial"
          aria-hidden="true"
        >
          <div className="guiropa-artdeco-player__dial-box">
            <div className="guiropa-artdeco-player__years">
              <span>1950</span>
              <span>1960</span>
              <span>1970</span>
              <span>1980</span>
              <span>1990</span>
            </div>

            <div className="guiropa-artdeco-player__scale">
              <span className="guiropa-artdeco-player__needle" />
            </div>
          </div>
        </div>

        <div className="guiropa-artdeco-player__controls">
          <button
            type="button"
            className="guiropa-artdeco-player__play"
            onClick={togglePlayback}
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

          <div className="guiropa-artdeco-player__volume">
            <button
              type="button"
              className="guiropa-artdeco-player__mute"
              onClick={toggleMute}
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
              value={volume}
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
            className="guiropa-artdeco-player__open"
          >
            Abrir player
          </Link>
        </div>
      </aside>
    </>
  );
}
