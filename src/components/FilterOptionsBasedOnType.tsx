import { ChangeEvent } from 'react';
import { FilterOption } from '../types';
import { RichTextFilter } from './RichTextFilter';
import { SelectOptionFilter } from './SelectOptionFilter';

type RenderFilterProps = {
  selectedOption: FilterOption;
  filterValue: string;
  onCreateFilterChange: (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => void;
};

export const FilterOptionsBasedOnType = ({
  selectedOption,
  filterValue,
  onCreateFilterChange,
}: RenderFilterProps) => {
  const filters: JSX.Element[] = [];

  if (
    selectedOption?.type === 'rich_text' ||
    selectedOption?.type === 'title' ||
    selectedOption?.type === 'number'
  ) {
    const type = selectedOption?.type === 'number' ? 'number' : 'text';
    filters.push(
      <RichTextFilter
        key={selectedOption?.id}
        type={type}
        id={selectedOption?.id}
        name={selectedOption?.name || ''}
        filterValue={filterValue}
        onChange={onCreateFilterChange}
      />,
    );
  }
  if (selectedOption?.type === 'select' && selectedOption.options !== undefined) {
    filters.push(
      <SelectOptionFilter
        key={selectedOption?.name}
        name={selectedOption?.name || ''}
        filterValue={filterValue}
        onChange={onCreateFilterChange}
        options={selectedOption.options}
      />,
    );
  }

  return <>{filters}</>;
};
