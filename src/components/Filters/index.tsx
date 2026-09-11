import * as React from 'react';
import type { TProps } from './interfaces';

import * as styles from './styles.module.scss';

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
    <div className={`${styles.filters} ${className}`}>
      {data.map((filter, index) => {
        return <label
          key={index}
          className={`${styles.item} ${selected.includes(filter) ? styles.itemSelected : ''}`}
        >
          <input
            type="checkbox"
            id={filter}
            value={filter}
            className={styles.input}
            onChange={handleOnChange}
          />

          <span className={styles.label}>
            {filter}
          </span>
        </label>
      })}
    </div>
  );
};