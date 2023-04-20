import { useCallback, useState } from 'react';
import { FilterPayload } from '../types';

import styles from './filter.module.css';
import { getDefaultFilterOption } from '../utils/sales-utils';
import { FilterContainer } from './FilterContainer';

type FilterProps = {
  onApplyFilter: (filter: FilterPayload) => void;
  filterPayload?: FilterPayload;
};

export const Filter = ({ onApplyFilter, filterPayload }: FilterProps) => {
  const defaultOption = getDefaultFilterOption(filterPayload);

  const [advFilter, setAdvFilter] = useState<FilterPayload[]>(defaultOption[0].payload);
  const [queryType, setQueryType] = useState<string>(defaultOption[0].filterType);

  const handleAdvancedFilter = useCallback((filters: any, index: number) => {
    setAdvFilter((currentFilter) => {
      const updatedFilter = [...currentFilter];
      updatedFilter[index] = filters;
      return updatedFilter;
    });
  }, []);

  const handleAddMore = () => {
    setAdvFilter((currentFilter) => {
      return [...currentFilter, {}];
    });
  };

  const handleApplyFilter = () => {
    if (advFilter.length === 1) {
      onApplyFilter(advFilter[0]);
    } else {
      const payload = createPayload(advFilter);
      onApplyFilter(payload);
    }
  };

  const createPayload = (filters: any) => {
    const payload: any = {};
    payload[queryType] = filters;
    return payload;
  };

  return (
    <div className={styles.filterContainer}>
      {/* <pre>{JSON.stringify(advFilter, undefined, 2)}</pre> */}

      {advFilter.map((filter, index) => {
        return (
          <FilterContainer
            key={index}
            index={index}
            advFilter={advFilter}
            filterPayload={filterPayload}
            queryType={queryType}
            setQueryType={setQueryType}
            onUpdateFilters={(filters: any, index) => {
              handleAdvancedFilter(filters, index);
            }}
          />
        );
      })}
      <div className={styles.buttons}>
        <button onClick={handleApplyFilter}>Apply</button>
        <button onClick={handleAddMore}>Add more</button>
      </div>
    </div>
  );
};
