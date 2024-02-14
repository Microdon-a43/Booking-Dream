import { useEffect } from 'react';

type ToastProps = {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
};

export const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const styles =
    type === 'success'
      ? 'fixed top-4 right-4 z-50 p-4 rounded-md text-white max-w-md bg-green-600'
      : 'fixed top-4 right-4 z-50 p-4 rounded-md text-white max-w-md bg-red-600';

  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold ">{message}</span>
      </div>
    </div>
  );
};
