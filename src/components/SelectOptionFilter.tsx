import { ChangeEvent } from "react";
import { FilterOption } from "../types";


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
    <select defaultValue="select filter" name={name} onChange={onChange} value={filterValue}>
      <option key="default" value="select filter" />
      {options!.map(({ id, name }) => (
        <option key={id} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
};
