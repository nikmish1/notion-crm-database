import { ChangeEvent, useState } from 'react';
import { FilterOption, FilterPayload, Sales } from '../types';
import { RichTextFilter } from './RichTextFilter';
import { SelectOptionFilter } from './SelectOptionFilter';
import { PropertiesAndTypes } from '../api/constants';

import styles from './filter.module.css';

type FilterProps<T> = {
  onApplyFilter: (filter: FilterPayload) => void;
  data: T[];
  filterPayload?: FilterPayload;
};

const filterOptions: FilterOption[] = [
  { id: 'id', name: 'Id', type: 'title' },
  { id: 'name', name: 'Name', type: 'rich_text' },
  {
    id: 'status',
    name: 'Status',
    type: 'select',
    options: [
      { id: 'high', name: 'high' },
      { id: 'low', name: 'low' },
      { id: 'medium', name: 'medium' },
    ],
  },
];

const getDefaultFilterOption = (filterPayload?: FilterPayload) => {
  console.log({ filterPayload: filterPayload });

  const val = filterPayload
    ? filterOptions.find((option) => option.id === filterPayload.property)
    : undefined;
  return val;
};

const getDefaultFilterValue = (type: string, filterPayload?: FilterPayload) => {
  const val = filterPayload ? filterPayload[type] : '';
  return val['equals'];
};

export const Filter = <T extends unknown>({ onApplyFilter, filterPayload }: FilterProps<T>) => {
  const defaultOption = getDefaultFilterOption(filterPayload);
  const defaultVal = getDefaultFilterValue(defaultOption?.type!, filterPayload);

  const [selectedOption, setSelectedOption] = useState<FilterOption | undefined>(defaultOption);
  const [filterValue, setFilterValue] = useState<string>(defaultVal);
  const [filter, setFilter] = useState<FilterPayload | undefined>(filterPayload);

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
      setFilterData(event.target.id, event.target.value);
    }
  };

  function setFilterData<T>(name: keyof T, value: string) {
    const filter = createFilter(name, value);
    setFilter(filter);
    setFilterValue(value);
  }
  // {
  //   "and": [
  //     {
  //       "property": "Done",
  //       "checkbox": {
  //         "equals": true
  //       }
  //     },
  //     {
  //       "or": [
  //         {
  //           "property": "Tags",
  //           "contains": "A"
  //         },
  //         {
  //           "property": "Tags",
  //           "contains": "B"
  //         }
  //       ]
  //     }
  //   ]
  // }

  const handleAdvancedFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
  };

  return (
    <div className={styles.filterContainer}>
      <div>Filter by:</div>
      <FilterSelector selectedOption={selectedOption} onFilterTypeSelect={handleFilterTypeSelect} />
      <select onChange={handleAdvancedFilter}>
        <option value="and">And</option>
        <option value="or">Or</option>
      </select>

      {selectedOption && (
        <div style={{ display: 'flex', gap: '1rem' }}>
          <RenderFilter
            selectedOption={selectedOption}
            filterValue={filterValue}
            onCreateFilterChange={handleCreateFilterChange}
          />
          <button onClick={() => onApplyFilter(filter!)}>Apply</button>
        </div>
      )}
    </div>
  );
};

export function createFilter(property: any, value: string): FilterPayload {
  const propertyObj = PropertiesAndTypes[property as keyof Sales];

  return { property: property, [propertyObj.type]: { equals: value } };
}

type FilterSelectorProps = {
  selectedOption?: FilterOption;
  onFilterTypeSelect: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const FilterSelector = ({ selectedOption, onFilterTypeSelect }: FilterSelectorProps) => {
  return (
    <select
      defaultValue={selectedOption ? selectedOption.id : 'Select filter'}
      onChange={onFilterTypeSelect}
    >
      <option key="default" value="Select filter">
        Select filter
      </option>
      {filterOptions.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

type RenderFilterProps = {
  selectedOption: FilterOption;
  filterValue: string;
  onCreateFilterChange: (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => void;
};

const RenderFilter = ({ selectedOption, filterValue, onCreateFilterChange }: RenderFilterProps) => {
  const filters: JSX.Element[] = [];

  if (selectedOption?.type === 'rich_text' || selectedOption?.type === 'title') {
    filters.push(
      <RichTextFilter
        name={selectedOption?.name || ''}
        filterValue={filterValue}
        onChange={onCreateFilterChange}
      />,
    );
  }
  if (selectedOption?.type === 'select' && selectedOption.options !== undefined) {
    filters.push(
      <SelectOptionFilter
        name={selectedOption?.name || ''}
        filterValue={filterValue}
        onChange={onCreateFilterChange}
        options={selectedOption.options}
      />,
    );
  }

  return <>{filters}</>;
};
