import React from 'react';
import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

export const ImagesSection = () => {
  const {
    register,
    watch,
    formState: { errors },
    setValue
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch('imgUrls');

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imgUrl: string
  ) => {
    e.preventDefault();
    setValue(
      'imgUrls',
      existingImageUrls.filter((url) => url !== imgUrl)
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url) => (
              <div className="relative group">
                <img src={url} alt="" className="min-h-full object-cover" />
                <button
                  onClick={(e) => handleDelete(e, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register('imgFiles', {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrls?.length || 0);
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
