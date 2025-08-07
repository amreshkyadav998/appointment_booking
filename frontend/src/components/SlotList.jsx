import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export default function SlotList({ slots, token }) {
  const [loadingId, setLoadingId] = useState(null);

  const handleBook = async (slotId) => {
    setLoadingId(slotId);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings`,
        { slotId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Slot booked successfully');
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Booking failed');
    }
    setLoadingId(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {slots.map((slot) => (
        <div key={slot.id} className="p-4 bg-white rounded-lg shadow-md">
          <p className="text-sm text-gray-600">
            {format(new Date(slot.startAt), 'PPp')} - {format(new Date(slot.endAt), 'p')}
          </p>
          <button
            onClick={() => handleBook(slot.id)}
            disabled={loadingId === slot.id || slot.booking}
            className="mt-2 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
          >
            {loadingId === slot.id ? 'Booking...' : slot.booking ? 'Booked' : 'Book'}
          </button>
        </div>
      ))}
    </div>
  );
}