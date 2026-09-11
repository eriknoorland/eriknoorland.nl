import * as React from 'react';
import type { IContactpageProps } from '../../interfaces';
import * as styles from './styles.module.scss';

export default ({ data }: IContactpageProps) => {
  return (
    <div>
      <h2 className={styles.title}>
        {data?.data.title.text}
      </h2>

      <div
        dangerouslySetInnerHTML={{ __html: data?.data.body.html || '' }}
        className={styles.body}
      />
    </div>
  );
};