import { ChangeEvent } from 'react';
import { FilterOption } from '../types';
import { filterOptions } from '../api/constants';

type FilterSelectorProps = {
  selectedOption?: FilterOption;
  onFilterTypeSelect: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export const FilterTypeDropDown = ({ selectedOption, onFilterTypeSelect }: FilterSelectorProps) => {
  return (
    <select
      defaultValue={selectedOption ? selectedOption.id : 'Select filter'}
      onChange={onFilterTypeSelect}
    >
      <option key="default" value="Select filter">
        Select filter
      </option>
      {filterOptions.map((option) => (
        <option key={option.id} id={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
