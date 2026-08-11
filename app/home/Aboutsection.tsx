"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Aboutsection.module.css";

// ---------------------------------------------------------------------------
// HALL DATA — replace copy and image paths once client content arrives.
// ---------------------------------------------------------------------------
const HALLS = {
  mainHall: {
    id: "mainHall",
    label: "Main Hall (A/C)",
    eyebrow: "ABOUT MAIN WEDDING HALL",
    heading:
      "A Grand Space for Weddings & Receptions with Air Conditioning (A/C)",
    body: `Designed for large-scale celebrations, our Main Wedding Hall offers spacious interiors, comfortable seating, and dedicated facilities to make every wedding celebration seamless.`,
    primaryImage: "/images/Main-Hall.png",
    // secondaryImage: '/images/main-hall.',
    stats: [
      { value: "380", label: "Seating Capacity", color: "#9c1c54" },
      { value: "1500", label: "Floating Capacity", color: "#f31d82" },
      { value: "100+", label: "Vehicle Parking Capacity", color: "#1f2024" },
      // { value: '500+', label: 'Happy Clients', color: '#c9a24b' },
    ],
    services: [
      { icon: IconRings, label: "Weddings" },
      { icon: IconReception, label: "Receptions" },
      { icon: IconEngagementRing, label: "Engagement Ceremonies" },
      { icon: IconDiya, label: "Traditional Functions" },
      { icon: IconHeart, label: "Family Celebrations" },
    ],
  },
  miniHall: {
    id: "miniHall",
    label: "Mini Hall",
    eyebrow: "ABOUT MINI HALL",
    heading: "Perfect for Intimate Celebrations & Professional Gatherings",
    body: "Our Mini Hall is an ideal choice for smaller events that require a comfortable and elegant venue without compromising on facilities.",
    primaryImage: "/images/Mini-hall.png",
    // secondaryImage: '/images/mini-two.jpg',
    stats: [
      { value: "120", label: "Seating Capacity", color: "#9c1c54" },
      { value: "800", label: "Floating Capacity", color: "#f31d82" },
      { value: "100+", label: "Vehicle Parking Capacity", color: "#1f2024" },
      // { value: '250+', label: 'Happy Clients', color: '#c9a24b' },
    ],
    services: [
      { icon: IconEngagementRing, label: "Engagements" },
      { icon: IconCake, label: "Birthday Parties" },
      { icon: IconPacifier, label: "Baby Showers" },
      { icon: IconNameTag, label: "Naming Ceremonies" },
      { icon: IconBriefcase, label: "Corporate Meetings" },
      { icon: IconPresentation, label: "Conferences" },
      { icon: IconGroup, label: "Family Gatherings" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<keyof typeof HALLS>("mainHall");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger entry animation once section is 20% in view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const hall = HALLS[activeTab];

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${isVisible ? styles.visible : ""}`}
      aria-label="About us"
    >
      {/* ── Section heading ── */}
      <div className={styles.sectionHeadingWrap}>
        {/* <p className={styles.sectionEyebrow}>
          <span className={styles.sectionEyebrowLine} aria-hidden="true" />
          What We Offer
          <span className={styles.sectionEyebrowLine} aria-hidden="true" />
        </p> */}
        <div className={styles.headingRow}>
          <Ornament className={styles.ornament} />
          <h2 className={styles.sectionTitle}>
            Our <span className={styles.highlight}>Facilities</span> with
            Highlights
          </h2>
          <Ornament className={styles.ornament} flip />
        </div>
      </div>

      <div className={styles.inner}>
        {/* ---------- LEFT — images ---------- */}
        <div className={styles.imageCol}>
          <div className={styles.primaryWrap}>
            <Image
              src={hall.primaryImage}
              alt={`${hall.label} photo`}
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              className={styles.primaryImg}
              priority
            />
          </div>

          {/* Decorative ornamental frame — sits on top of the photo,
              a double-line border with a scroll flourish tucked into
              every corner. Purely decorative, doesn't touch the image
              markup above. */}
          <div className={styles.imageFrame} aria-hidden="true">
            <span className={`${styles.frameCorner} ${styles.frameCornerTL}`}>
              <CornerFlourish className={styles.frameCornerSvg} />
            </span>
            <span className={`${styles.frameCorner} ${styles.frameCornerTR}`}>
              <CornerFlourish className={styles.frameCornerSvg} />
            </span>
            <span className={`${styles.frameCorner} ${styles.frameCornerBL}`}>
              <CornerFlourish className={styles.frameCornerSvg} />
            </span>
            <span className={`${styles.frameCorner} ${styles.frameCornerBR}`}>
              <CornerFlourish className={styles.frameCornerSvg} />
            </span>
          </div>
        </div>

        {/* ---------- RIGHT — content ---------- */}
        <div className={styles.contentCol}>
          {/* Tabs */}
          <div
            className={styles.tabBar}
            role="tablist"
            aria-label="Hall selection"
          >
            {Object.values(HALLS).map((h) => (
              <button
                key={h.id}
                role="tab"
                aria-selected={activeTab === h.id}
                aria-controls={`panel-${h.id}`}
                className={`${styles.tab} ${activeTab === h.id ? styles.tabActive : ""}`}
                onClick={() => setActiveTab(h.id as keyof typeof HALLS)}
              >
                {h.label}
              </button>
            ))}
          </div>

          {/* Panel stack — both halls' panels are always mounted, one on
              top of the other in the same grid cell, so the container is
              always sized to whichever panel is tallest. This keeps the
              section's height fixed when switching tabs instead of
              jumping around to match whichever hall has more content. */}
          <div className={styles.panelStack}>
            {Object.values(HALLS).map((h) => (
              <div
                key={h.id}
                id={`panel-${h.id}`}
                role="tabpanel"
                aria-label={h.label}
                aria-hidden={activeTab !== h.id}
                className={`${styles.panel} ${activeTab === h.id ? styles.panelActive : styles.panelInactive}`}
              >
                <p className={styles.eyebrow}>
                  <span className={styles.eyebrowLine} aria-hidden="true" />
                  {h.eyebrow}
                </p>

                <h2 className={styles.heading}>{h.heading}</h2>
                <p className={styles.body}>{h.body}</p>

                {/* Stats grid — 3 active cols (4th stat kept commented above) */}
                <div className={styles.statsGrid}>
                  {h.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className={styles.statCard}
                      style={
                        { "--card-color": stat.color } as React.CSSProperties
                      }
                    >
                      <span className={styles.statValue}>{stat.value}</span>
                      <span className={styles.statLabel}>{stat.label}</span>
                    </div>
                  ))}
                </div>

                <h4 className={styles.servicesHeading}>Our Services</h4>

                {/* Services row — each hall has its own list. Two-word
                    labels are forced onto two lines (first word / second
                    word) so every item keeps the same footprint and the
                    icons all line up in a row, regardless of label length. */}
                <div className={styles.services} role="list">
                  {h.services.map(({ icon: Icon, label }) => {
                    const words = label.split(" ");
                    return (
                      <div
                        key={label}
                        className={styles.serviceItem}
                        role="listitem"
                      >
                        <span
                          className={styles.serviceCircle}
                          aria-hidden="true"
                        >
                          <Icon className={styles.serviceIcon} />
                        </span>
                        <span className={styles.serviceLabel}>
                          {words.length > 1 ? (
                            <>
                              {words[0]}
                              <br />
                              {words.slice(1).join(" ")}
                            </>
                          ) : (
                            label
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Decorative corner flourish for the hall photo frame — drawn once
// anchored to the bottom-left corner of its own box, then mirrored with
// CSS transforms (scaleX/scaleY) onto the other three corners so the
// same artwork wraps every corner of the frame.
// ---------------------------------------------------------------------------
function CornerFlourish({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 60 C4 40 6 26 20 20 C30 16 38 22 34 30 C31 36 22 36 21 29 C20.3 24.5 25 22 28 25"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M4 60 C16 46 28 40 44 37 C52 35.5 58 30 60 22"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="60" cy="20" r="2.6" fill="currentColor" />
      <circle cx="8" cy="54" r="2" fill="currentColor" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Decorative ornament flanking a heading
// ---------------------------------------------------------------------------
function Ornament({ className, flip }: { className: string; flip?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 16"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <line x1="0" y1="8" x2="104" y2="8" stroke="#c9a24b" strokeWidth="1.4" />
      <rect
        x="20"
        y="4"
        width="8"
        height="8"
        fill="#c9a24b"
        transform="rotate(45 24 8)"
      />
      <rect
        x="58"
        y="4"
        width="8"
        height="8"
        fill="#c9a24b"
        transform="rotate(45 62 8)"
      />
      <rect
        x="94"
        y="2"
        width="12"
        height="12"
        fill="#c9a24b"
        transform="rotate(45 100 8)"
      />
      <circle cx="113" cy="8" r="2.2" fill="#c9a24b" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Inline SVG icons — one per service label above
// ---------------------------------------------------------------------------
interface IconProps {
  className?: string;
}

function IconRings({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="8.5" cy="15" r="5" />
      <circle cx="15.5" cy="15" r="5" />
    </svg>
  );
}
function IconReception({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 18h16" />
      <path d="M5.5 18a6.5 6.5 0 0 1 13 0" />
      <circle cx="12" cy="5.5" r="1.4" />
      <line x1="12" y1="6.9" x2="12" y2="9.5" />
    </svg>
  );
}
function IconEngagementRing({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="16" r="5" />
      <path d="M9 6l3-3.2L15 6l-3 5-3-5z" />
    </svg>
  );
}
function IconDiya({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <ellipse cx="12" cy="16" rx="9" ry="3" />
      <path d="M3 16c0 2.8 4 5 9 5s9-2.2 9-5" />
      <path d="M12 13.5c-1.2-1.6-.6-3.2.3-4.3-1 .3-1.9-.4-1.7-1.7.4 1.1-1 1.9-1 3.4 0 1.4 1 2.3 2.4 2.6z" />
    </svg>
  );
}
function IconHeart({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20.5s-7.2-4.4-9.7-8.7C.8 8.4 3 5 6.6 5c2 0 3.5 1.4 5.4 3.2C13.9 6.4 15.4 5 17.4 5 21 5 23.2 8.4 21.7 11.8 19.2 16.1 12 20.5 12 20.5z" />
    </svg>
  );
}
function IconCake({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="12" width="18" height="8" rx="2" />
      <path d="M3 15.5c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0" />
      <path d="M3 12v-1a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1" />
      <line x1="8" y1="9" x2="8" y2="6" />
      <line x1="12" y1="9" x2="12" y2="5" />
      <line x1="16" y1="9" x2="16" y2="6" />
      <circle cx="12" cy="3.2" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconPacifier({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="9" r="5" />
      <circle cx="12" cy="9" r="1.5" fill="currentColor" stroke="none" />
      <path d="M8.5 12.5L6.3 14.7a1.8 1.8 0 1 0 2.5 2.5" />
      <path d="M15.5 12.5l2.2 2.2a1.8 1.8 0 1 1-2.5 2.5" />
    </svg>
  );
}
function IconNameTag({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 6h13l4 6-4 6h-13z" />
      <circle cx="8" cy="12" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconBriefcase({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  );
}
function IconPresentation({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M7 10l3-3 2 2 4-4" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="16" x2="12" y2="20" />
    </svg>
  );
}
function IconGroup({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="7" r="3" />
      <circle cx="4.5" cy="9.5" r="2.3" />
      <circle cx="19.5" cy="9.5" r="2.3" />
      <path d="M7 21v-1.5c0-2.8 2.2-5 5-5s5 2.2 5 5V21" />
      <path d="M4.5 19.5V18c0-1.7 1-3.1 2.5-3.7" />
      <path d="M19.5 19.5V18c0-1.7-1-3.1-2.5-3.7" />
    </svg>
  );
}
