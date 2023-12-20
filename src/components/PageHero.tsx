import * as React from 'react';
import { HomepageProps } from '../types';
import TheLogo from './TheLogo';
import '../scss/components/pageHero.scss';

const PageHero = (props: HomepageProps) => {
  return (
    <div className="hero">
      <div className="hero__inner">
        <div className="hero__logoWrapper">
          <TheLogo />
        </div>

        <div className="hero__content">
          <h1 className="hero__title">
            {props.data?.data.title.text}
          </h1>

          <h2 className="hero__subtitle">
          {props.data?.data.subtitle.text}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default PageHero;