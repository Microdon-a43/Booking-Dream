import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchMyHotelById, updateMyHotelById } from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { ManageHotelForm } from '../forms/ManageHotelForm/ManageHotelForm';

export const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  const { data: hotel } = useQuery({
    queryKey: ['fetchingMyHotelById'],
    queryFn: () => fetchMyHotelById(hotelId || ''),
    enabled: !!hotelId
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateMyHotelById,

    onSuccess: () => {
      showToast({ message: 'Hotel Saved!', type: 'success' });
    },
    onError: () => {
      showToast({ message: 'Error Saving Hotel', type: 'error' });
    }
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isPending} />
  );
};
