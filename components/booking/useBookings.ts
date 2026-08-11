import { useState, useCallback } from "react";

export interface Booking {
  id: string;
  userName: string;
  email: string;
  phone: string;
  address: string;
  bookingStartDate: string;
  bookingEndDate: string;
  userBookedDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [createBookingLoading, setCreateBookingLoading] = useState(false);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createBooking = async (bookingData: Partial<Booking>) => {
    setCreateBookingLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) => [data.data, ...prev]);
        setCreateBookingLoading(false);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to create booking", error);
      return false;
    }
  };

  const updateBooking = async (id: string, bookingData: Partial<Booking>) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === id ? { ...booking, ...bookingData } : booking,
          ),
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to update booking", error);
      return false;
    }
  };

  const deleteBooking = async (id: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        await fetchBookings();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to delete booking", error);
      return false;
    }
  };

  return {
    bookings,
    loading,
    fetchBookings,
    createBookingLoading,
    createBooking,
    updateBooking,
    deleteBooking,
  };
}
