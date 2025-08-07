import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export default function MyBookings({ token, userId }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (error) {
        toast.error('Failed to load bookings');
      }
      setLoading(false);
    };
    fetchBookings();
  }, [token]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="p-4 bg-white rounded-lg shadow-md">
              <p className="text-sm text-gray-600">
                Slot: {format(new Date(booking.slot.startAt), 'PPp')} - {format(new Date(booking.slot.endAt), 'p')}
              </p>
              <p className="text-sm text-gray-600">Booked on: {format(new Date(booking.createdAt), 'PPp')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}