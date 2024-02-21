import { useMutation } from '@tanstack/react-query';
import { useAppContext } from '../contexts/AppContext';
import { ManageHotelForm } from '../forms/ManageHotelForm/ManageHotelForm';
import * as apiClient from '../api-client';

export const AddHotel = () => {
  const { showToast } = useAppContext();
  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.addMyHotel,
    onSuccess: () => {
      showToast({ message: 'Hotel saved!', type: 'success' });
    },
    onError: () => {
      showToast({ message: 'Error!', type: 'error' });
    }
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return <ManageHotelForm onSave={handleSave} isLoading={isPending} />;
};
