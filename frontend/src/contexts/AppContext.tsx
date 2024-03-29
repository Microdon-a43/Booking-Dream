import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { Toast } from '../components';
import * as apiClient from '../api-client';

type ToastMessage = {
  message: string;
  type: 'success' | 'error';
};

type AppContext = {
  showToast: (toastMsg: ToastMessage) => void;
  isLoggedIn: boolean;
};

export const AppContext = React.createContext<AppContext | undefined>(
  undefined
);

export const AppContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const { isError } = useQuery({
    queryKey: ['validateToken'],
    queryFn: apiClient.validateToken,
    retry: false
  });
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMsg) => {
          setToast(toastMsg);
        },
        isLoggedIn: !isError
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => {
            setToast(undefined);
          }}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
