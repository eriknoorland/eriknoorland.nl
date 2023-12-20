import * as React from 'react';
import { ContactpageProps } from '../types';
import '../scss/components/pageContact.scss';

export default (props: ContactpageProps) => {
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