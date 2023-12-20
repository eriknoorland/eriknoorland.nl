import * as React from 'react';
import { AboutpageProps } from '../types';
import '../scss/components/pageAbout.scss';

export default (props: AboutpageProps) => {
  return (
    <div className="about">
      <div className="about__imageWrapper">

        <img
          src={`${props.data?.data.image?.url}&w=384`}
          width={props.data?.data.image?.dimensions?.width}
          height={props.data?.data.image?.dimensions?.height}
          alt="Picture of Erik Noorland"
          className="about__image"
        />
      </div>

      <div className="about__content">
        <h2 className="about__title">
          {props.data?.data.title.text}
        </h2>

        <div
          dangerouslySetInnerHTML={{ __html: props.data?.data.body.html || '' }}
          className="about__body"
        />
      </div>
    </div>
  );
};