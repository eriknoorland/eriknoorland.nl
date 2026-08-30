import * as React from 'react';
import { useState } from 'react';
import Filters from '#components/Filters';
import Card from '#components/Card';
import { Project } from '../../types';

import './styles.scss';

type Props = {
  projects: Array<Project>;
  filters: Array<string>;
  onSelectProject: Function;
};

const PageProjects = (props: Props) => {
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