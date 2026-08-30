import type * as React from 'react';
import type { IProject } from '../../interfaces';

export type TProps = React.HTMLAttributes<HTMLDivElement> & {
  data: IProject;
  onCustomClick: (project: IProject) => void;
};