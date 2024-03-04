import { ChangeEvent } from 'react';
import { hotelTypes } from '../config/hotel-options-config';

type HotelTypesFilterProps = {
  selectedHotelTypes: string[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const HotelTypesFilter = ({
  selectedHotelTypes,
  onChange
}: HotelTypesFilterProps) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
      {hotelTypes.map((type) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={type}
            checked={selectedHotelTypes.includes(type)}
            onChange={onChange}
          />
          <span>{type}</span>
        </label>
      ))}
    </div>
  );
};
