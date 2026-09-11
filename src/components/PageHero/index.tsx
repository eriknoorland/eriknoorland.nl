import * as React from 'react';
import type { IHomepageProps } from '../../interfaces';
import Logo from '#components/Logo';
import * as styles from './styles.module.scss';

const PageHero = ({ data }: IHomepageProps) => {
  return (
    <div className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>

        <div>
          <h1 className={styles.title}>
            {data?.data.title.text}
          </h1>

          <h2 className={styles.subtitle}>
          {data?.data.subtitle.text}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default PageHero;