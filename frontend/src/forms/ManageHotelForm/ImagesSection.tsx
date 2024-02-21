import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

export const ImagesSection = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register('imgFiles', {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;
              if (totalLength === 0) {
                return 'At least one image should be added';
              } else if (totalLength > 6) {
                return 'Total number of images can"t be more than 6';
              } else {
                return true;
              }
            }
          })}
        />
      </div>
      {errors.imgFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imgFiles.message}
        </span>
      )}
    </div>
  );
};
