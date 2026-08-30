import * as React from 'react';
import modifiers from '#utils/modifiers';
import type { TProps } from './interfaces';
import './styles.scss';

const Section = ({ id, modifiers: sectionModifiers, children }: TProps) => {
  return (
    <section
      id={id}
      className={modifiers('section', sectionModifiers)}
    >
      {children}
    </section>
  );
}

export default Section;