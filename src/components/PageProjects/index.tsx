import * as React from 'react';
import { useState } from 'react';
import Filters from '#components/Filters';
import Card from '#components/Card';
import type { TProps } from './interfaces';

import './styles.scss';

const PageProjects = ({ projects, filters, onSelectProject }: TProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  return (
    <div className="projects">
      <h2 className="projects__title">
        Projects
      </h2>

      <Filters
        data={filters}
        selected={selectedFilters}
        onChangeHandler={setSelectedFilters}
        className="projects__filters"
      />

      <div className="projects__grid">
        <div className="projects__gridInner">
          <div>
            {
              projects
                .filter(project => !selectedFilters.length || selectedFilters.includes(project.category))
                .map((project, index) => (
                  <React.Fragment key={index}>
                    <Card
                      data={project}
                      className="projects__item"
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