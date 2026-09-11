import * as React from 'react';
import Modal from '#components/Modal';
import type { TProjectDetailModalProps } from './interfaces';
import * as styles from './styles.module.scss';

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
        <h4 className={styles.title}>
          {data.title.text}
        </h4>

        <div className={styles.category}>
          {data.category}
        </div>

        <p className={styles.body}>
          {data.description.text}
        </p>

        {!!tags && <div className={styles.tags}>
          <span className={styles.tagsLabel}>
            Tags:
          </span>

          <span className={styles.tagsList}>
            {tags}
          </span>
        </div>}

        {data.link && <a
          href={data.link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          View project
        </a>}
      </div>
    </Modal>
  );
};

export default ProjectDetailModal;