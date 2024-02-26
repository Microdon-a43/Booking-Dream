import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { HotelType } from '../../../../backend/src/shared/types';
import { DetailsSection } from './DetailsSection';
import { FacilitiesSection } from './FacilitiesSection';
import { GuestsSection } from './GuestsSection';
import { ImagesSection } from './ImagesSection';
import { TypeSection } from './TypeSection';

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: string;
  starRating: number;
  facilities: string[];
  imgFiles: FileList;
  imgUrls: string[];
  adultCount: number;
  childCount: number;
};

type ManageHotelFormProps = {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

export const ManageHotelForm = ({
  hotel,
  onSave,
  isLoading
}: ManageHotelFormProps) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    //@ts-ignore
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    if (hotel) {
      formData.append('hotelId', hotel._id);
    }
    formData.append('name', formDataJson.name);
    formData.append('city', formDataJson.city);
    formData.append('country', formDataJson.country);
    formData.append('description', formDataJson.description);
    formData.append('type', formDataJson.type);
    formData.append('pricePerNight', formDataJson.pricePerNight.toString());
    formData.append('starRating', formDataJson.starRating.toString());
    formData.append('adultCount', formDataJson.adultCount.toString());
    formData.append('childCount', formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if(formDataJson.imgUrls) {
      formDataJson.imgUrls.forEach((url, i) => {
        formData.append(`imgUrls[${i}]`, url)
      })
    }

    Array.from(formDataJson.imgFiles).forEach((imgFile) => {
      formData.append('imgFiles', imgFile);
    });

    onSave(formData);
  });
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};
