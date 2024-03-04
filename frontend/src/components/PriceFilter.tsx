type PriceFilterProps = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

export const PriceFilter = ({ selectedPrice, onChange }: PriceFilterProps) => {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2">Max Price</h4>
      <select
        value={selectedPrice}
        onChange={(e) =>
          onChange(e.target.value ? parseInt(e.target.value) : undefined)
        }
      >
        <option value="">Select Max Price</option>
        {[10, 50, 100, 200, 500].map((price) => (
          <option value={price}>{price}</option>
        ))}
      </select>
    </div>
  );
};
