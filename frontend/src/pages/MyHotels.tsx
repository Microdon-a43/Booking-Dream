import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchMyHotels } from '../api-client';
import { HotelCard } from '../components/HotelCard';

export const MyHotels = () => {
  const { data: hotelData } = useQuery({
    queryKey: ['fetchMyHotels'],
    queryFn: fetchMyHotels
  });

  if (!hotelData) return <span>No Hotels found</span>;

  return (
    <div className="space-y-5 flex flex-col">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData?.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};
