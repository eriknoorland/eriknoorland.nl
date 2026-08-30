import type { IProject } from '../../interfaces';

export type TProps = {
  projects: Array<IProject>;
  filters: Array<string>;
  onSelectProject: (project: IProject) => void;
};