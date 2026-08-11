"use client";

const stats = [
  { value: "50+", label: "weddings done" },
  { value: "4.8/5", label: "google rating" },
  // { value: "28,363+", label: "venue partners" },
];

export default function Hero() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,700&family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500&display=swap');

        /* ── Hero shell ── */
        .hero {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 560px;
          overflow: hidden;
          background: #1A0F07;
        }

        /* ── Video Background ── */
        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        /* ── Gradient overlays ── */
        .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 3;
          background:
            linear-gradient(to top, rgba(10,5,2,0.82) 0%, rgba(10,5,2,0.3) 45%, rgba(10,5,2,0.1) 100%),
            linear-gradient(to right, rgba(10,5,2,0.45) 0%, transparent 60%);
        }

        /* ── Content layer ── */
        .hero-content {
          position: absolute;
          inset: 0;
          z-index: 4;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          padding: 0 0 10vh;
        }

        /* ── Top divider line ── */
        .hero-top-line {
          width: 100%;
          height: 1px;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.42) 30%,
            rgba(255,255,255,0.92) 50%,
            rgba(255, 255, 255, 0.42) 70%,
            rgba(255, 255, 255, 0) 100%
          );
          margin-bottom: 1.8rem;
        }

        /* ── Bottom content row ── */
        .hero-bottom {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: center;
          gap: 8rem;
          width: 100%;
          padding: 0 4vw;
          box-sizing: border-box;
        }

        /* Headline */
        .hero-headline {
          display: flex;
          flex-direction: column;
          gap: 0;
          flex-shrink: 0;
        }
        .hero-headline-top {
          font-family: 'Playfair Display', serif;
          font-size: 48px;
          font-weight: 400;
          color: rgba(255,255,255,0.88);
          line-height: 1.15;
          letter-spacing: 0.01em;
          margin: 0 0 10px 0;
        }
        .hero-headline-main {
          font-family: 'Playfair Display', serif;
          font-size: 80px;
          color: #fff;
          line-height: 1.05;
          letter-spacing: -0.01em;
          margin: 0;
          position: relative;
          display: inline-flex;
          align-items: flex-end;
          gap: 0.2em;
        }

        /* Sparkle ✦ next to "Weddings" */
        .hero-sparkle {
          // color: #C4966A;
          font-style: normal;
          font-size: 0.28em;
          font-weight: 400;
          letter-spacing: 0;
          margin-bottom: 0.55em;
          display: inline-flex;
          flex-direction: column;
          gap: 0.25em;
          margin-bottom:45px;
        }

        /* ── Right side: stats + CTA ── */
        .hero-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
          flex-shrink: 0;
        }

        .hero-stats {
          display: flex;
          gap: 2.2rem;
          align-items: flex-end;
        }
        .hero-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.1rem;
        }
        .stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.01em;
          line-height: 1;
          margin-bottom: 10px;
        }
        .stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.04em;
          white-space: nowrap;
        }

        /* CTA button — rose/pink like reference */
        .hero-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          background: #c2185b;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          font-weight: 500;
          letter-spacing: 0.03em;
          padding: 0.72rem 30px;
          border-radius: 15px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
          white-space: nowrap;
          box-shadow: 0 4px 18px rgba(194,24,91,0.4);
          width: 400px;
          height: 60px;
        }
        .hero-cta:hover {
          background: #ad1457;
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(194,24,91,0.5);
        }
        .hero-cta svg {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }

        /* ── Scroll chevron ── */
        .hero-scroll {
          position: absolute;
          bottom: 1.8rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0.5;
          animation: heroScrollBounce 2s ease-in-out infinite;
        }
        .hero-scroll svg {
          width: 22px;
          height: 22px;
          color: #fff;
        }
        @keyframes heroScrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }

        /* ── Entry animations ── */
        .hero-animate {
          opacity: 0;
          transform: translateY(18px);
          animation: heroFadeUp 0.8s ease forwards;
        }
        .hero-animate:nth-child(1) { animation-delay: 0.2s; }
        .hero-animate:nth-child(2) { animation-delay: 0.35s; }
        .hero-animate:nth-child(3) { animation-delay: 0.5s; }
        @keyframes heroFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
        .hero{
        height: 90vh;
          }
          .hero-headline-top {
            font-size: 40px;
          }
          .hero-headline-main {
            font-size: 60px;
          }
          .hero-stats {
            gap: 1rem;
          }
          .stat-value {
            font-size: 24px;
          }
          .stat-label {
            font-size: 12px;
          }
          .hero-cta {
            font-size: 16px;
            padding: 0.6rem 2rem;
            width: 350px;
            height: 55px; 
          }
        }
          @media (max-width: 900px) {
          .hero-headline-top {
            font-size: 30px;
          }
          .hero-headline-main {
            font-size: 50px;
          }
          .hero-stats {
            gap: 0.8rem;
          }
          .stat-value {
            font-size: 20px;
          }
          .stat-label {
            font-size: 10px;
          }
          .hero-cta {
            font-size: 14px;
            padding: 0.6rem 2rem;
            width: 275px;
            height: 55px; 
          }
            .hero-bottom{
            gap:6rem;
      }
              
        }
          
        @media (max-width: 700px) {
          .hero-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.4rem;
            padding: 0 5vw;
          }
          .hero-right {
            align-items: flex-start;
          }
          .hero-stats { gap: 1.2rem; }
          .hero-content { padding: 0 0 6vh; }
          .hero-sparkle {
            margin-bottom: 10px;
          }
            .hero-cta {
            font-size: 12px;
            padding: 0.6rem 2rem;
            width: 250px;
            height: 50px; 
          }
            .hero-scroll svg {
            display:none;
      }
        }
      @media (max-width: 900px) {
          .hero-headline-top {
            font-size: 25px;
          }
          .hero-headline-main {
            font-size: 40px;
          }
          .hero-stats {
            gap: 0.8rem;
          }
          .stat-value {
            font-size: 18px;
          }
         
          .hero-cta {
            font-size: 13px;
            padding: 0.6rem 2rem;
          }
        }
      `}</style>

      <section className="hero">
        {/* Video Background */}
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src="/videos/banner-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="hero-overlay" />

        {/* Bottom content */}
        <div className="hero-content">
          {/* Top divider line */}
          <div className="hero-top-line" />

          <div className="hero-bottom">
            {/* Left: headline */}
            <div className="hero-headline hero-animate">
              <p className="hero-headline-top">Crafting Memorable</p>
              <p className="hero-headline-main">
                Weddings
                <span className="hero-sparkle">
                  ✦<br />✦
                </span>
              </p>
            </div>

            {/* Right: stats + CTA */}
            <div className="hero-right hero-animate">
              <div className="hero-stats">
                {stats.map((s) => (
                  <div className="hero-stat" key={s.label}>
                    <span className="stat-value">{s.value}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
              <a href="/#availability" className="hero-cta">
                Start my wedding planning
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll chevron */}
        <div className="hero-scroll">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </section>
    </>
  );
}
