import * as React from 'react';
import Modal from '#components/Modal';
import type { TProjectDetailModalProps } from './interfaces';
import './styles.scss';

const ProjectDetailModal = ({ data, isOpen, onClose }: TProjectDetailModalProps) => {
  const tags = data.tags
    .filter(tag => !!tag.tag)
    .reduce((acc: string, tag, index, array) => {
      return `${acc}${tag.tag}${index === array.length - 1 ? '' : ' // '}`;
    }, '');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="projectModal">
        <h4 className="projectModal__title">
          {data.title.text}
        </h4>

        <div className="projectModal__category">
          {data.category}
        </div>

        <p className="projectModal__body">
          {data.description.text}
        </p>

        {!!tags && <div className="projectModal__tags">
          <span className="projectModal__tagsLabel">
            Tags:
          </span>

          <span className="projectModal__tagsList">
            {tags}
          </span>
        </div>}

        {data.link && <a
          href={data.link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="projectModal__button"
        >
          View project
        </a>}
      </div>
    </Modal>
  );
};

export default ProjectDetailModal;