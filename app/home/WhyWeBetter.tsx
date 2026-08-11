import styles from './WhyWeBetter.module.css';

// ---------------------------------------------------------------------------
// CARD CONTENT — edit copy here.
// ---------------------------------------------------------------------------
const REASONS = [
  {
    icon: IconBundle,
    title: 'Complete Event Solutions',
    body: 'From elegant decorations and professional photography to delicious catering, we help you arrange every essential service for your celebration, making event planning flexible and hassle-free.',
  },
  {
    icon: IconVenueHall,
    title: 'Venues for Every Celebration',
    body: "Whether you're planning a grand wedding, a reception, an engagement, a birthday party, or a corporate event, our spacious halls provide the perfect setting for every occasion.",
  },
  {
    icon: IconComfort,
    title: 'Comfort & Convenience',
    body: 'Enjoy thoughtfully designed spaces with dedicated dining areas, refreshment zones, spacious seating, a fully equipped kitchen, and all the facilities needed to ensure a smooth and memorable event.',
  },
];

export default function WhyWeBetter() {
  return (
    <section className={styles.section} aria-label="Why are we better">
      {/* Wavy transition from the section above into the pink background */}
      <svg
        className={styles.wave}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,0 L1440,0 L1440,80 C1080,14 360,14 0,80 Z" fill="var(--wwb-wave-color, #ffffff)" />
      </svg>

      <div className={styles.inner}>
        <div className={styles.headingWrap}>
          <div className={styles.titleRow}>
            <Ornament className={styles.ornament} />
            <h2 className={styles.title}>
              Why are <span className={styles.highlight}>we better</span>?
            </h2>
            <Ornament className={styles.ornament} flip />
          </div>
          <p className={styles.subtitle}>
            Because we bring our experience, dedication, and attention to detail to make every
            celebration at Thirupati Mahal truly special.
          </p>
        </div>

        <div className={styles.cards}>
          {REASONS.map(({ icon: Icon, title, body }) => (
            <div key={title} className={styles.card}>
              <span className={styles.iconCircle} aria-hidden="true">
                <Icon className={styles.icon} />
              </span>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardBody}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Decorative ornament flanking the heading
// ---------------------------------------------------------------------------
function Ornament({ className, flip }: { className: string; flip?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 16"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true"
    >
      <line x1="0" y1="8" x2="104" y2="8" stroke="#c9a24b" strokeWidth="1.4" />
      <rect x="20" y="4" width="8" height="8" fill="#c9a24b" transform="rotate(45 24 8)" />
      <rect x="58" y="4" width="8" height="8" fill="#c9a24b" transform="rotate(45 62 8)" />
      <rect x="94" y="2" width="12" height="12" fill="#c9a24b" transform="rotate(45 100 8)" />
      <circle cx="113" cy="8" r="2.2" fill="#c9a24b" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Inline SVG icons — one per card above
// ---------------------------------------------------------------------------
interface IconProps {
  className?: string;
}

function IconBundle({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="9" width="16" height="11" rx="1.5" />
      <path d="M4 13h16" />
      <path d="M12 9v11" />
      <path d="M9 9c-1.8 0-3-1-3-2.5S7.2 4 9 4c1.6 0 3 2 3 5" />
      <path d="M15 9c1.8 0 3-1 3-2.5S16.8 4 15 4c-1.6 0-3 2-3 5" />
    </svg>
  );
}

function IconVenueHall({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 21V10l8-6 8 6v11" />
      <path d="M9 21v-6h6v6" />
      <line x1="3" y1="21" x2="21" y2="21" />
    </svg>
  );
}

function IconComfort({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
      <path d="M3 12h18v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5z" />
      <path d="M3 15v-1a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v1" />
      <line x1="5" y1="19" x2="5" y2="21" />
      <line x1="19" y1="19" x2="19" y2="21" />
    </svg>
  );
}
