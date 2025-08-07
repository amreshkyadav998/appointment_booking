import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated, isAdmin, logout } = useContext(AuthContext);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to Appointment Booking</h1>
      <p className="mb-4">
        {isAuthenticated()
          ? 'You are logged in. Use the buttons below to navigate.'
          : 'Please log in or register to continue.'}
      </p>

      <div className="space-x-4 mb-4">
        {!isAuthenticated() && (
          <>
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Login
            </Link>
            <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              Register
            </Link>
          </>
        )}

        {isAuthenticated() && (
          <>
            {isAdmin() ? (
              <Link to="/admin" className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600">
                Go to Admin Page
              </Link>
            ) : (
              <Link to="/patient" className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">
                Go to Patient Page
              </Link>
            )}
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
