"use client";

import { useState, useEffect } from "react";

const TAGLINE = "WHERE MEMORIES BEGIN";

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState("loading"); // "loading" | "done" | "exit"

  // Count 0 → 100
  useEffect(() => {
    let start: number | null = null;
    const duration = 2800; // ms for 0→100

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out curve so it slows near 100
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * 100));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(100);
        setPhase("done");
        // Small pause at 100, then exit
        setTimeout(() => {
          setPhase("exit");
          setTimeout(() => onComplete?.(), 900);
        }, 500);
      }
    };

    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const stagger = 74 / Math.max(TAGLINE.length, 1);
  const letters = TAGLINE.split("").map((ch, i) => {
    const on = count >= 12 + i * stagger;
    return {
      ch: ch === " " ? " " : ch,
      opacity: on ? 1 : 0,
      transform: on ? "translateY(0)" : "translateY(8px)",
    };
  });
  const frameOn = count > 4;
  const logoOn = count > 8;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Cormorant+Garamond:wght@300;400;500&display=swap');

        .preloader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #FDEFDE;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 30px;
          transition: opacity 0.8s cubic-bezier(.77,0,.18,1),
                      transform 0.8s cubic-bezier(.77,0,.18,1);
        }

        .preloader.exit {
          opacity: 0;
          transform: translateY(-12px);
          pointer-events: none;
        }

        /* ── Top / bottom hairline frame ── */
        .pre-frame-top,
        .pre-frame-bottom {
          position: absolute;
          left: 5vw; right: 5vw;
          height: 1px;
          background: #C4966A;
          transition: transform 1.1s cubic-bezier(.77,0,.18,1);
        }
        .pre-frame-top { top: 5vh; transform-origin: left; }
        .pre-frame-bottom { bottom: 5vh; transform-origin: right; }

        /* ── "Welcome to" label ── */
        .pre-welcome {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: #B8916A;
          transition: opacity 0.9s ease;
        }

        /* ── Logo ── */
        .pre-logo {
          width: min(180px, 34vw);
          height: auto;
          display: block;
          mix-blend-mode: multiply;
          transition: opacity 1.1s ease;
        }

        /* ── Letter-by-letter tagline ── */
        .pre-tagline {
          display: flex;
          gap: 0.34em;
          font-family: 'Playfair Display', serif;
          font-size: clamp(22px, 3.4vw, 40px);
          color: #3B2A1A;
          text-transform: uppercase;
        }
        .pre-tagline span {
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        /* ── Progress row ── */
        .pre-progress-row {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .pre-progress-line {
          width: 72px;
          height: 1px;
          background: rgba(196, 150, 106, 0.4);
        }
        .pre-progress-pct {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: #B8916A;
          font-variant-numeric: tabular-nums;
        }
          @media (max-width:600px){
           .pre-tagline{
           font-size: clamp(15px, 3.4vw, 30px);
          }
           }
          
          
      `}</style>

      <div className={`preloader${phase === "exit" ? " exit" : ""}`}>
        <div
          className="pre-frame-top"
          style={{ transform: frameOn ? "scaleX(1)" : "scaleX(0)" }}
        />
        <div
          className="pre-frame-bottom"
          style={{ transform: frameOn ? "scaleX(1)" : "scaleX(0)" }}
        />

        <span className="pre-welcome" style={{ opacity: logoOn ? 1 : 0 }}>
          Welcome to
        </span>

        <img
          src="/images/Logo-Tirupati-Mahaal.png"
          alt="Tirupati Mahal"
          className="pre-logo"
          style={{ opacity: logoOn ? 1 : 0 }}
        />

        <div className="pre-tagline">
          {letters.map((l, i) => (
            <span
              key={i}
              style={{ opacity: l.opacity, transform: l.transform }}
            >
              {l.ch}
            </span>
          ))}
        </div>

        <div className="pre-progress-row">
          <span className="pre-progress-line" />
          <span className="pre-progress-pct">{count}%</span>
          <span className="pre-progress-line" />
        </div>
      </div>
    </>
  );
}
