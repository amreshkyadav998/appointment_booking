import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import SlotList from './SlotList';
import MyBookings from './MyBookings';

export default function PatientDashboard() {
  const { user, token } = useContext(AuthContext);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/slots`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSlots(res.data);
      } catch (error) {
        toast.error('Failed to load slots');
      }
      setLoading(false);
    };
    fetchSlots();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-6">Patient Dashboard</h2>
      <h3 className="text-xl font-semibold mb-4">Available Slots</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <SlotList slots={slots} token={token} />
      )}
      <h3 className="text-xl font-semibold mt-8 mb-4">My Bookings</h3>
      <MyBookings token={token} userId={user.id} />
    </div>
  );
}