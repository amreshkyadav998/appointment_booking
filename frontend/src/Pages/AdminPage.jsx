import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { AuthContext } from '../context/AuthContext';

export default function AdminPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/all-bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error('Session expired. Please login again.');
          logout();
          navigate('/login');
          return;
        } else if (error.response?.status === 403) {
          toast.error('Access denied. Admin privileges required.');
          navigate('/patient');
          return;
        }
        toast.error('Failed to load bookings');
      }
      setLoading(false);
    };

    if (token && user?.role === 'admin') {
      fetchBookings();
    }
  }, [token, user, logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard - All Bookings</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No bookings found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                <th className="py-3 px-6 text-left">User</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Slot Time</th>
                <th className="py-3 px-6 text-left">Booked On</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6 font-medium">{booking.user.name}</td>
                  <td className="py-3 px-6 text-sm text-gray-600">{booking.user.email}</td>
                  <td className="py-3 px-6">
                    <div className="text-sm">
                      <div className="font-medium">
                        {format(new Date(booking.slot.startAt), 'PPp')}
                      </div>
                      <div className="text-gray-500">
                        to {format(new Date(booking.slot.endAt), 'p')}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-sm">
                    {format(new Date(booking.createdAt), 'PPp')}
                  </td>
                  <td className="py-3 px-6">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Confirmed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}