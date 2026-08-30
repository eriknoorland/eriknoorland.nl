import * as React from 'react';
import type { TProps } from './interfaces';
import './styles.scss';

const Container = (props: TProps) => {
  return (
    <div className="container">
      {props.children}
    </div>
  );
}

export default Container;