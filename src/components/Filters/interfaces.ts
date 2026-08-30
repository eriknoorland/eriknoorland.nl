import type * as React from 'react';

export type TProps = React.HTMLAttributes<HTMLDivElement> & {
  data: Array<string>;
  selected: Array<string>;
  onChangeHandler: Function;
};