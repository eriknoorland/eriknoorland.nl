import * as React from 'react';
import DotField from '#components/DotField';
import type { TProps } from './interfaces';
import * as styles from './styles.module.scss';

const MODIFIER_CLASSES: Record<NonNullable<TProps['modifiers']>, string> = {
  hero: styles.hero,
  'background-grey': styles.backgroundGrey,
};

const Section = ({ id, modifiers, children }: TProps) => {
  return (
    <section
      id={id}
      className={`${styles.section} ${modifiers ? MODIFIER_CLASSES[modifiers] : ''}`}
    >
      {modifiers === 'hero' && <DotField />}
      {children}
    </section>
  );
}

export default Section;