"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppContact from "@/components/layout/whatsapp";

export default function VenuePage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px", background: "#FDEFDE" }}>
        <VenueSection />
      </main>
      <Footer />
      <WhatsAppContact />
    </>
  );
}

function VenueSection() {
  const MAPS_URL =
    "https://www.google.com/maps/place/THIRUPATHI+MAHAL/@10.3889601,78.8074966,215m/data=!3m1!1e3!4m14!1m7!3m6!1s0x3b0079d20b507059:0x4631628872673134!2sTHIRUPATHI+MAHAL!8m2!3d10.3885765!4d78.8083858!16s%2Fg%2F11pv5mbrw0!3m5!1s0x3b0079d20b507059:0x4631628872673134!8m2!3d10.3885765!4d78.8083858!16s%2Fg%2F11pv5mbrw0";

  const locations = [
    { name: "MUNNAR", km: 86, pos: "left-top", icon: "mountain" },
    { name: "KODAIKANAL", km: 99, pos: "left-bottom", icon: "forest" },
    { name: "OOTY", km: 160, pos: "right-top", icon: "cloud" },
  ];

  const Star = ({ className }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="#DDB98A"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 1.5 L14.4 9 L22.5 9 L15.9 13.8 L18.3 21.5 L12 16.6 L5.7 21.5 L8.1 13.8 L1.5 9 L9.6 9 Z" />
    </svg>
  );

  const diagramRef = useRef<HTMLDivElement>(null);
  const medallionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [connectorPaths, setConnectorPaths] = useState<string[]>([]);

  useEffect(() => {
    function computeConnectors() {
      const diagram = diagramRef.current;
      const medallion = medallionRef.current;
      if (!diagram || !medallion) return;

      const diagramRect = diagram.getBoundingClientRect();
      const medRect = medallion.getBoundingClientRect();
      const medCenter = {
        x: medRect.left + medRect.width / 2 - diagramRect.left,
        y: medRect.top + medRect.height / 2 - diagramRect.top,
      };
      const medRadius = medRect.width / 2;

      const paths = cardRefs.current.map((card) => {
        if (!card) return "";
        const cardRect = card.getBoundingClientRect();
        const cardCenter = {
          x: cardRect.left + cardRect.width / 2 - diagramRect.left,
          y: cardRect.top + cardRect.height / 2 - diagramRect.top,
        };
        const dx = cardCenter.x - medCenter.x;
        const dy = cardCenter.y - medCenter.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const ux = dx / dist;
        const uy = dy / dist;

        const start = {
          x: medCenter.x + ux * medRadius,
          y: medCenter.y + uy * medRadius,
        };
        const pullBack = Math.min(cardRect.width, cardRect.height) / 2;
        const end = {
          x: cardCenter.x - ux * pullBack,
          y: cardCenter.y - uy * pullBack,
        };
        const perpX = -uy;
        const perpY = ux;
        // Scale the curve off the actual visible segment (start→end), not the
        // full medallion-to-card-center distance — otherwise pulling the card
        // in close to the medallion makes the control points overshoot wildly.
        const segDx = end.x - start.x;
        const segDy = end.y - start.y;
        const segDist = Math.sqrt(segDx * segDx + segDy * segDy) || 1;
        const bow = segDist * 0.28;
        const c1 = {
          x: start.x + ux * segDist * 0.35 + perpX * bow,
          y: start.y + uy * segDist * 0.35 + perpY * bow,
        };
        const c2 = {
          x: end.x - ux * segDist * 0.35 + perpX * bow,
          y: end.y - uy * segDist * 0.35 + perpY * bow,
        };
        return `M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`;
      });

      setConnectorPaths(paths);
    }

    computeConnectors();
    window.addEventListener("resize", computeConnectors);
    const ro = new ResizeObserver(computeConnectors);
    if (diagramRef.current) ro.observe(diagramRef.current);

    return () => {
      window.removeEventListener("resize", computeConnectors);
      ro.disconnect();
    };
  }, []);

  const Leaf = ({ flip }: { flip?: boolean }) => (
    <svg
      className="leaf"
      viewBox="0 0 24 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M2 7 C8 1.5 16 1.5 22 7"
        stroke="#C4966A"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M2 7 C8 12.5 16 12.5 22 7"
        stroke="#C4966A"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500&display=swap');

        /* ── Page shell ── */
        .vp-wrap {
          background: #FDEFDE;
          // min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        /* ── Parchment texture layer ── */
        .vp-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(ellipse at 20% 20%, rgba(196,150,106,0.07) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 80%, rgba(196,150,106,0.06) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Corner ornaments (pure CSS) ── */
        .vp-corner {
          position: absolute;
          width: 90px; height: 90px;
          pointer-events: none;
          z-index: 1;
          opacity: 0.55;
        }
        .vp-corner svg { width: 100%; height: 100%; }
        .vp-corner-tl { top: 16px; left: 16px; }
        .vp-corner-tr { top: 16px; right: 16px; transform: scaleX(-1); }
        .vp-corner-bl { bottom: 16px; left: 16px; transform: scaleY(-1); }
        .vp-corner-br { bottom: 16px; right: 16px; transform: scale(-1); }

        /* ── Inner container ── */
        .vp-inner {
          position: relative;
          z-index: 2;
          margin: 0 auto;
          padding: 2rem 2rem 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ── Eyebrow ── */
        .vp-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 0.68rem;
          font-weight: 400;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: #8C6A50;
          margin: 0 0 0.7rem;
          display: flex; align-items: center; gap: 0.7rem;
        }
        .vp-eyebrow::before, .vp-eyebrow::after {
          content: '◆';
          font-size: 0.45rem;
          color: #C4966A;
          opacity: 0.7;
        }

        /* Top gold divider */
        .vp-divider {
          display: flex; align-items: center; gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .vp-divider-line {
          width: 60px; height: 1px;
          background: linear-gradient(90deg, transparent, #C4966A);
        }
        .vp-divider-line.rev { background: linear-gradient(90deg, #C4966A, transparent); }
        .vp-divider-gem {
          width: 8px; height: 8px;
          background: #C4966A;
          transform: rotate(45deg);
          opacity: 0.8;
        }

        /* ── Title block ── */
        .vp-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 6vw, 4rem);
          font-weight: 700;
          color: #2A1A0E;
          text-align: center;
          line-height: 1.1;
          margin: 0 0 0.5rem;
          letter-spacing: -0.01em;
        }
        .vp-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1rem, 2.5vw, 1.4rem);
          font-weight: 400;
          font-style: italic;
          color: #6B4F3A;
          text-align: center;
          margin: 0;
          letter-spacing: 0.03em;
        }

        /* ── Map diagram ── */
        .vp-diagram {
          width: 100%;
          max-width: 86%;
          position: relative;
          isolation: isolate;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          grid-template-rows: auto auto;
          gap: 1.5rem 2rem;
          align-items: center;
          margin-bottom: 3.5rem;
        }

        /* Curved medallion-to-card connectors */
        .vp-medallion-connectors {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: visible;
        }
        .vp-medallion-connector-path {
          fill: none;
          stroke: #C4966A;
          stroke-width: 1.4;
          stroke-linecap: round;
          stroke-dasharray: 3 8;
          opacity: 0.6;
          animation: vpConnectorFlow 2.4s linear infinite;
        }
        .vp-medallion-connector-spark {
          fill: #DDB98A;
        }
        @keyframes vpConnectorFlow {
          to { stroke-dashoffset: -22; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vp-medallion-connector-path { animation: none; }
          .vp-medallion-connector-spark { display: none; }
        }

        /* Center medallion */
        .vp-medallion-wrap {
          grid-column: 2;
          grid-row: 1 / 3;
          order: 1;
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .vp-medallion {
          width: clamp(170px, 22vw, 220px);
          height: clamp(170px, 22vw, 220px);
          border-radius: 50%;
          background: #3B0D24;
          border: 3px solid #C4966A;
          box-shadow:
            0 0 0 6px rgba(196,150,106,0.15),
            0 0 0 10px rgba(196,150,106,0.07),
            0 8px 48px rgba(59,13,36,0.35);
          object-fit: contain;
          position: relative;
        }

        /* Crest icon inside medallion */
        .vp-medallion-crest-wrap {
          position: relative;
          width: clamp(64px, 10vw, 86px);
          height: clamp(64px, 10vw, 86px);
          margin-bottom: 0.5rem;
        }
        .vp-medallion-crest-wrap svg { width: 100%; height: 100%; display: block; }

        .vp-medallion-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.75rem, 1.5vw, 0.92rem);
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #C4966A;
          line-height: 1.45;
        }

        .vp-medallion-ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          margin-top: 0.5rem;
          opacity: 0.75;
        }
        .vp-medallion-ornament svg { width: 10px; height: 10px; }
        .vp-medallion-ornament svg.leaf { width: 16px; height: 10px; }

        /* ── Location cards ── */
        .vp-loc {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 1.4rem;
        }
        .vp-loc.right { flex-direction: row-reverse; }
        .vp-loc-munnar { grid-column: 1; grid-row: 1; order: 2; }
        .vp-loc-kodaikanal { grid-column: 1; grid-row: 2; order: 3; }
        .vp-loc-ooty { grid-column: 3; grid-row: 1; order: 4; }

        /* Photo circle */
        .vp-loc-photo-wrap {
          position: relative;
          flex-shrink: 0;
        }
        .vp-loc-photo {
          width: clamp(100px, 13vw, 170px);
          height: clamp(100px, 13vw, 170px);
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #C4966A;
          display: block;
          filter: sepia(10%) saturate(0.95);
        }
        /* Floral badge on photo — sits on the outer edge of the circle */
        .vp-loc-badge {
          position: absolute;
          bottom: -6px;
          width: 30px; height: 30px;
          border-radius: 50%;
          background: #3B0D24;
          border: 2px solid #C4966A;
          box-shadow: 0 3px 10px rgba(42,26,14,0.25);
          display: flex; align-items: center; justify-content: center;
          z-index: 1;
        }
        .vp-loc-badge svg { width: 14px; height: 14px; }
        .vp-loc-badge.left { left: -6px; }
        .vp-loc-badge.right { right: -6px; }

        /* Info card */
        .vp-loc-card {
          background: rgba(255,255,255,0.75);
          border: 1px solid rgba(196,150,106,0.25);
          border-radius: 10px;
          padding: 1rem 1.2rem;
          backdrop-filter: blur(4px);
          min-width: 160px;
        }
        .vp-loc-icon {
          color: #C4966A;
          margin-bottom: 0.35rem;
        }
        .vp-loc-icon svg { width: 22px; height: 22px; stroke: #C4966A; fill: none; stroke-width: 1.5; }

        .vp-loc-name {
          font-family: 'Inter', sans-serif;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #2A1A0E;
          margin: 0 0 0.2rem;
        }
        .vp-loc-divider {
          width: 28px; height: 1px;
          background: #C4966A; opacity: 0.5;
          margin-bottom: 0.3rem;
        }
        .vp-loc-km {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #2A1A0E;
          line-height: 1;
          display: flex; align-items: baseline; gap: 0.15em;
        }
        .vp-loc-km span {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 400;
          color: #8C6A50;
        }

        /* Dotted connector lines */
        .vp-connector {
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .vp-connector-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #C4966A;
          flex-shrink: 0;
          animation: vpDotFlow 1.6s ease-in-out infinite;
        }
        .vp-connector-dot.big { width: 9px; height: 9px; }
        .vp-connector-dot:nth-child(1) { animation-delay: 0s; }
        .vp-connector-dot:nth-child(2) { animation-delay: 0.2s; }
        .vp-connector-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes vpDotFlow {
          0%, 100% { opacity: 0.35; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @media (prefers-reduced-motion: reduce) {
          .vp-connector-dot { animation: none; opacity: 0.7; }
        }

        /* Right side description */
        .vp-desc-wrap {
          grid-column: 3;
          grid-row: 2;
          order: 5;
          position: relative;
          z-index: 1;
          display: flex; flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          padding-left: 0.5rem;
        }
        .vp-desc-divider {
          display: flex; align-items: center; gap: 0.5rem;
        }
        .vp-desc-divider-line {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, #C4966A, transparent);
        }
        .vp-desc-gem {
          font-size: 0.5rem; color: #C4966A; opacity: 0.7;
        }
        .vp-desc {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.95rem, 1.8vw, 1.15rem);
          font-weight: 400;
          color: #4A2E1A;
          line-height: 1.75;
          font-style: italic;
          max-width: 260px;
        }

        /* ── Google Maps bar ── */
        .vp-maps-bar {
          display: none;
          width: 100%;
          max-width: 680px;
          background: rgba(255,255,255,0.8);
          border: 1px solid rgba(196,150,106,0.2);
          border-radius: 16px;
          padding: 1rem 1.4rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1 1 320px;
          box-shadow: 0 4px 24px rgba(42,26,14,0.06);
          backdrop-filter: blur(4px);
        }

        .vp-maps-row {
          width: 100%;
          max-width: 680px;
          display: none;
          flex-wrap: wrap;
          align-items: stretch;
          gap: 1rem;
        }

        .vp-maps-icon {
          flex-shrink: 0;
          width: 42px; height: 42px;
        }

        .vp-maps-text { flex: 1; }
        .vp-maps-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: #2A1A0E;
          margin: 0 0 0.15rem;
        }
        .vp-maps-sub {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 300;
          color: #8C6A50;
          margin: 0;
        }

        .vp-maps-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
          background: #3B0D24;
          color: #C4966A;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          padding: 1rem 1.6rem;
          border-radius: 16px;
          border: none; cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, color 0.2s, transform 0.15s;
          white-space: nowrap;
          box-shadow: 0 4px 24px rgba(42,26,14,0.18);
        }
        .vp-maps-btn:hover { background: #2A0819; color: #DDB98A; transform: translateY(-1px); }
        .vp-maps-btn svg { width: 14px; height: 14px; fill: currentColor; flex-shrink: 0; }

        /* ── Responsive ──
           Base styles above cover the laptop view (up to 1440px) via clamp().
           Stacking begins at the tablet breakpoint (1024px) and each step
           below narrows padding/sizing down to small mobile (320px). */

        /* Tablet — collapse the 3-column grid into a single centred column */
        @media (max-width: 1024px) {
          .vp-inner { padding: 2rem 1.5rem 4.5rem; }
          .vp-diagram {
            grid-template-columns: 1fr;
            grid-template-rows: none;
            max-width: 480px;
            gap: 2.25rem;
          }
          .vp-medallion-wrap,
          .vp-loc-munnar,
          .vp-loc-kodaikanal,
          .vp-loc-ooty,
          .vp-desc-wrap {
            grid-column: 1;
            grid-row: auto;
          }
          .vp-loc, .vp-loc.right { flex-direction: row; justify-content: center; }
          .vp-desc-wrap { padding: 0; text-align: center; margin-top: 0.25rem; }
          .vp-desc { max-width: 320px; }
        }

        /* Tablet portrait */
        @media (max-width: 768px) {
          .vp-inner { padding: 1.75rem 1.25rem 4rem; }
          .vp-diagram { max-width: 420px; gap: 1.75rem; }
          .vp-loc { gap: 1.1rem; }
          .vp-corner { width: 60px; height: 60px; }
        }

        /* Large mobile — stack photo/connector/card vertically per location */
        @media (max-width: 480px) {
          .vp-inner { padding: 1.5rem 1rem 3.5rem; }
          .vp-eyebrow { letter-spacing: 0.26em; }
          .vp-title { font-size: clamp(1.8rem, 8vw, 2.4rem); }
          .vp-tagline { font-size: clamp(0.85rem, 4vw, 1rem); }
          .vp-diagram { gap: 1.5rem; }
          .vp-loc, .vp-loc.right { flex-direction: column; gap: 0.7rem; text-align: center; }
          .vp-loc .vp-connector { flex-direction: column; gap: 5px; }
          .vp-loc-card { width: 100%; max-width: 240px; min-width: 0; }
          .vp-medallion { width: 160px; height: 160px; padding: 1.1rem; }
          .vp-medallion-crest-wrap { width: 56px; height: 56px; }
        }

        /* Small mobile down to 320px */
        @media (max-width: 380px) {
          .vp-inner { padding: 1.25rem 0.85rem 3rem; }
          .vp-corner { display: none; }
          .vp-loc-photo { width: 88px; height: 88px; }
          .vp-loc-card { padding: 0.8rem 0.9rem; }
          .vp-medallion { width: 140px; height: 140px; }
          .vp-medallion-crest-wrap { width: 48px; height: 48px; }
          .vp-medallion-name { font-size: 0.68rem; }
        }

        @media (max-width: 768px) {
          .vp-maps-row { flex-direction: column; }
          .vp-maps-bar { text-align: center; flex-direction: column; }
          .vp-maps-btn { width: 100%; }
        }
      `}</style>

      <div className="vp-wrap">
        {/* Corner ornaments */}
        {["tl", "tr", "bl", "br"].map((pos) => (
          <div key={pos} className={`vp-corner vp-corner-${pos}`}>
            <svg
              viewBox="0 0 90 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4 L4 30 M4 4 L30 4"
                stroke="#C4966A"
                strokeWidth="1.5"
              />
              <path
                d="M4 4 L20 20"
                stroke="#C4966A"
                strokeWidth="0.8"
                strokeDasharray="2 3"
              />
              <circle cx="4" cy="4" r="2.5" fill="#C4966A" />
              <circle cx="30" cy="4" r="1.2" fill="#C4966A" opacity="0.5" />
              <circle cx="4" cy="30" r="1.2" fill="#C4966A" opacity="0.5" />
              <path
                d="M15 4 Q15 15 4 15"
                stroke="#C4966A"
                strokeWidth="0.8"
                fill="none"
                opacity="0.4"
              />
              <path
                d="M22 8 L8 22"
                stroke="#C4966A"
                strokeWidth="0.6"
                opacity="0.3"
              />
              <circle cx="26" cy="26" r="1" fill="#C4966A" opacity="0.3" />
            </svg>
          </div>
        ))}

        <div className="vp-inner">
          {/* Eyebrow + title */}
          <p className="vp-eyebrow">Our Venue</p>
          <div className="vp-divider">
            <div className="vp-divider-line rev" />
            <div className="vp-divider-gem" />
            <div className="vp-divider-line" />
          </div>
          <h1 className="vp-title">Explore the Western Gates</h1>
          <p className="vp-tagline">Rich India's Heritage in Hills</p>
          <div className="vp-divider" style={{ marginBottom: "3rem" }}>
            <div className="vp-divider-line rev" />
            <div className="vp-divider-gem" />
            <div className="vp-divider-line" />
          </div>

          {/* ── Diagram ── */}
          <div className="vp-diagram" ref={diagramRef}>
            <svg
              className="vp-medallion-connectors"
              xmlns="http://www.w3.org/2000/svg"
            >
              {connectorPaths.map(
                (d, i) =>
                  d && (
                    <g key={i}>
                      <path className="vp-medallion-connector-path" d={d} />
                      <circle className="vp-medallion-connector-spark" r="2.6">
                        <animateMotion
                          dur="2.4s"
                          begin={`${i * 0.35}s`}
                          repeatCount="indefinite"
                          path={d}
                        />
                      </circle>
                    </g>
                  ),
              )}
            </svg>

            {/* Left top — Munnar */}
            <div className="vp-loc vp-loc-munnar">
              <div className="vp-loc-photo-wrap">
                <img
                  className="vp-loc-photo"
                  src="https://images.unsplash.com/photo-1500534623283-312aade485b7?w=300&q=80"
                  alt="Munnar hills"
                />
                <div className="vp-loc-badge left">
                  <Star />
                </div>
              </div>
              {/* Connector */}
              <div className="vp-connector">
                <div className="vp-connector-dot" />
                <div className="vp-connector-dot" />
                <div className="vp-connector-dot big" />
              </div>
              <div
                className="vp-loc-card"
                ref={(el) => {
                  cardRefs.current[0] = el;
                }}
              >
                <div className="vp-loc-icon">
                  {/* Mountain icon */}
                  <svg viewBox="0 0 24 24">
                    <polyline points="3 20 9 8 13 14 16 10 21 20" />
                    <line x1="3" y1="20" x2="21" y2="20" />
                  </svg>
                </div>
                <p className="vp-loc-name">Munnar</p>
                <div className="vp-loc-divider" />
                <div className="vp-loc-km">
                  86 <span>km</span>
                </div>
              </div>
            </div>

            {/* Centre medallion */}
            <div className="vp-medallion-wrap">
              <img
                className="vp-medallion"
                ref={medallionRef}
                src="/images/Logo-Tirupati-Mahaal.png"
                alt="Tirupati Mahaal"
              />
            </div>

            {/* Right top — Ooty */}
            <div className="vp-loc right vp-loc-ooty">
              <div className="vp-loc-photo-wrap">
                <img
                  className="vp-loc-photo"
                  src="https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=300&q=80"
                  alt="Ooty hills"
                />
                <div className="vp-loc-badge right">
                  <Star />
                </div>
              </div>
              <div className="vp-connector">
                <div className="vp-connector-dot big" />
                <div className="vp-connector-dot" />
                <div className="vp-connector-dot" />
              </div>
              <div
                className="vp-loc-card"
                ref={(el) => {
                  cardRefs.current[1] = el;
                }}
              >
                <div className="vp-loc-icon">
                  {/* Cloud icon */}
                  <svg viewBox="0 0 24 24">
                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                  </svg>
                </div>
                <p className="vp-loc-name">Ooty</p>
                <div className="vp-loc-divider" />
                <div className="vp-loc-km">
                  160 <span>km</span>
                </div>
              </div>
            </div>

            {/* Left bottom — Kodaikanal */}
            <div className="vp-loc vp-loc-kodaikanal">
              <div className="vp-loc-photo-wrap">
                <img
                  className="vp-loc-photo"
                  src="https://images.unsplash.com/photo-1440581572325-0bea30075d9d?w=300&q=80"
                  alt="Kodaikanal hills"
                />
                <div className="vp-loc-badge left">
                  <Star />
                </div>
              </div>
              <div className="vp-connector">
                <div className="vp-connector-dot" />
                <div className="vp-connector-dot" />
                <div className="vp-connector-dot big" />
              </div>
              <div
                className="vp-loc-card"
                ref={(el) => {
                  cardRefs.current[2] = el;
                }}
              >
                <div className="vp-loc-icon">
                  {/* Layered mountain icon */}
                  <svg viewBox="0 0 24 24">
                    <polyline points="2 19 8 10 12 15 15 11 22 19" />
                    <polyline points="5 19 9 13 12 16.5 14.5 13.5 19 19" />
                  </svg>
                </div>
                <p className="vp-loc-name">Kodaikanal</p>
                <div className="vp-loc-divider" />
                <div className="vp-loc-km">
                  99 <span>km</span>
                </div>
              </div>
            </div>

            {/* Right bottom — description */}
            <div className="vp-desc-wrap">
              <div className="vp-desc-divider">
                <div className="vp-desc-divider-line" />
                <span className="vp-desc-gem">◆</span>
              </div>
              <p className="vp-desc">
                A timeless venue surrounded
                <br />
                by nature, heritage and
                <br />
                serenity.
              </p>
              <div className="vp-desc-divider">
                <div className="vp-desc-divider-line" />
                <span className="vp-desc-gem">◆</span>
              </div>
            </div>
          </div>

          {/* ── Google Maps row ── */}
          <div className="vp-maps-row">
            <div className="vp-maps-bar">
              {/* Official Google Maps pin colours */}
              <svg
                className="vp-maps-icon"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 4C16.268 4 10 10.268 10 18c0 11 14 26 14 26s14-15 14-26c0-7.732-6.268-14-14-14z"
                  fill="#EA4335"
                />
                <path
                  d="M24 4C28.418 4 32.418 5.79 35.314 8.686L24 20V4z"
                  fill="#FBBC04"
                />
                <path
                  d="M24 4C19.582 4 15.582 5.79 12.686 8.686L24 20V4z"
                  fill="#34A853"
                />
                <path
                  d="M24 20C27.314 20 30 17.314 30 14s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6z"
                  fill="#fff"
                />
                <path d="M10 18c0 7.732 4 15 8 20l6-18H10z" fill="#C5221F" />
              </svg>
              <div className="vp-maps-text">
                <p className="vp-maps-title">Find us on Google Maps</p>
                <p className="vp-maps-sub">
                  Get directions to Tirupati Mahaal and start your journey with
                  ease.
                </p>
              </div>
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="vp-maps-btn"
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              View on Google Maps
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
