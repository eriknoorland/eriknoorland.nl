import * as React from 'react';
import './styles.scss';

const Container = (props: { children: any }) => {
  return (
    <div className="container">
      {props.children}
    </div>
  );
}

export default Container;