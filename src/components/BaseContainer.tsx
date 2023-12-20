import * as React from 'react';
import '../scss/components/baseContainer.scss';

const BaseContainer = (props: { children: any }) => {
  return (
    <div className="container">
      {props.children}
    </div>
  );
}

export default BaseContainer;