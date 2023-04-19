import { ChangeEvent } from 'react';
import { FilterOption } from '../types';

type SelectOptionFilterProps = {
  name: string;
  options: FilterOption['options'];
  filterValue: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectOptionFilter = ({
  name,
  options,
  onChange,
  filterValue,
}: SelectOptionFilterProps) => {
  return (
    <div style={{ marginBottom: '0.5rem', display: 'flex', marginLeft: '0.5rem', gap: '0.2rem' }}>
      <label htmlFor="id">where {name} is</label>
      <select id={name} defaultValue="select" name={name} onChange={onChange}>
        <option key="default" value="select">
          Select
        </option>
        {options!.map(({ id, name }) => (
          <option key={id} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
