import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { LogOutBtn } from './LogOutBtn';

export const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <header className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Booking-Man</Link>
        </span>
        <span className="flex space-x-2 ">
          {isLoggedIn ? (
            <div className="flex justify-center items-center gap-3">
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <LogOutBtn />
            </div>
          ) : (
            <Link
              to="/login"
              className="flex bg-white rounded-sm items-center hover:text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </header>
  );
};
