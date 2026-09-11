import * as React from 'react';
import { useState } from 'react';
import Filters from '#components/Filters';
import Card from '#components/Card';
import type { TProps } from './interfaces';

import * as styles from './styles.module.scss';

const PageProjects = ({ projects, filters, onSelectProject }: TProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  return (
    <div>
      <h2 className={styles.title}>
        Projects
      </h2>

      <Filters
        data={filters}
        selected={selectedFilters}
        onChangeHandler={setSelectedFilters}
        className={styles.filters}
      />

      <div>
        <div className={styles.gridInner}>
          <div>
            {
              projects
                .filter(project => !selectedFilters.length || selectedFilters.includes(project.category))
                .map((project, index) => (
                  <React.Fragment key={index}>
                    <Card
                      data={project}
                      className={styles.item}
                      onCustomClick={onSelectProject}
                    />
                  </React.Fragment>
                ))
              }
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageProjects;