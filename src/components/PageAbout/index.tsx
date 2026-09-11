import * as React from 'react';
import type { IAboutpageProps } from '../../interfaces';
import * as styles from './styles.module.scss';

export default ({ data }: IAboutpageProps) => {
  return (
    <div className={styles.about}>
      <div className={styles.imageWrapper}>

        <img
          src={`${data?.data.image?.url}&w=384`}
          srcSet={`${data?.data.image?.url}&w=384, ${data?.data.image?.url}&w=768 2x`}
          width={data?.data.image?.dimensions?.width}
          height={data?.data.image?.dimensions?.height}
          alt="Picture of Erik Noorland"
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>
          {data?.data.title.text}
        </h2>

        <div
          dangerouslySetInnerHTML={{ __html: data?.data.body.html || '' }}
          className={styles.body}
        />
      </div>
    </div>
  );
};