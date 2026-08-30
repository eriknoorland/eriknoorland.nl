import * as React from 'react';
import type { TProps } from './interfaces';
import './styles.scss';

const Container = ({ children }: TProps) => {
  return (
    <div className="container">
      {children}
    </div>
  );
}

export default Container;