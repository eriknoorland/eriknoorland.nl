import * as React from 'react';
import modifiers from '../utils/modifiers';
import '../scss/components/baseSection.scss';

type Props = {
  children: any;
  id: string;
  modifiers?: 'hero' | 'background-grey';
};

const BaseSection = (props: Props) => {
  return (
    <section
      id={props.id}
      className={modifiers('section', props.modifiers)}
    >
      {props.children}
    </section>
  );
}

export default BaseSection;