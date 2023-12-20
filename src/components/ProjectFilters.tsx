import * as React from 'react';

import '../scss/components/projectFilters.scss';

type Props = {
  data: Array<string>;
  selected: Array<string>;
  onChangeHandler: Function;
  className: string;
};

export default (props: Props) => {
  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value: string = event.currentTarget.value;
    const filters: Array<string> = [...props.selected];

    if (!filters.includes(value)) {
      filters.push(value);
    } else {
      const filterIndex: number = filters.findIndex(filter => filter === value);

      filters.splice(filterIndex, 1);
    }

    props.onChangeHandler(filters);
  };

  return (
    <div className={`projectFilters ${props.className}`}>
      {props.data.map((filter, index) => {
        return <label
          key={index}
          className={`projectFilters__item ${props.selected.includes(filter) && 'projectFilters__item--selected'}`}
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