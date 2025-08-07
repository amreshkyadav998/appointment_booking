import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import SlotList from '../components/SlotList';

export default function PatientPage() {
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [slotsRes, bookingsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/slots`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/bookings`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        
        setSlots(slotsRes.data);
        setBookings(bookingsRes.data);
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error('Session expired. Please login again.');
          logout();
          navigate('/login');
          return;
        }
        toast.error('Failed to load data');
      }
      setLoading(false);
    };

    if (token) {
      fetchData();
    }
  }, [token, logout, navigate]);

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
        <h2 className="text-2xl font-bold">Welcome, {user?.name}</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Available Slots</h3>
          {slots.length === 0 ? (
            <p className="text-gray-600">No available slots.</p>
          ) : (
            <SlotList slots={slots} token={token} />
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Your Bookings</h3>
          {bookings.length === 0 ? (
            <p className="text-gray-600">No bookings yet.</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="p-4 bg-white rounded-lg shadow-md">
                  <p className="font-medium">Slot Time:</p>
                  <p className="text-sm text-gray-600">
                    {new Date(booking.slot.startAt).toLocaleString()} - {new Date(booking.slot.endAt).toLocaleTimeString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Booked on: {new Date(booking.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}