import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/db";
import { Booking } from "@/utils/types";

export async function GET() {
  try {
    const res = await dbQuery(
      'SELECT * FROM bookings ORDER BY "createdAt" DESC',
    );
    return NextResponse.json(
      { success: true, data: res.rows },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching bookings from PostgreSQL DB:", error);
    return NextResponse.json(
      { success: false, error: "Failed to read bookings data." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newBooking: Booking = {
      id: crypto.randomUUID(),
      userName: body.userName || "",
      email: body.email || "",
      phone: body.phone || "",
      address: body.address || "",
      bookingStartDate: body.bookingStartDate || "",
      bookingEndDate: body.bookingEndDate || "",
      userBookedDate: new Date().toISOString(),
      status: body.status || "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to PostgreSQL
    await dbQuery(
      `INSERT INTO bookings
        ("id", "userName", "email", "phone", "address", "bookingStartDate", "bookingEndDate", "userBookedDate", "status", "createdAt", "updatedAt")
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        newBooking.id,
        newBooking.userName,
        newBooking.email,
        newBooking.phone,
        newBooking.address,
        newBooking.bookingStartDate,
        newBooking.bookingEndDate,
        newBooking.userBookedDate,
        newBooking.status,
        newBooking.createdAt,
        newBooking.updatedAt,
      ],
    );

    return NextResponse.json(
      { success: true, data: newBooking },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create booking." },
      { status: 500 },
    );
  }
}
