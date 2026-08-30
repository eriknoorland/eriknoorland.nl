import * as React from 'react';
import type { TProps } from './interfaces';

import './styles.scss';

export default ({ data, selected, onChangeHandler, className }: TProps) => {
  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value: string = event.currentTarget.value;
    const filters: Array<string> = [...selected];

    if (!filters.includes(value)) {
      filters.push(value);
    } else {
      const filterIndex: number = filters.findIndex(filter => filter === value);

      filters.splice(filterIndex, 1);
    }

    onChangeHandler(filters);
  };

  return (
    <div className={`projectFilters ${className}`}>
      {data.map((filter, index) => {
        return <label
          key={index}
          className={`projectFilters__item ${selected.includes(filter) && 'projectFilters__item--selected'}`}
        >
          <input
            type="checkbox"
            id={filter}
            value={filter}
            className="projectFilters__input"
            onChange={handleOnChange}
          />

          <span className="projectFilters__label">
            {filter}
          </span>
        </label>
      })}
    </div>
  );
};