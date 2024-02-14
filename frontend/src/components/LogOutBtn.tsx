import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';

export const LogOutBtn = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation({
    mutationFn: apiClient.logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['validateToken'] });
      showToast({ message: 'Signed out', type: 'success' });
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: 'error' });
    }
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="text-blue-600 px-3 py-1 font-bold bg-white hover:bg-gray-100 cursor-pointer flex justify-center items-center"
    >
      Sign Out
    </button>
  );
};
