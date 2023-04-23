import { ChangeEvent, useCallback, useState } from 'react';
import { FilterOption, FilterPayload, Sales } from '../types';
import { PropertiesAndTypes, filterOptions } from '../api/constants';
import { FilterTypeDropDown } from './FilterTypeDropDown';
import { FilterOptionsBasedOnType } from './FilterOptionsBasedOnType';
import { getFilterOption } from '../utils/sales-utils';

export type FilterContainerProps = {
  index: number;
  filterPayload?: FilterPayload;
  defaultValue?: any;
  advFilter?: any;
  onUpdateFilters: (filters: any, index: number) => void;
  queryType: string;
  setQueryType: React.Dispatch<React.SetStateAction<string>>;
};

export const FilterContainer = ({
  index,
  advFilter,
  onUpdateFilters,
  queryType,
  setQueryType,
}: FilterContainerProps) => {
  const filterOption = getFilterOption(advFilter[index]['property']);
  const defaultValue = filterOption ? advFilter[index][filterOption?.type!]['equals'] : '';
  const [selectedOption, setSelectedOption] = useState<FilterOption | undefined>(filterOption);

  const [filterValue, setFilterValue] = useState<string>(defaultValue);

  const handleFilterTypeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const type = filterOptions.find((option) => option.id === value)?.type!;

    if (type === 'select') {
      const options = filterOptions.find((option) => option.id === value);
      setSelectedOption({ id: value, name: value, type: type, options: options?.options });
    } else {
      setSelectedOption({ id: value, name: value, type: type });
    }
  };

  const handleCreateFilterChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => {
    if (event.target.id) {
      const filter = createFilter(event.target.id, event.target.value);
      onUpdateFilters(filter, index);
      setFilterValue(event.target.value);
    }
  };

  const handleChangeQueryType = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      setQueryType(value);
    },
    [setQueryType],
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>Filter by:</div>
      <FilterTypeDropDown
        selectedOption={selectedOption}
        onFilterTypeSelect={handleFilterTypeSelect}
      />
      {selectedOption && (
        <div style={{ display: 'flex', gap: '1rem' }}>
          <FilterOptionsBasedOnType
            selectedOption={selectedOption}
            filterValue={filterValue}
            onCreateFilterChange={handleCreateFilterChange}
          />
        </div>
      )}

      {advFilter && advFilter.length > 1 && index !== 0 && (
        <select onChange={handleChangeQueryType} value={queryType} style={{ marginLeft: '1rem' }}>
          <option value="and">And</option>
          <option value="or">Or</option>
        </select>
      )}
    </div>
  );
};

export const createFilter = (property: any, value: string) => {
  const propertyObj = PropertiesAndTypes[property as keyof Sales];

  return { property: property, [propertyObj.type]: { equals: value } };
};
