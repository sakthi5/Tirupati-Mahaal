"use client";

import { useState, useEffect, useCallback } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
type DayStatus = "available" | "booked" | "loading";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

function ordinal(d: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = d % 100;
  return d + (s[(v - 20) % 10] || s[v] || s[0]);
}

// Decorative ornament flanking the "Check Venue Availability" heading
function Ornament({ className, flip }: { className: string; flip?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 16"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <line x1="0" y1="8" x2="104" y2="8" stroke="#C4966A" strokeWidth="1.4" />
      <rect
        x="20"
        y="4"
        width="8"
        height="8"
        fill="#C4966A"
        transform="rotate(45 24 8)"
      />
      <rect
        x="58"
        y="4"
        width="8"
        height="8"
        fill="#C4966A"
        transform="rotate(45 62 8)"
      />
      <rect
        x="94"
        y="2"
        width="12"
        height="12"
        fill="#C4966A"
        transform="rotate(45 100 8)"
      />
      <circle cx="113" cy="8" r="2.2" fill="#C4966A" />
    </svg>
  );
}

const STATUS_META: Record<
  string,
  { label: string; emoji: string; color: string; msg: string; sub: string }
> = {
  booked: {
    label: "Fully Booked",
    emoji: "💍",
    color: "#E53E3E",
    msg: "Uh oh… this date is",
    sub: "Try another day to find your ideal spot.",
  },
  available: {
    label: "Available",
    emoji: "🕊️",
    color: "#48BB78",
    msg: "This date is fully",
    sub: " Contact to place your bookings",
  },
  loading: {
    label: "Checking...",
    emoji: "⏳",
    color: "#C4966A",
    msg: "Fetching date status...",
    sub: "Please wait a moment.",
  },
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function VenueAvailability() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [bookedDatesSet, setBookedDatesSet] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch availability from /api/bookings/by-month
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const monthNum = viewMonth + 1;
    fetch(`/api/bookings/by-month?year=${viewYear}&month=${monthNum}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.success && Array.isArray(data.bookedDates)) {
          setBookedDatesSet(new Set(data.bookedDates));
        } else {
          setError(data.error || "Failed to load availability.");
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Error loading availability:", err);
        setError("Failed to connect to server.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [viewYear, viewMonth]);

  // True when the currently viewed month/year is strictly before today's month
  const isPastMonth =
    viewYear < today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth < today.getMonth());

  const handleSelectDate = (day: number) => {
    if (isPastMonth) return;
    setSelectedDay((prev) => (prev === day ? null : day));
  };

  // Days in month, and what weekday the 1st falls on (0=Mon…6=Sun)
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDow = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7; // Mon-based

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else setViewMonth((m) => m - 1);
    setSelectedDay(null);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else setViewMonth((m) => m + 1);
    setSelectedDay(null);
  };

  const getDayStatus = useCallback(
    (day: number): DayStatus => {
      if (loading) return "loading";
      const mStr = String(viewMonth + 1).padStart(2, "0");
      const dStr = String(day).padStart(2, "0");
      const dateStr = `${viewYear}-${mStr}-${dStr}`;
      return bookedDatesSet.has(dateStr) ? "booked" : "available";
    },
    [loading, viewYear, viewMonth, bookedDatesSet],
  );

  const activeDay = selectedDay;
  const selStatus = activeDay !== null ? getDayStatus(activeDay) : null;
  const selMeta = selStatus
    ? STATUS_META[selStatus] || STATUS_META.available
    : null;
  const selDateStr =
    activeDay !== null
      ? `${ordinal(activeDay)} ${MONTHS[viewMonth]}, ${viewYear}`
      : null;

  // Calendar grid: leading blanks + days
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to complete final row
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <>
      <style>{`
        .availability-title{
        font-size: 45px
        }
        @media (max-width:1100px){
        .availability-title{
        font-size: 35px
        }
        }
        @media (max-width:900px){
        .availability-title{
        font-size: 30px
        }
        @media (max-width:600px){
        .availability-title{
        font-size: 25px
        }
        // @media (max-width:450px){
        // .availability-title{
        // font-size: 20px
        // }
        }
      `}</style>
      <section
        className="relative overflow-hidden py-8 px-4 sm:px-8 pb-16 bg-gradient-to-b from-[#FDEFDE] to-white scroll-mt-[66px]"
        id="availability"
      >
        {/* Background blobs */}
        <div className="absolute top-[-100px] left-[-80px] w-[400px] h-[400px] rounded-full bg-[#C4966A]/8 blur-[80px] pointer-events-none z-0" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[320px] h-[320px] rounded-full bg-[#D97B8A]/7 blur-[80px] pointer-events-none z-0" />

        <div className="relative z-10 max-w-[1000px] mx-auto">
          {/* Heading */}
          <div className="flex items-center justify-center gap-3.5 flex-wrap mb-1.5">
            <Ornament className="w-9 sm:w-15 h-3.5 flex-shrink-0" />
            <h2
              className="availability-title font-bold text-[#2A1A0E] mb-2.5 leading-[1.15] text-center"
              style={{
                fontFamily:
                  "'Playfair Display', Georgia, 'Times New Roman', serif",
              }}
            >
              Check Venue <span className="text-[#9c1c54]">Availability</span>
            </h2>
            <Ornament className="w-9 sm:w-15 h-3.5 flex-shrink-0" flip />
          </div>
          <p className="text-[16px] font-light text-gray-500 mb-12 tracking-[0.02em] text-center">
            Select a date to see how soon you need to book your dream
            celebration.
          </p>

          {error && (
            <div className="font-sans text-[0.75rem] text-[#E53E3E] bg-[#E53E3E]/6 border border-[#E53E3E]/18 rounded-lg p-2.5 px-3.5 mb-4 flex items-center gap-1.5">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* ── Calendar Card ── */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-[#C4966A]/15">
              {/* Nav */}
              <div className="flex items-center justify-between mb-6">
                <button
                  className="w-8 h-8 rounded-full border border-[#C4966A]/30 bg-transparent flex items-center justify-center text-[#6B4F3A] hover:bg-[#C4966A]/10 hover:border-[#C4966A] focus:outline-none transition-colors"
                  onClick={prevMonth}
                  aria-label="Previous month"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 3L5 8l5 5" />
                  </svg>
                </button>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-[1.05rem] font-semibold text-[#2A1A0E] tracking-[0.02em]">
                    {MONTHS[viewMonth]}
                  </span>
                  <span className="font-sans text-[0.82rem] font-normal text-[#8C6A50]">
                    {viewYear}
                  </span>
                  {loading && (
                    <span className="w-3.5 h-3.5 border-2 border-[#C4966A]/25 border-t-[#C4966A] rounded-full animate-spin flex-shrink-0" />
                  )}
                </div>
                <button
                  className="w-8 h-8 rounded-full border border-[#C4966A]/30 bg-transparent flex items-center justify-center text-[#6B4F3A] hover:bg-[#C4966A]/10 hover:border-[#C4966A] focus:outline-none transition-colors"
                  onClick={nextMonth}
                  aria-label="Next month"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 3l5 5-5 5" />
                  </svg>
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2 gap-0.5">
                {DAYS.map((d, i) => (
                  <div
                    key={i}
                    className="font-sans text-[0.68rem] font-medium tracking-[0.08em] uppercase text-[#B8916A] text-center py-1"
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Dates Grid */}
              <div className="grid grid-cols-7 gap-1">
                {cells.map((day, i) => {
                  if (!day) {
                    return (
                      <div
                        key={i}
                        className="aspect-square pointer-events-none"
                      />
                    );
                  }
                  const status = getDayStatus(day);
                  const isSelected = selectedDay === day;
                  const isBooked = status === "booked";

                  // Dates in past months are shown but disabled
                  const isPastDay = isPastMonth;

                  let statusClasses = "";
                  if (status === "loading") {
                    statusClasses =
                      "bg-gradient-to-r from-[#f5ede2] via-[#fdf5ec] to-[#f5ede2] bg-[length:200%_100%] animate-pulse text-transparent cursor-default pointer-events-none";
                  } else if (isPastDay) {
                    // Past month: visible but muted and not clickable
                    statusClasses =
                      "text-[#C4B8AD] bg-transparent cursor-not-allowed opacity-50";
                  } else if (isBooked) {
                    statusClasses =
                      "bg-[#E53E3E]/5 text-[#C4A090] line-through decoration-[#E53E3E]/45 cursor-not-allowed pointer-events-none";
                  } else {
                    statusClasses =
                      "bg-[#48BB78]/6 text-[#6B4F3A] cursor-pointer hover:bg-[#C4966A]/15 hover:border-[#C4966A] hover:text-[#2A1A0E] hover:scale-105 focus:bg-[#C4966A]/15 focus:border-[#C4966A] focus:text-[#2A1A0E] focus:scale-105 focus-visible:bg-[#C4966A]/15 focus-visible:border-[#C4966A] focus-visible:text-[#2A1A0E] focus-visible:scale-105";
                  }

                  if (isSelected && !isPastDay) {
                    statusClasses =
                      "bg-[#C4966A]/15 text-[#2A1A0E] !border-[#C4966A] font-semibold scale-105 z-10 shadow-sm";
                  }

                  return (
                    <button
                      key={i}
                      className={`aspect-square rounded-lg flex items-center justify-center font-sans text-[0.82rem] transition-all relative border border-transparent outline-none ${statusClasses}`}
                      onClick={() =>
                        !isBooked && !isPastDay && handleSelectDate(day)
                      }
                      disabled={isBooked || isPastDay}
                      aria-label={`${day} ${MONTHS[viewMonth]}${isPastDay ? " — past date" : " — " + (STATUS_META[status]?.label || status)}`}
                    >
                      {day}
                      {!isPastDay && status === "available" && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#48BB78]" />
                      )}
                      {!isPastDay && status === "booked" && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#E53E3E]/70" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-x-5 gap-y-2.5 mt-5 pt-5 border-t border-[#C4966A]/15">
                {[
                  { color: "#48BB78", label: "Available" },
                  { color: "rgba(229,62,62,0.3)", label: "Fully Booked" },
                ].map((l) => (
                  <div
                    key={l.label}
                    className="flex items-center gap-1.5 font-sans text-[0.68rem] font-normal text-[#8C6A50] tracking-[0.03em]"
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: l.color }}
                    />
                    {l.label}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Info Panel ── */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#C4966A]/15 overflow-hidden min-h-[360px] md:min-h-[280px] flex flex-col">
              {activeDay === null || !selMeta ? (
                <div className="flex-1 flex flex-col items-center justify-center p-10 text-center gap-4">
                  <div className="text-4xl opacity-40">📅</div>
                  <p className="font-serif text-[1rem] font-light text-[#B8916A] leading-relaxed">
                    Tap any date on the calendar to check
                    <br />
                    availability for your special day.
                  </p>
                </div>
              ) : (
                <>
                  <div className="p-6 border-b border-[#C4966A]/10">
                    <p className="font-serif text-[1.2rem] font-semibold text-[#2A1A0E] m-0">
                      {selDateStr}
                    </p>
                    <p className="font-serif text-[0.82rem] font-light text-[#8C6A50] tracking-[0.08em] uppercase mt-0.5">
                      {new Date(
                        viewYear,
                        viewMonth,
                        activeDay,
                      ).toLocaleDateString("en-IN", { weekday: "long" })}
                    </p>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center p-7 text-center gap-4">
                    <div className="text-5xl">{selMeta.emoji}</div>
                    <p className="font-serif text-[1.05rem] font-normal text-[#2A1A0E] m-0 leading-snug">
                      {selMeta.msg}
                    </p>
                    <span
                      className="inline-block px-4 py-1 rounded font-sans text-[0.78rem] font-semibold tracking-[0.12em] uppercase border"
                      style={{
                        color: selMeta.color,
                        borderColor: selMeta.color,
                        background: `${selMeta.color}12`,
                      }}
                    >
                      {selMeta.label}
                    </span>
                    <p className="font-serif text-[0.92rem] font-light text-[#8C6A50] m-0 leading-relaxed">
                      {selMeta.sub}
                    </p>
                    {/* {selStatus !== "booked" && (
                    <a
                      href="/booking"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C4966A] text-white font-sans text-[0.78rem] font-medium tracking-[0.06em] rounded-full hover:bg-[#B8845A] hover:-translate-y-0.5 transition-all mt-1"
                    >
                      Reserve this date →
                    </a>
                  )} */}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
