import React, { useMemo, useState } from 'react';
import { graphql } from 'gatsby';
import type { HeadFC, PageProps } from 'gatsby';
import type { IProject } from '../interfaces';
import ProjectDetailModal from '#components/ProjectDetailModal';
import Header from '#components/Header';
import Section from '#components/Section';
import Container from '#components/Container';
import ScrollHint from '#components/ScrollHint';
import PageHero from '#components/PageHero';
import PageAbout from '#components/PageAbout';
import PageProjects from '#components/PageProjects';
import PageContact from '#components/PageContact';
import shuffleArray from '#utils/shuffleArray';
import '#scss/base.scss';

interface HomePageProps extends PageProps {
  data: Queries.allDataQuery;
};

export const allData = graphql`
  query allData {
    prismicHomepage(data: {}) {
      data {
        title {
          text
        }
        subtitle {
          text
        }
      }
    }
    prismicAbout(data: {}) {
      data {
        title {
          text
        }
        body {
          html
        }
        image {
          alt
          url
          dimensions {
            width
            height
          }
        }
      }
    }
    prismicContact(data: {}) {
      data {
        title {
          text
        }
        body {
          html
        }
      }
    }
    allPrismicProject {
      edges {
        node {
          uid
          data {
            title {
              text
              html
            }
            description {
              text
            }
            image {
              alt
              url
              dimensions {
                height
                width
              }
            }
            video {
              url
            }
            category
            link {
              url
            }
            tags {
              tag
            }
          }
        }
      }
    }
  }
`;

const IndexPage = ({ data }: HomePageProps) => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  const projects: Array<IProject> = useMemo(() => {
    return data.allPrismicProject.edges.map((edge: any) => {
      return {
        ...edge.node.data,
      };
    })
  }, [data]);

  const shuffledProjects: Array<IProject> = useMemo(() => {
    return shuffleArray(projects);
  }, [projects]);

  const extractProjectCategories = (acc: Array<string>, { category }: IProject): Array<string> => {
    if (!acc.includes(category)) {
      acc.push(category);
    }

    return acc;
  };

  const projectFilters = projects
    .filter(({ category }) => !!category)
    .reduce(extractProjectCategories, [])
    .sort((a, b) => a.localeCompare(b));

  const handleSelectproject = (project: IProject) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };
  
  const handleProjectModalClose = () => {
    setIsProjectModalOpen(false);
  };

  return (
    <main>
      <Header />

      <Section
        id="hero"
        modifiers="hero"
      >
        <PageHero data={data.prismicHomepage} />
        <ScrollHint />
      </Section>

      <Section
        id="about-me"
        modifiers="background-grey"
      >
        <Container>
          <PageAbout data={data.prismicAbout} />
        </Container>
      </Section>

      <Section id="projects">
        <Container>
          <PageProjects
            projects={shuffledProjects}
            filters={projectFilters}
            onSelectProject={handleSelectproject}
          />
        </Container>
      </Section>

      <Section
        id="contact"
        modifiers="background-grey"
      >
        <Container>
          <PageContact data={data.prismicContact} />
        </Container>
      </Section>

      {selectedProject && <ProjectDetailModal
        isOpen={isProjectModalOpen}
        data={selectedProject}
        onClose={handleProjectModalClose}
      />}
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <>
  <html lang="en" />
  <title>Erik Noorland - Frontend Developer</title>
  <meta name="description" content="The portfolio of a passionate frontend developer" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
  <meta name="msapplication-TileColor" content="#ffffff" />
  <meta name="theme-color" content="#ffffff"></meta>
</>;