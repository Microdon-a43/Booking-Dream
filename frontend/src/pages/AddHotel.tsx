import { useMutation } from '@tanstack/react-query';
import { ManageHotelForm } from '../forms/ManageHotelForm/ManageHotelForm';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

export const AddHotel = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.addMyHotel,
    onSuccess: () => {
      showToast({ message: 'Hotel saved!', type: 'success' });
      navigate('/my-hotels');
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
