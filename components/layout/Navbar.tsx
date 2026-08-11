"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      // Measure scrollbar width before hiding it
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      // Also pad the fixed navbar so it doesn't shift
      const navbar = document.getElementById("main-navbar");
      if (navbar) navbar.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      const navbar = document.getElementById("main-navbar");
      if (navbar) navbar.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      const navbar = document.getElementById("main-navbar");
      if (navbar) navbar.style.paddingRight = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Venue", href: "/venue" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Venue Availability", href: "/#availability" },
  ];

  const socials = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/tirupati_mahaal?igsh=ODl0ZzhzbWJlOHo5&utm_source=qr",
      icon: (
        <svg
          width="15"
          height="15"
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
    // {
    //   label: "Twitter",
    //   href: "#",
    //   icon: (
    //     <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    //       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    //     </svg>
    //   ),
    // },
    {
      label: "Facebook",
      href: "https://www.facebook.com/share/1Ekbw21KUZ/?mibextid=wwXIfr",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    // {
    //   label: "Pinterest",
    //   href: "#",
    //   icon: (
    //     <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    //       <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
    //     </svg>
    //   ),
    // },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Cormorant+Garamond:wght@300;400&display=swap');

        .nav-wrapper {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 200;
          background-color: rgba(253,239,222,0.94);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          font-family: 'Playfair Display', serif;
          box-shadow: 0 1px 0 rgba(196,150,106,0.35);
          transition: box-shadow 0.3s ease;
        }
        .nav-wrapper.scrolled {
          box-shadow: 0 1px 0 rgba(196,150,106,0.35), 0 10px 30px rgba(26,15,7,0.12);
        }
        .nav-accent-line {
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, #DDB98A 30%, #C4966A 50%, #DDB98A 70%, transparent 100%);
          opacity: 0.7;
        }
        .nav-inner {
          // max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          height: 84px;
          transition: height 0.3s ease;
        }
        .nav-wrapper.scrolled .nav-inner { height: 68px; }

        .nav-brand {
          display: flex; align-items: center; gap: 14px;
          text-decoration: none; flex-shrink: 0;
        }
        .nav-brand-logo {
          width: 48px; height: 48px;
          object-fit: contain;
          display: block;
          flex-shrink: 0;
          transition: width 0.3s ease, height 0.3s ease;
        }
        .nav-wrapper.scrolled .nav-brand-logo {
          width: 38px; height: 38px;
        }
        .nav-brand-text {
          display: flex; flex-direction: column; gap: 5px;
        }
        .nav-brand-name {
          font-family: 'Playfair Display', serif;
          font-weight: 500; font-size: 20px; line-height: 1;
          color: #532744; letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .nav-brand-tagline-row {
          display: flex; align-items: center; gap: 8px;
        }
        .nav-brand-rule {
          width: 16px; height: 1px; background: #C4966A;
          flex-shrink: 0;
        }
        .nav-brand-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400; font-size: 10.5px;
          color: #A97C4C; letter-spacing: 0.26em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .nav-right-cluster {
          display: flex; align-items: center; gap: 2rem;
        }

        .nav-divider {
          width: 1px; height: 26px;
          background: rgba(196,150,106,0.45);
          flex-shrink: 0;
        }

        .nav-phone-group {
          display: flex; align-items: center; gap: 2rem;
        }

        .nav-phone {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px; font-weight: 700;
          letter-spacing: 0.06em;
          color: #FDEFDE;
          text-decoration: none;
          white-space: nowrap;
          background: #9c1c54;
          border: 1px solid #9c1c54;
          border-radius: 999px;
          padding: 7px 18px;
          box-shadow: 0 4px 14px rgba(156,28,84,0.28);
          transition: background 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .nav-phone:hover {
          background: #7d123f;
          border-color: #7d123f;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(156,28,84,0.35);
        }
        .nav-phone-icon {
          width: 15px; height: 15px;
          flex-shrink: 0;
          transform-origin: 50% 10%;
          animation: navPhoneRing 2.6s ease-in-out infinite;
        }
        @keyframes navPhoneRing {
          0%, 8%, 100% { transform: rotate(0deg); }
          1% { transform: rotate(-20deg); }
          2% { transform: rotate(18deg); }
          3% { transform: rotate(-16deg); }
          4% { transform: rotate(12deg); }
          5% { transform: rotate(-8deg); }
          6% { transform: rotate(5deg); }
          7% { transform: rotate(0deg); }
        }

        .sidebar-contact-label {
          display: block; text-align: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; font-weight: 900;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: #8C6A50;
          margin: 0 0 0.6rem;
        }

        .sidebar-phone {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
          align-self: center;
          margin: 0 0 1.6rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px; font-weight: 600;
          letter-spacing: 0.06em;
          color: #FDEFDE;
          text-decoration: none;
          white-space: nowrap;
          background: #9c1c54;
          border: 1px solid #9c1c54;
          border-radius: 999px;
          padding: 8px 22px;
          box-shadow: 0 4px 14px rgba(156,28,84,0.28);
          transition: background 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .sidebar-phone:hover {
          background: #7d123f;
          border-color: #7d123f;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(156,28,84,0.35);
        }
        .sidebar-phone svg {
          width: 15px; height: 15px;
          fill: #FDEFDE;
          flex-shrink: 0;
        }

        .nav-links {
          display: flex; align-items: center; gap: 2.4rem;
          list-style: none; margin: 0; padding: 0;
        }
        .nav-links a {
          font-family: 'Playfair Display', serif;
          font-size: 0.78rem; font-weight: 400;
          text-transform: uppercase;
          color: #6B4F3A; text-decoration: none;
          letter-spacing: 0.18em; white-space: nowrap;
          padding: 8px 0;
          border-bottom: 1px solid transparent;
          transition: color 0.2s, border-color 0.2s;
        }
        .nav-links a:hover { color: #3B2A1A; border-bottom-color: #C4966A; }
        .nav-links a.active { color: #3B2A1A; border-bottom-color: #C4966A; }

        .menu-btn {
          width: 44px; height: 44px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 5px;
          cursor: pointer;
          background: #9c1c5326;
          border: 1px solid #9c1c54;
          border-radius: 50%;
          outline: none;
          flex-shrink: 0;
          transition: border-color 0.2s, background 0.2s;
        }
        .menu-btn:hover {
          border-color: #9c1c54;
          background: #9c1c5302;
        }
        .menu-btn span {
          display: block; height: 1.5px; background: #9c1c54;
        }
        .menu-btn span:nth-child(1) { width: 18px; }
        .menu-btn span:nth-child(2) { width: 12px; }

        .sidebar-backdrop {
          position: fixed; inset: 0; z-index: 300;
          background: rgba(40, 20, 5, 0.45);
          backdrop-filter: blur(2px);
          opacity: 0; pointer-events: none;
          transition: opacity 0.4s ease;
        }
        .sidebar-backdrop.open { opacity: 1; pointer-events: all; }

        .sidebar {
          position: fixed; top: 0; right: 0; bottom: 0;
          z-index: 400;
          width: 340px; max-width: 90vw;
          background: #fdeddeff;
          display: flex; flex-direction: column;
          padding: 2.5rem 2.5rem 2rem;
          transform: translateX(100%);
          transition: transform 0.45s cubic-bezier(.77,0,.18,1);
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .sidebar::-webkit-scrollbar { display: none; }
        .sidebar.open { transform: translateX(0); }

        .sidebar-close {
          align-self: flex-end;
          background: none; border: none; cursor: pointer;
          color: #DDB98A; font-size: 1.6rem; line-height: 1;
          padding: 0; margin-bottom: 2.5rem;
          transition: color 0.2s, transform 0.2s;
        }
        .sidebar-close:hover { color: #1A0F07; transform: rotate(90deg); }

        .sidebar-logo-link {
        display: flex; justify-content: center;
          margin: 0 0 0.9rem;
          text-decoration: none;
        }
        .sidebar-logo-img {
          height: 110px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        .sidebar-location {
          display: flex; justify-content: center; align-items: center; gap: 0.45rem;
          margin: 0 0 1.6rem;
          padding-bottom: 1.6rem;
          border-bottom: 1px solid rgba(196,150,106,0.28);
        }
        .sidebar-location svg {
          width: 25px; height: 25px;
          fill: #9c1c54;
          flex-shrink: 0;
        }
        .sidebar-location span {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; font-weight: 900;
          color: #532744; letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .sidebar-nav {
          display: flex; flex-direction: column;
          gap: 0; list-style: none; margin: 0; padding: 0;
          flex: 1;
        }
        .sidebar-nav li {
          opacity: 0; transform: translateX(20px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .sidebar.open .sidebar-nav li { opacity: 1; transform: translateX(0); }
        .sidebar.open .sidebar-nav li:nth-child(1) { transition-delay: 0.15s; }
        .sidebar.open .sidebar-nav li:nth-child(2) { transition-delay: 0.2s; }
        .sidebar.open .sidebar-nav li:nth-child(3) { transition-delay: 0.25s; }
        .sidebar.open .sidebar-nav li:nth-child(4) { transition-delay: 0.3s; }
        .sidebar.open .sidebar-nav li:nth-child(5) { transition-delay: 0.35s; }

        .sidebar-nav a {
          display: block;
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem; font-weight: 500;
          color: #532744;
          text-decoration: none;
          padding: 0.7rem 0;
          border-bottom: 1px solid rgba(196,150,106,0.12);
          letter-spacing: 0.04em;
          transition: color 0.2s, padding-left 0.25s;
          position: relative;
        }
        .sidebar-nav a::before {
          content: '—';
          position: absolute; left: -1.2rem;
          color: #1A0F07; opacity: 0;
          transition: opacity 0.2s, left 0.25s;
          font-size: 0.9rem;
        }
        .sidebar-nav a:hover { color:   #532744; padding-left: 1.2rem; }
        .sidebar-nav a:hover::before { opacity: 1; left: 0; }
        .sidebar-nav a.active { color: #532744;  text-decoration: underline;  }

        .sidebar-image {
          width: 100%; aspect-ratio: 4/3;
          object-fit: cover; border-radius: 2px;
          margin: 2rem 0 1.5rem;
          opacity: 0.85; filter: sepia(20%);
        }

        .sidebar-socials-label {
          display: block; text-align: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px; font-weight: 900;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: #8C6A50;
          margin: 0 0 0.9rem;
        }

        .sidebar-socials {
          display: flex; gap: 0.85rem;
          list-style: none; margin: 0; padding: 0;
          justify-content: center;
        }
        .sidebar-socials a {
          width: 36px; height: 36px; border-radius: 50%;
          background: transparent;
          border: 1px solid #532744;
          display: flex; align-items: center; justify-content: center;
          color: #532744; text-decoration: none;
          font-size: 0.78rem; font-family: sans-serif;
          transition: background 0.2s, color 0.2s;
        }
        .sidebar-socials a:hover { background: #532744; color: #fff; }

        @media (max-width: 1100px) {
          .nav-phone-group { display: none; }
        }

         @media (max-width: 1000px) {
           .nav-brand-name{font-size:18px;}
           .nav-brand-tagline {font-size: 9.5px;}
            .nav-links {gap: 2rem;}
      }
        @media (max-width: 900px) {
          .nav-links { display: none; }
          .sidebar { width: 100%; max-width: 100vw; padding: 2.2rem 1.8rem 1.8rem; }
          .sidebar-nav a { font-size: 1.3rem; }
        }

        @media (max-width: 480px) {
          .sidebar { padding: 1.8rem 1.4rem 1.4rem; }
          .sidebar-logo-img { height: 84px; }
          .sidebar-nav a { font-size: 1.1rem; letter-spacing: 0.02em; }
          .sidebar-phone { font-size: 15px; padding: 7px 16px; }
          .sidebar-contact-label,
          .sidebar-socials-label { font-size: 0.66rem; letter-spacing: 0.2em; }
          .sidebar-location span { font-size: 0.68rem; }
        }
           @media (max-width: 600px) {
           .nav-brand {gap:10px;}
           .nav-inner {padding:0px 10px;gap: 1rem;}
           .nav-brand-name{font-size:16px;}
           .nav-brand-tagline {font-size: 7.5px;}
      }
      `}</style>

      {/* Backdrop */}
      <div
        className={`sidebar-backdrop${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar${menuOpen ? " open" : ""}`}>
        <button
          className="sidebar-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>

        <Link
          href="/"
          className="sidebar-logo-link"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/images/Logo-Tirupati-Mahaal.png"
            alt="Tirupati Mahaal"
            className="sidebar-logo-img"
          />
        </Link>

        <div className="sidebar-location">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 7.05 11.35 7.35 11.61a1 1 0 001.3 0C13 21.35 20 15.25 20 10c0-4.42-3.58-8-8-8zm0 10.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
          </svg>
          <span>Udumalpet</span>
        </div>

        <p className="sidebar-contact-label">Contact Us</p>
        <a href="tel:+919842226236" className="sidebar-phone">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
          </svg>
          +91 98422 26236
        </a>

        <ul className="sidebar-nav">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname === link.href ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <img src="images/two.JPG" alt="Wedding" className="sidebar-image" />

        <p className="sidebar-socials-label">Follow Us</p>

        <ul className="sidebar-socials">
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
      </aside>

      {/* Navbar */}
      <nav
        id="main-navbar"
        className={`nav-wrapper${scrolled ? " scrolled" : ""}`}
      >
        <div className="nav-accent-line" />
        <div className="nav-inner">
          <Link href="/" className="nav-brand">
            <img
              src="/images/Logo-Tirupati-Mahaal.png"
              alt="Tirupati Mahaal"
              className="nav-brand-logo"
            />
            <span className="nav-brand-text">
              <span className="nav-brand-name">Tirupati Mahaal</span>
              <span className="nav-brand-tagline-row">
                <span className="nav-brand-rule" />
                <span className="nav-brand-tagline">
                  Wedding &amp; Convention Hall
                </span>
              </span>
            </span>
          </Link>

          <div className="nav-right-cluster">
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={pathname === link.href ? "active" : ""}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="nav-phone-group">
              <div className="nav-divider" />

              <a href="tel:+919842226236" className="nav-phone">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="nav-phone-icon"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +91 98422 26236
              </a>

              <div className="nav-divider" />
            </div>

            <button
              className="menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
