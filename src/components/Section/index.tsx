import * as React from 'react';
import modifiers from '#utils/modifiers';
import type { TProps } from './interfaces';
import './styles.scss';

const Section = (props: TProps) => {
  return (
    <section
      id={props.id}
      className={modifiers('section', props.modifiers)}
    >
      {props.children}
    </section>
  );
}

export default Section;