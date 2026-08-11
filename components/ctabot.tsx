"use client";

import { useState, useEffect } from "react";

export default function QuotePopup() {
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > window.innerHeight * 0.5;

      const footer = document.querySelector('.footer');
      let isNearFooter = false;

      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        // Check if the top of the footer is inside the viewport
        isNearFooter = footerRect.top <= window.innerHeight;
      } else {
        // Fallback just in case footer class is not found
        isNearFooter = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100;
      }

      setShowCta(isScrolled && !isNearFooter);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&display=swap');

                .qp-cta {
                    position: fixed;
                    bottom: 2rem;
                    left: 50%;
                    transform: translateX(-50%) translateY(80px);
                    z-index: 500;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.6rem;
                    background: #c2185b;
                    color: #fff;
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 1rem;
                    font-weight: 500;
                    letter-spacing: 0.08em;
                    padding: 0.85rem 2rem;
                    border-radius: 15px;
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 6px 28px rgba(196,150,106,0.4);
                    opacity: 0;
                    visibility: hidden;
                    transition:
                        opacity 0.5s cubic-bezier(.77,0,.18,1),
                        transform 0.5s cubic-bezier(.77,0,.18,1),
                        visibility 0.5s,
                        background 0.25s,
                        box-shadow 0.25s;
                    white-space: nowrap;
                }

                .qp-cta.visible {
                    opacity: 1;
                    visibility: visible;
                    transform: translateX(-50%) translateY(0);
                }

                .qp-cta:hover {
                    background: #c2185b;
                    box-shadow: 0 10px 36px #c2185b;
                }

                .qp-cta svg {
                    width: 16px;
                    height: 16px;
                    flex-shrink: 0;
                }

                .qp-cta::before {
                    content: '';
                    position: absolute;
                    inset: -4px;
                    border-radius: 15px;
                    border: 2px solid #c2185b;
                    animation: qpPulse 2s ease-out infinite;
                }

                @keyframes qpPulse {
                    0%   { transform: scale(1);   opacity: 0.7; }
                    70%  { transform: scale(1.12); opacity: 0; }
                    100% { transform: scale(1.12); opacity: 0; }
                }

                @media (max-width: 480px) {
                    .qp-cta {
                        font-size: 0.9rem;
                        padding: 0.75rem 1.5rem;
                        bottom: 1.5rem;
                    }
                }
            `}</style>

      <button 
        className={`qp-cta${showCta ? " visible" : ""}`}
        onClick={() => {
          window.location.href = '/#availability';
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        Plan my wedding
      </button>
    </>
  );
}