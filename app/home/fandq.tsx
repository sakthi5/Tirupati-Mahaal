"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Do you offer customisable packages to suit different budgets?",
    a: "Absolutely! We believe every love story is unique, and so should be your wedding. We offer fully customisable packages tailored to your vision, guest count, and budget — from intimate ceremonies to grand celebrations.",
  },
  {
    q: "Can you assist with destination weddings or events in different locations?",
    a: "Absolutely, we specialize in destination weddings, ensuring you fully enjoy your special day while we handle everything else.",
  },
  {
    q: "How early should we book your services for our wedding?",
    a: "We recommend booking at least 9–12 months in advance for peak season dates (October–February). For off-season or weekday weddings, 6 months is usually sufficient. Early booking ensures your preferred vendors and venue are secured.",
  },
  {
    q: "Are there additional costs we should be aware of beyond the initial service fee?",
    a: "We believe in complete transparency. Our initial quote covers all agreed services. Any additional costs — such as last-minute vendor additions, travel for destination events, or décor upgrades — are always discussed and approved by you before proceeding.",
  },
  {
    q: "Do you coordinate with vendors like photographers, caterers, and florists?",
    a: "Yes! We have a curated network of trusted vendors — photographers, caterers, florists, musicians, and more. We handle all coordination and communication so you can focus on enjoying your journey to the altar.",
  },
];

export default function FAndQ() {
  const [openIndex, setOpenIndex] = useState(1);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? -1 : i);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Cormorant+Garamond:wght@300;400&family=Inter:wght@300;400&display=swap');

        /* ── Section wrapper ── */
        .faq-section {
        background-image: url("/images/bg-1.jpg");
        background-size: cover;
          position: relative;
          /* background: #FDEFDE;   */
          padding: 6rem 2rem 7rem;
          overflow: hidden;
        }

        /* ── Side floral images ── */
        .faq-floral {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: clamp(160px, 18vw, 280px);
          height: 80%;
          object-fit: cover;
          object-position: center;
          opacity: 0.10;
          pointer-events: none;
          user-select: none;
          filter: sepia(30%) saturate(0.6);
        }
        .faq-floral-left  { left: 0; }
        .faq-floral-right { right: 0; transform: translateY(-50%) scaleX(-1); }

        /* ── Inner container ── */
        .faq-inner {
          position: relative;
          z-index: 2;
          max-width: 660px;
          margin: 0 auto;
        }

        /* ── Heading ── */
        .faq-heading {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          font-weight: 700;
          color: #2A1A0E;
          text-align: center;
          letter-spacing: -0.01em;
          line-height: 1.15;
          margin: 0 0 3rem;
        }

        /* ── Accordion list ── */
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          list-style: none;
          margin: 0; padding: 0;
        }

        /* ── Each item ── */
        .faq-item {
          background: #fff;
          border: 1px solid rgba(196, 150, 106, 0.18);
          border-radius: 6px;
          overflow: hidden;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .faq-item.open {
          border-color: rgba(196, 150, 106, 0.35);
          box-shadow: 0 4px 24px rgba(196, 150, 106, 0.08);
        }

        /* ── Question row ── */
        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.3rem 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        .faq-question-text {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.88rem, 1.4vw, 0.95rem);
          font-weight: 400;
          color: #2A1A0E;
          line-height: 1.55;
          letter-spacing: 0.01em;
        }

        /* Chevron icon */
        .faq-chevron {
          flex-shrink: 0;
          width: 18px;
          height: 18px;
          color: #8C6A50;
          transition: transform 0.35s cubic-bezier(.77,0,.18,1);
        }
        .faq-item.open .faq-chevron {
          transform: rotate(180deg);
        }

        /* ── Answer panel ── */
        .faq-answer-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.38s cubic-bezier(.77,0,.18,1);
        }
        .faq-item.open .faq-answer-wrap {
          grid-template-rows: 1fr;
        }
        .faq-answer-inner {
          overflow: hidden;
        }
        .faq-answer {
          padding: 0 1.5rem 1.4rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.95rem, 1.5vw, 1.05rem);
          font-weight: 400;
          color: #8C6A50;
          line-height: 1.75;
          letter-spacing: 0.02em;
        }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .faq-section { padding: 4rem 1.2rem 5rem; }
          .faq-floral { width: 100px; opacity: 0.07; }
        }
      `}</style>

      <section className="faq-section">

        {/* Floral side images */}
        <img
          src="https://images.unsplash.com/photo-1490750967868-88df5691cc46?w=600&q=70"
          alt=""
          className="faq-floral faq-floral-left"
          aria-hidden="true"
        />
        <img
          src="https://images.unsplash.com/photo-1490750967868-88df5691cc46?w=600&q=70"
          alt=""
          className="faq-floral faq-floral-right"
          aria-hidden="true"
        />

        <div className="faq-inner">
          <h2 className="faq-heading">Frequently asked questions</h2>

          <ul className="faq-list">
            {faqs.map((item, i) => (
              <li key={i} className={`faq-item${openIndex === i ? " open" : ""}`}>
                <button
                  className="faq-question"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                >
                  <span className="faq-question-text">{item.q}</span>
                  <svg
                    className="faq-chevron"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <div className="faq-answer-wrap">
                  <div className="faq-answer-inner">
                    <p className="faq-answer">{item.a}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}