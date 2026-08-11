'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './HowItWorks.module.css';

/**
 * Edit this array to change the copy for each step.
 * `description` only shows up once a step becomes active.
 */
const STEPS = [
  {
    id: 1,
    title: 'Tell Us About Your Wedding',
    description:
      'Share your preferred wedding date, event type, and estimated guest count. This helps us understand your requirements and recommend the best options.',
  },
  {
    id: 2,
    title: 'Check Venue Availability',
    description:
      'Select your preferred wedding date to instantly check availability. If your chosen date is unavailable, we will suggest the nearest available dates for your convenience.',
  },
  {
    id: 3,
    title: 'Reach Out to Us',
    description:
      'Once you have checked your preferred date, connect with us via WhatsApp or phone call to discuss your requirements. Our team will answer your questions, help you plan your event, and guide you through the booking process',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const section = sectionRef.current  as any;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrollableDistance = section.offsetHeight - viewportHeight;

    // Section is shorter than viewport (shouldn't happen, but guard anyway)
    if (scrollableDistance <= 0) {
      setActiveIndex(0);
      return;
    }

    // 0 = section just reached the top, 1 = section about to release scroll
    let progress = -rect.top / scrollableDistance;
    progress = Math.min(Math.max(progress, 0), 1);

    const index = Math.min(
      STEPS.length - 1,
      Math.floor(progress * STEPS.length)
    );

    setActiveIndex(index);
  }, []);

  useEffect(() => {
    let frameId: any = null;

    const onScroll = () => {
      if (frameId) return;
      frameId = requestAnimationFrame(() => {
        updateActiveIndex();
        frameId = null;
      });
    };

    updateActiveIndex();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [updateActiveIndex]);

  return (
    <section
      ref={sectionRef}
      className={styles.scrollSection}
      // Total scroll room = number of steps * one viewport height.
      // Increase the multiplier (e.g. 130) to make the scroll feel slower.
      style={{ height: `${STEPS.length * 100}vh` }}
    >
      <div className={styles.sticky}>
        <div className={styles.inner}>
          <Heading />

          <div className={styles.content}>
            <div className={styles.left}>
              {STEPS.map((step, index) => (
                <StepItem
                  key={step.id}
                  step={step}
                  isActive={index === activeIndex}
                  isCompleted={index < activeIndex}
                  isLast={index === STEPS.length - 1}
                />
              ))}
            </div>

            <div className={styles.right}>
              <div className={styles.frameWrapper}>
                <img
                  src="/images/Img frame.png"
                  alt=""
                  aria-hidden="true"
                  className={styles.frameImage}
                />
                <div className={styles.frame}>
                  {STEPS.map((step, index) => {
                    let positionClass = styles.visualBelow;
                    if (index === activeIndex) positionClass = styles.visualActive;
                    else if (index < activeIndex) positionClass = styles.visualAbove;

                    return (
                      <div
                        key={step.id}
                        className={`${styles.visual} ${positionClass}`}
                        aria-hidden={index !== activeIndex}
                      >
                        <StepVisual index={index} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Heading() {
  return (
    <div className={styles.heading}>
      <div className={styles.titleRow}>
        <Ornament className={styles.ornament} />
        <h2 className={styles.title}>Start <span className={styles.highlight}>Planning</span> Your Wedding Today</h2>
        <Ornament className={styles.ornament} flip />
      </div>
      <p className={styles.subtitle}>Finding the perfect wedding venue shouldn't be complicated. <br />Check your preferred date, explore availability, and connect with our team to start planning your special day.</p>
    </div>
  );
}

function StepItem({ step, isActive, isCompleted, isLast }:{ step:any, isActive:boolean, isCompleted:boolean, isLast:boolean }) {
  const circleClass = [
    styles.stepCircle,
    isActive ? styles.stepCircleActive : '',
    isCompleted ? styles.stepCircleCompleted : '',
    !isActive && !isCompleted ? styles.stepCircleUpcoming : '',
  ].join(' ');

  return (
    <div className={styles.stepItem}>
      <div className={styles.stepIndicator}>
        <span className={circleClass}>{step.id}</span>
        {!isLast && <span className={styles.stepLine} />}
      </div>

      <div className={styles.stepText}>
        <h3 className={`${styles.stepTitle} ${isActive ? styles.stepTitleActive : ''}`}>
          {step.title}
        </h3>

        <div
          className={`${styles.stepDescWrapper} ${
            isActive ? styles.stepDescWrapperOpen : ''
          }`}
        >
          <p className={styles.stepDesc}>{step.description}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Decorative SVGs ---------- */
/* Swap any of these for real brand assets / next/image whenever you have them. */

function Ornament({ className, flip }:{ className:string, flip?:boolean }) {
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

function StepVisual({ index }: { index: number }) {
  if (index === 0) return <RequirementsVisual />;
  if (index === 1) return <ProposalVisual />;
  return <BookingVisual />;
}

function RequirementsVisual() {
  return (
    <svg viewBox="0 0 220 220" width="100%" height="100%" role="img" aria-label="Sharing requirements">
      <rect x="42" y="24" width="136" height="172" rx="14" fill="#ffffff" stroke="#e7d49a" strokeWidth="2" />
      <rect x="82" y="12" width="56" height="20" rx="6" fill="#9c1c54" />
      <g stroke="#9c1c54" strokeWidth="3" strokeLinecap="round">
        <line x1="64" y1="78" x2="156" y2="78" />
        <line x1="64" y1="108" x2="142" y2="108" />
        <line x1="64" y1="138" x2="150" y2="138" />
      </g>
      <g fill="#ec4899">
        <circle cx="58" cy="78" r="4" />
        <circle cx="58" cy="108" r="4" />
        <circle cx="58" cy="138" r="4" />
      </g>
      <path
        d="M150 158 L168 176 L184 150"
        fill="none"
        stroke="#22a35d"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProposalVisual() {
  return (
    <svg viewBox="0 0 240 220" width="100%" height="100%" role="img" aria-label="Personalised proposal">
      <rect x="44" y="34" width="152" height="152" rx="16" fill="#ffffff" stroke="#e7d49a" strokeWidth="2" />
      <path d="M70 56 q10 -16 20 0" stroke="#0f6657" strokeWidth="2" fill="none" />
      <path d="M150 56 q10 -16 20 0" stroke="#0f6657" strokeWidth="2" fill="none" />
      <text x="120" y="108" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="20" fill="#0f6657">
        Your
      </text>
      <text x="120" y="132" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="20" fill="#9c1c54">
        &amp;
      </text>
      <text x="120" y="156" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="20" fill="#0f6657">
        Partner
      </text>
      <circle cx="58" cy="112" r="18" fill="#f97316" />
      <circle cx="182" cy="112" r="18" fill="#f97316" />
    </svg>
  );
}

function BookingVisual() {
  return (
    <svg viewBox="0 0 240 220" width="100%" height="100%" role="img" aria-label="Confirm and book">
      <rect x="50" y="62" width="140" height="128" rx="16" fill="#ffffff" stroke="#e7d49a" strokeWidth="2" />
      <path d="M70 92 L70 62 L170 62 L170 92" stroke="#b08968" strokeWidth="6" fill="none" />
      <rect x="95" y="120" width="20" height="42" rx="4" fill="#9c1c54" />
      <rect x="125" y="120" width="20" height="42" rx="4" fill="#9c1c54" />
      <rect x="50" y="178" width="140" height="12" fill="#ec4899" />
      <circle cx="172" cy="64" r="28" fill="#ec4899" />
      <path
        d="M159 64 l8 8 l17 -19"
        stroke="#ffffff"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
