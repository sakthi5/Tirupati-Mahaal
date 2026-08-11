import { NextResponse } from 'next/server';
import { dbQuery } from '@/lib/db';

/**
 * GET /api/bookings/by-month?year=YYYY&month=M
 *
 * Returns all bookings where bookingStartDate OR bookingEndDate
 * falls within the given year/month (month is 1-indexed: Jan=1, Dec=12).
 *
 * Response shape:
 * {
 *   success: true,
 *   data: Booking[],          // full booking rows
 *   bookedDates: string[]     // "YYYY-MM-DD" dates that are blocked
 * }
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const yearParam = searchParams.get('year');
    const monthParam = searchParams.get('month');

    if (!yearParam || !monthParam) {
      return NextResponse.json(
        { success: false, error: 'year and month query params are required.' },
        { status: 400 }
      );
    }

    const year = parseInt(yearParam, 10);
    const month = parseInt(monthParam, 10); // 1-indexed

    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
      return NextResponse.json(
        { success: false, error: 'Invalid year or month.' },
        { status: 400 }
      );
    }

    // Build YYYY-MM prefix for the month, e.g. "2026-07"
    const monthStr = String(month).padStart(2, '0');
    const prefix = `${year}-${monthStr}`;

    // Query bookings from PostgreSQL where start OR end date is in this month and not cancelled
    const res = await dbQuery(
      `SELECT * FROM bookings
       WHERE ("bookingStartDate" LIKE $1 OR "bookingEndDate" LIKE $2)
         AND "status" != 'cancelled'
       ORDER BY "bookingStartDate" ASC`,
      [`${prefix}%`, `${prefix}%`]
    );

    const bookings = res.rows as Array<{
      bookingStartDate: string;
      bookingEndDate: string;
      status: string;
      [key: string]: unknown;
    }>;

    const bookedDatesSet = new Set<string>();

    for (const booking of bookings) {
      if (!booking.bookingStartDate || !booking.bookingEndDate) continue;
      
      const [sY, sM, sD] = booking.bookingStartDate.split('-').map(Number);
      const [eY, eM, eD] = booking.bookingEndDate.split('-').map(Number);

      if (sY && sM && sD && eY && eM && eD) {
        const start = new Date(sY, sM - 1, sD);
        const end = new Date(eY, eM - 1, eD);
        const cur = new Date(start);
        while (cur <= end) {
          const y = cur.getFullYear();
          const m = String(cur.getMonth() + 1).padStart(2, '0');
          const d = String(cur.getDate()).padStart(2, '0');
          bookedDatesSet.add(`${y}-${m}-${d}`);
          cur.setDate(cur.getDate() + 1);
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        data: bookings,
        bookedDates: Array.from(bookedDatesSet).sort(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching bookings by month:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings.' },
      { status: 500 }
    );
  }
}
