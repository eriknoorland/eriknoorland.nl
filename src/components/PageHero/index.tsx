import * as React from 'react';
import type { IHomepageProps } from '../../interfaces';
import Logo from '#components/Logo';
import './styles.scss';

const PageHero = ({ data }: IHomepageProps) => {
  return (
    <div className="hero">
      <div className="hero__inner">
        <div className="hero__logoWrapper">
          <Logo />
        </div>

        <div className="hero__content">
          <h1 className="hero__title">
            {data?.data.title.text}
          </h1>

          <h2 className="hero__subtitle">
          {data?.data.subtitle.text}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default PageHero;