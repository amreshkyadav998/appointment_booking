import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/all-bookings`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setBookings(res.data);
      } catch (error) {
        toast.error('Failed to load bookings');
      }
      setLoading(false);
    };
    fetchBookings();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard - All Bookings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                <th className="py-3 px-6 text-left">User</th>
                <th className="py-3 px-6 text-left">Slot Time</th>
                <th className="py-3 px-6 text-left">Booked On</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b">
                  <td className="py-3 px-6">{booking.user.name}</td>
                  <td className="py-3 px-6">
                    {format(new Date(booking.slot.startAt), 'PPp')} - {format(new Date(booking.slot.endAt), 'p')}
                  </td>
                  <td className="py-3 px-6">{format(new Date(booking.createdAt), 'PPp')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}