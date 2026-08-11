import { Fragment } from "react";
import Link from "next/link";

// Google Maps location for Tirupati Mahaal
const MAP_URL =
  "https://www.google.com/maps/place/Tirupati+Mahaal/@10.6077154,77.2739915,823m/data=!3m1!1e3!4m6!3m5!1s0x3ba9cb6617dbb847:0x77c4e3957324ecf1!8m2!3d10.6077709!4d77.2770051!16s%2Fg%2F11md81r15g?entry=ttu&g_ep=EgoyMDI2MDgwMi4wIKXMDSoASAFQAw%3D%3D";

export default function Footer() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Venues", href: "/venue" },
    { label: "Venue Availability", href: "/#availability" },
  ];

  const socials = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/tirupati_mahaal?igsh=ODl0ZzhzbWJlOHo5&utm_source=qr",
      icon: (
        <svg
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle
            cx="17.5"
            cy="6.5"
            r="0.5"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/share/1Ekbw21KUZ/?mibextid=wwXIfr",
      icon: (
        <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    // {
    //   label: "Twitter",
    //   href: "#",
    //   icon: (
    //     <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    //       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    //     </svg>
    //   ),
    // },
    // {
    //   label: "Pinterest",
    //   href: "#",
    //   icon: (
    //     <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    //       <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    //     </svg>
    //   ),
    // },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400&display=swap');

        .footer {
          position: relative;
          background: #FDEFDE;
          background-image: radial-gradient(120% 90% at 50% 0%, rgba(196,150,106,0.16) 0%, rgba(196,150,106,0) 62%);
          border-top: 1px solid rgba(196, 150, 106, 0.15);
          overflow: hidden;
        }

        /* ── Top divider line ── */
        .footer-accent {
          height: 3px;
          background: linear-gradient(90deg, transparent 0%, #DDB98A 18%, #C4966A 50%, #DDB98A 82%, transparent 100%);
          opacity: 0.55;
        }

        /* ── Ornamental flourish row ── */
        .footer-flourish {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 26px 40px 0;
        }
        .footer-flourish-line {
          flex: 1;
          max-width: 360px;
          height: 1px;
        }
        .footer-flourish-line.left {
          background: linear-gradient(90deg, transparent, rgba(196,150,106,0.6));
        }
        .footer-flourish-line.right {
          background: linear-gradient(90deg, rgba(196,150,106,0.6), transparent);
        }
        .footer-flourish-ornament {
          width: 82px;
          height: 14px;
          flex-shrink: 0;
        }

        @keyframes footerRingSpin {
          to { transform: rotate(360deg); }
        }

        /* ── Vertical column dividers ── */
        .footer-vdivider {
          width: 1px;
          align-self: stretch;
          background: linear-gradient(180deg, transparent, rgba(196,150,106,0.45) 22%, rgba(196,150,106,0.45) 78%, transparent);
        }

        /* ── Main footer grid ── */
        .footer-main {
          margin: 0 auto;
          padding: 2.2rem 2.5rem 2.5rem;
          display: grid;
          grid-template-columns: minmax(330px, 1fr) 1px auto 1px minmax(330px, 1fr);
          gap: 2.4rem;
          align-items: start;
        }

        /* ── Left: Contact ── */
        .footer-col-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        .footer-section-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 400;
          letter-spacing: 0.20em;
          text-transform: uppercase;
          color: #8C6A50;
          margin-top: 1.2rem;
          margin-bottom: 0.9rem;
        }
        .footer-section-label:first-child {
          margin-top: 0;
        }
        .footer-label-gem {
          display: block;
          width: 6px;
          height: 6px;
          background: #C4966A;
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        .footer-divider {
          width: 28px;
          height: 1px;
          background: #C4966A;
          opacity: 0.5;
          margin-bottom: 1.4rem;
        }

        .footer-contact-email {
          font-family: 'Cormorant Garamond', serif;
          font-size: 25px;
          font-weight: 500;
          color: #532744;
          text-decoration: none;
          letter-spacing: 0.04em;
          margin-bottom: 1.2rem;
          display: block;
          transition: color 0.2s;
          text-align: center;
        }
        .footer-contact-email:hover { color: #3B2A1A; }

        .footer-contact-phone {
          font-family: 'Cormorant Garamond', serif;
          font-size: 25px;
          font-weight: 500;
          color: #FDEFDE;
          letter-spacing: 0.06em;
          margin-bottom: 1.4rem;
          text-align: center;
          text-decoration: none;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #9c1c54;
          border: 1px solid #9c1c54;
          border-radius: 999px;
          padding: 9px 26px;
          box-shadow: 0 8px 20px rgba(156,28,84,0.22);
          transition: background 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .footer-contact-phone:hover {
          background: #7d123f;
          border-color: #7d123f;
          transform: translateY(-2px);
          box-shadow: 0 12px 26px rgba(156,28,84,0.3);
        }
        .footer-contact-phone svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        .footer-contact-bio {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 500;
          color: #532744;
          line-height: 1.65;
          letter-spacing: 0.02em;
          text-align: center;
          max-width: 350px;
          margin: 0;
          padding: 14px 18px;
          border-top: 1px solid rgba(196,150,106,0.35);
          border-bottom: 1px solid rgba(196,150,106,0.35);
        }

        /* ── Centre: Brand ── */
        .footer-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
          padding-top: 0.5rem;
        }

        /* Logo */
        .footer-logo-icon {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 150px;
          height: 150px;
        }
        .footer-logo-ring-spin {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px dashed rgba(196,150,106,0.55);
          animation: footerRingSpin 46s linear infinite;
        }
        .footer-logo-ring-inner {
          position: absolute;
          inset: 11px;
          border-radius: 50%;
          border: 1px solid rgba(196,150,106,0.7);
          background: radial-gradient(circle at 50% 35%, rgba(255,255,255,0.85), rgba(253,239,222,0) 70%);
        }
        .footer-logo-img {
          position: relative;
          height: 80px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        .footer-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 600;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #532744;
          white-space: nowrap;
          margin: 0;
        }

        .footer-brand-rule {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-brand-rule span:first-child,
        .footer-brand-rule span:last-child {
          width: 54px;
          height: 1px;
        }
        .footer-brand-rule span:first-child {
          background: linear-gradient(90deg, transparent, #C4966A);
        }
        .footer-brand-rule span:last-child {
          background: linear-gradient(90deg, #C4966A, transparent);
        }
        .footer-brand-rule-gem {
          width: 5px;
          height: 5px;
          background: #C4966A;
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        .footer-location {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .footer-location svg {
          width: 13px;
          height: 13px;
          fill: #9c1c54;
          flex-shrink: 0;
        }
        .footer-location span {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.78rem;
          font-weight: 900;
          color: #8C6A50;
          letter-spacing: 0.20em;
          text-transform: uppercase;
        }

        /* Socials row */
        .footer-socials-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 2.4rem;
        }
        .footer-socials-wrapper .footer-section-label {
          margin: 0;
        }

        .footer-socials {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          list-style: none;
          margin: 0; padding: 0;
        }
        .footer-socials a {
          width: 44px;
          height: 44px;
          border: 1px solid rgba(196,150,106,0.5);
          border-radius: 50%;
          color: #B8916A;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s, transform 0.2s, background 0.2s, border-color 0.2s;
        }
        .footer-socials a:hover {
          color: #9c1c54;
          transform: translateY(-2px);
          background: rgba(196, 150, 106, 0.05);
          border-color: #9c1c54;
        }

        /* ── Right: Find Us (map) ── */
        .footer-col-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          
        }

        .footer-map-link {
          display: block;
          width: 100%;
          max-width: 420px;
          text-decoration: none;
        }

        /* Real map screenshot — frame ratio matches the source image
           (1095x638) so object-fit: cover never has to crop it. */
        .footer-map-frame {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 1095 / 638;
          border-radius: 6px;
          overflow: hidden;
          background: #F7DFC1;
          box-shadow: 0 10px 28px rgba(59, 42, 26, 0.18);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 5px solid #c49b6aff;
        }
        .footer-map-link:hover .footer-map-frame {
          transform: translateY(-3px);
          box-shadow: 0 16px 36px rgba(59, 42, 26, 0.24);
        }

        .footer-map-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        /* Soft radar-style ping ring accenting the pin already marked on
           the map photo (positioned to match the pin in the source image). */
        .footer-map-ping {
          position: absolute;
          left: 46.9%;
          top: 57.5%;
          width: 25px;
          height: 25px;
          margin: -8px 0 0 -8px;
          border-radius: 50%;
          border: 2px solid rgba(196, 150, 106, 0.85);
          animation: footerMapPing 2.2s ease-out infinite;
          z-index: 1;
          pointer-events: none;
        }
        @keyframes footerMapPing {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(3.2); opacity: 0; }
        }

        /* Hover overlay — affordance that the card is clickable */
        .footer-map-hover {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(59, 42, 26, 0);
          opacity: 0;
          transition: opacity 0.25s ease, background 0.25s ease;
          z-index: 2;
        }
        .footer-map-link:hover .footer-map-hover {
          opacity: 1;
          background: rgba(59, 42, 26, 0.32);
        }
        .footer-map-hover span {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.75);
          padding: 8px 16px;
          border-radius: 24px;
          white-space: nowrap;
        }

        /* ── Bottom nav bar ── */
        .footer-bottom-band {
          border-top: 1px solid rgba(196, 150, 106, 0.25);
          background: linear-gradient(180deg, rgba(247,223,193,0.45), rgba(247,223,193,0.85));
        }
        .footer-bottom {
          padding: 1.4rem 2.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        .footer-nav {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.6rem;
          list-style: none;
          margin: 0; padding: 0;
        }
        .footer-nav-gem {
          width: 5px;
          height: 5px;
          background: #C4966A;
          opacity: 0.6;
          transform: rotate(45deg);
          flex-shrink: 0;
        }
        .footer-nav a {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #8C6A50;
          text-decoration: none;
          padding-bottom: 4px;
          border-bottom: 1px solid transparent;
          transition: color 0.2s, border-color 0.2s;
        }
        .footer-nav a:hover { color: #3B2A1A; border-color: #C4966A; }

        /* ── Responsive ──
           The 5-column grid (minmax(330px,1fr) 1px auto 1px minmax(330px,1fr))
           needs ~1180px to fit without overlap, so it has to switch to a
           stacked single column well before the usual 768px "mobile" cutoff —
           otherwise tablets and small laptops fall in a gap where the grid
           silently overflows and gets clipped by .footer's overflow:hidden. */
        @media (max-width: 1180px) {
          .footer-main {
            grid-template-columns: 1fr;
            padding: 3rem 1.8rem 2rem;
            gap: 2.5rem;
            text-align: center;
          }
          .footer-vdivider { display: none; }
          .footer-flourish { padding: 20px 16px 0; gap: 8px; }
          .footer-flourish-ornament { width: 60px; }
          .footer-nav { gap: 1rem; flex-wrap: wrap; }
          .footer-map-link { max-width: 380px; margin: 0 auto; }
        }

        @media (max-width: 480px) {
          .footer-logo-icon { width: 120px; height: 120px; }
          .footer-logo-ring-inner { inset: 9px; }
          .footer-logo-img { height: 64px; }
          .footer-logo-text { font-size: 17px; letter-spacing: 0.28em; }
          .footer-contact-email { font-size: 21px; }
          .footer-contact-phone { font-size: 19px; padding: 8px 18px; }
          .footer-contact-bio { font-size: 16px; }
          .footer-nav { gap: 0.7rem; }
          .footer-nav a { font-size: 12px; letter-spacing: 0.16em; }
        }
      `}</style>
      <footer className="footer">
        <div className="footer-accent" />

        {/* ── Ornamental flourish ── */}
        <div aria-hidden="true" className="footer-flourish">
          <span className="footer-flourish-line left" />
          <svg viewBox="0 0 120 16" className="footer-flourish-ornament">
            <line x1="0" y1="8" x2="104" y2="8" stroke="#C4966A" strokeWidth="1.2" />
            <rect x="20" y="4" width="8" height="8" fill="#C4966A" transform="rotate(45 24 8)" />
            <rect x="58" y="4" width="8" height="8" fill="#C4966A" transform="rotate(45 62 8)" />
            <rect x="94" y="2" width="12" height="12" fill="#C4966A" transform="rotate(45 100 8)" />
            <circle cx="113" cy="8" r="2.2" fill="#C4966A" />
          </svg>
          <svg viewBox="0 0 120 16" className="footer-flourish-ornament" style={{ transform: "scaleX(-1)" }}>
            <line x1="0" y1="8" x2="104" y2="8" stroke="#C4966A" strokeWidth="1.2" />
            <rect x="20" y="4" width="8" height="8" fill="#C4966A" transform="rotate(45 24 8)" />
            <rect x="58" y="4" width="8" height="8" fill="#C4966A" transform="rotate(45 62 8)" />
            <rect x="94" y="2" width="12" height="12" fill="#C4966A" transform="rotate(45 100 8)" />
            <circle cx="113" cy="8" r="2.2" fill="#C4966A" />
          </svg>
          <span className="footer-flourish-line right" />
        </div>

        <div className="footer-main">
          {/* ── Left: Contact ── */}
          <div className="footer-col-left">
            <p className="footer-section-label">
              <span aria-hidden="true" className="footer-label-gem" />
              Contact
              <span aria-hidden="true" className="footer-label-gem" />
            </p>
            <div className="footer-divider" />
            <a
              href="mailto:tirupathimahal@gmail.com"
              className="footer-contact-email"
            >
              tirupatimahaal@gmail.com
            </a>
            <p className="footer-contact-bio">
              25/2 Indra Nagar, Dharapuram Road,
              <br />
              Thungavi, Post, Periakottai,
              <br />
              Udumalaipettai, Tamil Nadu 642203
            </p>
            <div className="footer-socials-wrapper">
              <p className="footer-section-label">Follow Us:</p>
              <ul className="footer-socials">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      aria-label={s.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div aria-hidden="true" className="footer-vdivider" />

          {/* ── Centre: Brand ── */}
          <div className="footer-brand">
            <div className="footer-logo-icon">
              <span aria-hidden="true" className="footer-logo-ring-spin" />
              <span aria-hidden="true" className="footer-logo-ring-inner" />
              <img
                src="/images/Logo-Tirupati-Mahaal.png"
                alt="Tirupati Mahal"
                className="footer-logo-img"
              />
            </div>

            <p className="footer-logo-text">Tirupati Mahaal</p>

            <div aria-hidden="true" className="footer-brand-rule">
              <span />
              <span className="footer-brand-rule-gem" />
              <span />
            </div>

            <div className="footer-location">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 7.05 11.35 7.35 11.61a1 1 0 001.3 0C13 21.35 20 15.25 20 10c0-4.42-3.58-8-8-8zm0 10.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
              </svg>
              <span>Udumalpet</span>
            </div>

            <a href="tel:+919842226236" className="footer-contact-phone">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +91 98422 26236
            </a>
          </div>

          <div aria-hidden="true" className="footer-vdivider" />

          {/* ── Right: Find Us (real map image) ── */}
          <div className="footer-col-right">
            <p className="footer-section-label">
              <span aria-hidden="true" className="footer-label-gem" />
              Find Us
              <span aria-hidden="true" className="footer-label-gem" />
            </p>
            <div className="footer-divider" />

            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-map-link"
              aria-label="Open Tirupati Mahal location in Google Maps"
            >
              <span className="footer-map-frame">
                <img
                  src="/images/tirupati-mahal-map.png"
                  alt="Map showing Tirupati Mahal's location"
                  className="footer-map-img"
                />
                <span className="footer-map-ping" />
                <span className="footer-map-hover">
                  <span>View on Google Maps</span>
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* ── Bottom nav ── */}
        <div className="footer-bottom-band">
          <div className="footer-bottom">
            <ul className="footer-nav">
              {navLinks.map((l, i) => (
                <Fragment key={l.href}>
                  {i > 0 && (
                    <li aria-hidden="true" className="footer-nav-gem" />
                  )}
                  <li>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                </Fragment>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
