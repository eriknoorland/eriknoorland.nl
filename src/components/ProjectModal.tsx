import * as React from 'react';
import BaseModal, { BaseModalProps } from './BaseModal';
import { Project } from '../types';
import '../scss/components/projectModal.scss';

interface ProjectModalProps extends BaseModalProps {
  data: Project;
};

const ProjectModal = (props: ProjectModalProps) => {
  const tags = props.data.tags
    .filter(tag => !!tag.tag)
    .reduce((acc: string, tag, index, array) => {
      return `${acc}${tag.tag}${index === array.length - 1 ? '' : ' // '}`;
    }, '');

  return (
    <BaseModal
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <div className="projectModal">
        <div className="projectModal__title">
          {props.data.title.text}
        </div>

        <div className="projectModal__category">
          {props.data.category}
        </div>

        <p className="projectModal__body">
          {props.data.description.text}
        </p>

        {!!tags && <div className="projectModal__tags">
          <span className="projectModal__tagsLabel">
            Tags:
          </span>
          
          <span className="projectModal__tagsList">
            {tags}
          </span>
        </div>}

        {props.data.link && <a
          href={props.data.link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="projectModal__button"
        >
          View project
        </a>}
      </div>
    </BaseModal>
  );
};

export default ProjectModal;