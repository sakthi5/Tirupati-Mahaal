import { NextResponse } from 'next/server';
import { dbQuery } from '@/lib/db';
import { Booking } from '@/utils/types';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const res = await dbQuery('SELECT * FROM bookings WHERE id = $1', [id]);
    const booking = res.rows[0];

    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: booking }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to read booking data.' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const currentRes = await dbQuery('SELECT * FROM bookings WHERE id = $1', [id]);
    const currentBooking = currentRes.rows[0] as Booking | undefined;

    if (!currentBooking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    const updatedBooking: Booking = {
      ...currentBooking,
      ...body,
      id: currentBooking.id, // Ensure ID cannot be changed
      updatedAt: new Date().toISOString(),
    };

    // Update PostgreSQL
    await dbQuery(
      `UPDATE bookings 
       SET "userName" = $1, "email" = $2, "phone" = $3, "address" = $4, 
           "bookingStartDate" = $5, "bookingEndDate" = $6,
           "userBookedDate" = $7, "status" = $8, 
           "createdAt" = $9, "updatedAt" = $10
       WHERE id = $11`,
      [
        updatedBooking.userName,
        updatedBooking.email,
        updatedBooking.phone,
        updatedBooking.address,
        updatedBooking.bookingStartDate,
        updatedBooking.bookingEndDate,
        updatedBooking.userBookedDate,
        updatedBooking.status,
        updatedBooking.createdAt,
        updatedBooking.updatedAt,
        id,
      ]
    );

    return NextResponse.json({ success: true, data: updatedBooking }, { status: 200 });
  } catch (error) {
    console.error('Failed to update booking:', error);
    return NextResponse.json({ success: false, error: 'Failed to update booking.' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const currentRes = await dbQuery('SELECT * FROM bookings WHERE id = $1', [id]);
    if (currentRes.rowCount === 0) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    // Delete from PostgreSQL
    await dbQuery('DELETE FROM bookings WHERE id = $1', [id]);

    return NextResponse.json({ success: true, message: 'Booking deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete booking:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete booking.' }, { status: 500 });
  }
}
