import * as React from 'react';
import { useState } from 'react';
import Filters from '#components/Filters';
import Card from '#components/Card';
import type { TProps } from './interfaces';

import './styles.scss';

const PageProjects = (props: TProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  return (
    <div className="projects">
      <h3 className="projects__title">
        Projects
      </h3>

      <Filters
        data={props.filters}
        selected={selectedFilters}
        onChangeHandler={setSelectedFilters}
        className="projects__filters"
      />

      <div className="projects__grid">
        <div className="projects__gridInner">
          <div>
            {
              props.projects
                .filter(project => !selectedFilters.length || selectedFilters.includes(project.category))
                .map((project, index) => (
                  <React.Fragment key={index}>
                    <Card
                      data={project}
                      className="projects__item"
                      onCustomClick={props.onSelectProject}
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