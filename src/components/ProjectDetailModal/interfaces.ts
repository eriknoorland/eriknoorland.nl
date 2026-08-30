import type { TModalProps } from '#components/Modal/interfaces';
import type { IProject } from '../../interfaces';

export interface TProjectDetailModalProps extends TModalProps {
  data: IProject;
};