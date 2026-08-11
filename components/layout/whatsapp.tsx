"use client";

import { useState, useEffect } from "react";

const WHATSAPP_NUMBER = "9597980663"; // Format: country code + number, no +
const WHATSAPP_MESSAGE =
  "Hi! I visited your wedding website and I'd love to know more about your services. 💍";

const VENUE_MAPS_URL =
  "https://www.google.com/maps/place/Tirupati+Mahaal/@10.6079309,77.2734942,1152m/data=!3m1!1e3!4m6!3m5!1s0x3ba9cb6617dbb847:0x77c4e3957324ecf1!8m2!3d10.6077709!4d77.2770051!16s%2Fg%2F11md81r15g?entry=ttu&g_ep=EgoyMDI2MDgwNC4wIKXMDSoASAFQAw%3D%3D";

export default function WhatsAppContact() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when popup open
  useEffect(() => {
    document.body.style.overflow = popupOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [popupOpen]);

  const handleClose = () => {
    setPopupOpen(false);
    setTimeout(() => setRedirecting(false), 400);
  };

  const handleAllow = () => {
    setRedirecting(true);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      handleClose();
    }, 1200);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Cormorant+Garamond:wght@300;400&family=Inter:wght@300;400;500&display=swap');

        /* ── Floating WA button ── */
        .wa-fab {
          position: fixed;
          right: 1.5rem;
          top: 75%;
          transform: translateY(-50%);
          z-index: 490;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.25rem;
        }

        .wa-btn {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #25D366;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(37,211,102,0.4);
          transition: transform 0.25s cubic-bezier(.77,0,.18,1),
                      box-shadow 0.25s ease,
                      background 0.2s;
          position: relative;
        }
        .wa-btn:hover {
          transform: scale(1.1);
          background: #20c15e;
          box-shadow: 0 8px 28px rgba(37,211,102,0.5);
        }
        .wa-btn svg {
          width: 26px;
          height: 26px;
          fill: #fff;
          flex-shrink: 0;
        }

        /* ── Location group (button + vertical label to its right, sits above WA button) ── */
        .loc-group {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .loc-label {
        display:none;
          position: absolute;
          left: calc(100% + 0.5rem);
          font-family: Arial, Helvetica, sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: #000;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          white-space: nowrap;
          user-select: none;
          opacity: 0;
          visibility: hidden;
          transform: translateX(-5px);
          transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
        }
        .loc-group:hover .loc-label {
          opacity: 1;
          visibility: visible;
          transform: translateX(0);
        }
        .loc-btn {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: #9c1c54;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(156,28,84,0.45);
          transition: transform 0.25s cubic-bezier(.77,0,.18,1),
                      box-shadow 0.25s ease,
                      background 0.2s;
        }
        .loc-btn:hover {
          transform: scale(1.1);
          background: #7c1543;
          box-shadow: 0 8px 28px rgba(156,28,84,0.55);
        }
        .loc-btn svg {
          width: 22px;
          height: 22px;
          fill: #fff;
          flex-shrink: 0;
        }

        /* Pulse ring */
        .wa-btn::before {
          content: '';
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 2px solid rgba(37,211,102,0.4);
          animation: waPulse 2.2s ease-out infinite;
        }
        @keyframes waPulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          70%  { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1.35); opacity: 0; }
        }

        /* Vertical label */
        .wa-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.58rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #25D366;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          opacity: 0.75;
          user-select: none;
        }

        /* ── Backdrop ── */
        .wa-backdrop {
          position: fixed;
          inset: 0;
          z-index: 800;
          background: rgba(20, 10, 3, 0.5);
          backdrop-filter: blur(5px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.35s ease;
        }
        .wa-backdrop.open {
          opacity: 1;
          pointer-events: all;
        }

        /* ── Popup card ── */
        .wa-popup {
          position: fixed;
          bottom: 2rem;
          right: 5rem;
          z-index: 900;
          width: min(340px, 90vw);
          background: #FDEFDE;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(20,10,3,0.2);
          overflow: hidden;
          transform: translateY(20px) scale(0.96);
          opacity: 0;
          visibility: hidden;
          transition: transform 0.4s cubic-bezier(.77,0,.18,1),
                      opacity 0.4s ease,
                      visibility 0.4s;
        }
        .wa-popup.open {
          transform: translateY(0) scale(1);
          opacity: 1;
          visibility: visible;
        }

        /* Header bar */
        .wa-popup-header {
          background: #25D366;
          padding: 1.1rem 1.3rem;
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .wa-popup-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .wa-popup-avatar svg {
          width: 22px; height: 22px; fill: #fff;
        }
        .wa-popup-header-text {
          flex: 1;
        }
        .wa-popup-name {
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          color: #fff;
          line-height: 1.2;
        }
        .wa-popup-status {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          color: rgba(255,255,255,0.82);
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          margin-top: 1px;
        }
        .wa-status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #fff;
          opacity: 0.9;
          flex-shrink: 0;
        }
        .wa-close-btn {
          background: none; border: none;
          color: rgba(255,255,255,0.8);
          font-size: 1.1rem;
          cursor: pointer;
          padding: 2px 4px;
          line-height: 1;
          transition: color 0.2s;
          flex-shrink: 0;
        }
        .wa-close-btn:hover { color: #fff; }

        /* Body */
        .wa-popup-body {
          padding: 1.4rem 1.3rem 1.6rem;
        }

        /* Chat bubble */
        .wa-bubble-wrap {
          margin-bottom: 1.3rem;
        }
        .wa-bubble {
          display: inline-block;
          background: #fff;
          border-radius: 0 12px 12px 12px;
          padding: 0.75rem 1rem;
          box-shadow: 0 1px 6px rgba(0,0,0,0.08);
          max-width: 100%;
          position: relative;
        }
        .wa-bubble::before {
          content: '';
          position: absolute;
          top: 0; left: -7px;
          border-width: 0 8px 8px 0;
          border-style: solid;
          border-color: transparent #fff transparent transparent;
        }
        .wa-bubble-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
          color: #1a1a1a;
          line-height: 1.55;
          margin: 0;
        }
        .wa-bubble-time {
          font-family: 'Inter', sans-serif;
          font-size: 0.62rem;
          color: #aaa;
          text-align: right;
          margin-top: 4px;
        }

        /* Redirect hint */
        .wa-redirect-hint {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.82rem;
          font-weight: 300;
          color: #8C6A50;
          font-style: italic;
          text-align: center;
          margin: 0 0 1.1rem;
          line-height: 1.5;
        }

        /* Redirecting state */
        .wa-redirecting {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 0 0.2rem;
        }
        .wa-spinner {
          width: 28px; height: 28px;
          border: 2.5px solid rgba(37,211,102,0.2);
          border-top-color: #25D366;
          border-radius: 50%;
          animation: waSpin 0.8s linear infinite;
        }
        @keyframes waSpin {
          to { transform: rotate(360deg); }
        }
        .wa-redirecting-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          color: #25D366;
          font-weight: 500;
          letter-spacing: 0.05em;
        }

        /* Buttons */
        .wa-actions {
          display: flex;
          gap: 0.6rem;
        }
        .wa-allow {
          flex: 1;
          padding: 0.7rem 1rem;
          background: #25D366;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          transition: background 0.2s, transform 0.15s;
        }
        .wa-allow:hover { background: #20c15e; transform: translateY(-1px); }
        .wa-allow svg { width: 14px; height: 14px; fill: #fff; }

        .wa-cancel {
          padding: 0.7rem 1rem;
          background: transparent;
          color: #8C6A50;
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          font-weight: 400;
          border: 1px solid rgba(196,150,106,0.3);
          border-radius: 8px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .wa-cancel:hover { border-color: #C4966A; color: #3B2A1A; }

        /* Privacy note */
        .wa-privacy {
          font-family: 'Inter', sans-serif;
          font-size: 0.62rem;
          color: #B8916A;
          text-align: center;
          margin-top: 0.9rem;
          opacity: 0.7;
          letter-spacing: 0.03em;
        }

        @media (max-width: 600px) {
          .wa-fab { right: 0.8rem; }
          .wa-popup {
            bottom: 1rem;
            right: 1rem;
            left: 1rem;
            width: auto;
          }
          .wa-label { display: none; }
        }
      `}</style>

      {/* ── Floating buttons ── */}
      <div className="wa-fab">
        <div className="loc-group">
          <button
            className="loc-btn"
            onClick={() =>
              window.open(VENUE_MAPS_URL, "_blank", "noopener,noreferrer")
            }
            aria-label="Open location in Google Maps"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 7.05 11.35 7.35 11.61a1 1 0 001.3 0C13 21.35 20 15.25 20 10c0-4.42-3.58-8-8-8zm0 10.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
            </svg>
          </button>
          <span className="loc-label">Udumalpet</span>
        </div>
        <button
          className="wa-btn"
          onClick={() => setPopupOpen(true)}
          aria-label="Chat on WhatsApp"
        >
          {/* Official WhatsApp icon */}
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </button>
        {/* <span className="wa-label">WhatsApp</span> */}
      </div>

      {/* ── Backdrop ── */}
      <div
        className={`wa-backdrop${popupOpen ? " open" : ""}`}
        onClick={handleClose}
      />

      {/* ── Popup ── */}
      <div
        className={`wa-popup${popupOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="WhatsApp chat"
      >
        {/* Header */}
        <div className="wa-popup-header">
          <div className="wa-popup-avatar">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <div className="wa-popup-header-text">
            <p className="wa-popup-name">TIRUPATI MAHAL</p>
            <p className="wa-popup-status">
              <span className="wa-status-dot" />
              Typically replies within minutes
            </p>
          </div>
          <button
            className="wa-close-btn"
            onClick={handleClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="wa-popup-body">
          {/* Chat bubble */}
          <div className="wa-bubble-wrap">
            <div className="wa-bubble">
              <p className="wa-bubble-text">
                👋 Hi there! Ready to start planning your dream wedding?
                <br />
                <br />
                Click <strong>Allow</strong> to open WhatsApp and chat with our
                planner directly.
              </p>
              <p className="wa-bubble-time">Now</p>
            </div>
          </div>

          {redirecting ? (
            <div className="wa-redirecting">
              <div className="wa-spinner" />
              <p className="wa-redirecting-text">Opening WhatsApp…</p>
            </div>
          ) : (
            <>
              <p className="wa-redirect-hint">
                You'll be redirected to WhatsApp to continue the conversation.
              </p>
              <div className="wa-actions">
                <button className="wa-allow" onClick={handleAllow}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Allow &amp; Open WhatsApp
                </button>
                <button className="wa-cancel" onClick={handleClose}>
                  Cancel
                </button>
              </div>
            </>
          )}

          <p className="wa-privacy">
            🔒 Your details are safe. We never share your info.
          </p>
        </div>
      </div>
    </>
  );
}
