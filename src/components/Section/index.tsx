import * as React from 'react';
import modifiers from '#utils/modifiers';
import './styles.scss';

type Props = {
  children: any;
  id: string;
  modifiers?: 'hero' | 'background-grey';
};

const Section = (props: Props) => {
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