import type * as React from 'react';

export type TProps = React.PropsWithChildren<React.HTMLAttributes<HTMLElement> & {
  modifiers?: 'hero' | 'background-grey';
}>;