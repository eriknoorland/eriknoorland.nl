import * as React from 'react';
import type { IContactpageProps } from '../../interfaces';
import './styles.scss';

export default (props: IContactpageProps) => {
  return (
    <div className="contact">
      <h2 className="contact__title">
        {props.data?.data.title.text}
      </h2>

      <div
        dangerouslySetInnerHTML={{ __html: props.data?.data.body.html || '' }}
        className="contact__body"
      />
    </div>
  );
};