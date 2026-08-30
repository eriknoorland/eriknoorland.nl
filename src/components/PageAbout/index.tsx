import * as React from 'react';
import type { IAboutpageProps } from '../../interfaces';
import './styles.scss';

export default ({ data }: IAboutpageProps) => {
  return (
    <div className="about">
      <div className="about__imageWrapper">

        <img
          src={`${data?.data.image?.url}&w=384`}
          srcSet={`${data?.data.image?.url}&w=384, ${data?.data.image?.url}&w=768 2x`}
          width={data?.data.image?.dimensions?.width}
          height={data?.data.image?.dimensions?.height}
          alt="Picture of Erik Noorland"
          className="about__image"
        />
      </div>

      <div className="about__content">
        <h2 className="about__title">
          {data?.data.title.text}
        </h2>

        <div
          dangerouslySetInnerHTML={{ __html: data?.data.body.html || '' }}
          className="about__body"
        />
      </div>
    </div>
  );
};