import * as React from 'react';
import type { TProps } from './interfaces';
import * as styles from './styles.module.scss';

const Container = ({ children }: TProps) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

export default Container;