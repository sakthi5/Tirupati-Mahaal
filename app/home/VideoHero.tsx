'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './VideoHero.module.css';

/**
 * One-time reveal: a small petal/shield-shaped "peephole" grows to fill
 * the whole section. Both the video AND the text live inside the same
 * clipped wrapper, so the text is only visible through whatever portion
 * of the shape is currently showing — it reveals progressively as the
 * shape expands, exactly like the video does.
 *
 * This is NOT scroll-scrubbed — it fires once, the moment the section
 * scrolls into view, then plays itself out on a timer.
 */
export default function VideoHero() {
  const sectionRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsExpanded(true);
          observer.unobserve(section); // only play the reveal once
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Hidden SVG that defines the shield/petal clip path used below.
          Edit the "d" attribute if you want a different silhouette. */}
      <svg className={styles.clipDefs} aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="venuePetalClip" clipPathUnits="objectBoundingBox">
            <path
              className={`${styles.petalPath} ${isExpanded ? styles.petalExpanded : ''}`}
              d="
              M .5 -0.11
C .55 -0.03 .68 0.03 .82 0.11
C .94 0.19 1 0.34 1 0.47
L 1 0.71
C 1 0.83 .90 0.89 .72 0.93
C .60 0.95 .54 0.99 .5 1.11
C .46 0.99 .40 0.95 .28 0.93
C .10 0.89 0 0.83 0 0.71
L 0 0.47
C 0 0.34 .06 0.19 .18 0.11
C .32 0.03 .45 -0.03 .5 -0.11
Z
                "
            />
          </clipPath>
        </defs>
      </svg>

      {/* Everything that should be revealed BY the shape — video and
          text both live inside this one clipped wrapper. */}
      <div className={styles.maskedArea}>
        <video
          className={`${styles.video} ${isExpanded ? styles.videoExpanded : ''}`}
          src="/videos/book-your-venue.mp4"
          poster="/images/banner-video-poster.webp"
          autoPlay
          muted
          loop
          playsInline
        />

        <div
          className={`${styles.content} ${isExpanded ? styles.contentLight : styles.contentDark
            }`}
        >
          <h2 className={styles.heading}>Book your venue</h2>
          <p className={styles.subtitle}>
            Pick your date. Set your budget.
            <br />
            Choose your venue.
          </p>
          {/* <button type="button" className={styles.cta}>
            Check availability
            <ChevronIcon />
          </button> */}
        </div>
      </div>
    </section>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={styles.chevron}
    >
      <path
        d="M5 2.5 L11 8 L5 13.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}