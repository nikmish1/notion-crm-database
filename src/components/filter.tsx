import { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useState } from 'react';
import { FilterOption, Sales } from '../types';
import { RichTextFilter } from './RichTextFilter';
import { SelectOptionFilter } from './SelectOptionFilter';


type FilterProps = {
  onApplyFilter: (filter: any) => void;
  data: Sales[];
};

const FilterOptions: FilterOption[] = [
  { id: 'id', name: 'Id', type: 'text' },
  { id: 'name', name: 'Name', type: 'text' },
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

export const Filter = ({ data, onApplyFilter }: FilterProps) => {
  const [selectedOption, setSelectedOption] = useState<FilterOption>();
  const [filterValue, setFilterValue] = useState('');

  const [filter, setFilter] = useState<any>();

  const handleFilterTypeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value, '----');
    const [value, type] = event.target.value.split(',');
    if (type === 'select') {
      const options = FilterOptions.find((option) => option.id === value);
      setSelectedOption({ id: value, name: value, type: type, options: options?.options });
    } else {
      setSelectedOption({ id: value, name: value, type: type });
    }
  };

  const handleCreateFilterChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => {
    if (event.target.name === 'id') {
      const filter = createFilter(data[0], event.target.name, event.target.value);
      setFilter(filter);
      setFilterValue(event.target.value);
    } else if (event.target.name === 'name') {
      const filter = createFilter(data[0], event.target.name, event.target.value);
      setFilter(filter);
      setFilterValue(event.target.value);
    } else if (event.target.name === 'status') {
      const filter = createFilter(data[0], event.target.name, event.target.value);
      setFilter(filter);
      setFilterValue(event.target.value);
    }
  };

  return (
    <>
      {/* <pre>{JSON.stringify(filter)}</pre> */}
      <div>Filter by:</div>
      <select
        defaultValue="select filter"
        onChange={handleFilterTypeSelect}
        value={selectedOption?.name}
      >
        <option
          key="default"
          value="select filter"
        />
        {FilterOptions.map((option) => (
          <option key={option.id} value={[option.id, option.type]}>
            {option.name}
          </option>
        ))}
      </select>

      {selectedOption?.type === 'text' && (
        <RichTextFilter
          name={selectedOption?.name || ''}
          filterValue={filterValue}
          onChange={handleCreateFilterChange}
        />
      )}

      {selectedOption?.type === 'select' && selectedOption.options !== undefined && (
        <SelectOptionFilter
          name={selectedOption?.name || ''}
          filterValue={filterValue}
          onChange={handleCreateFilterChange}
          options={selectedOption.options}
        />
      )}

      {/* {newFunction()} */}
      <button onClick={() => onApplyFilter(filter)}>Apply</button>
    </>
  );
};

const createFilter = (data: Sales, property: keyof Sales, value: string) => {
  const propertyObj = data[property];

  return { filter: { property: property, [propertyObj.type]: { equals: value } } };
};
