import * as React from 'react';
import { graphql } from 'gatsby';
import type { HeadFC, PageProps } from 'gatsby';
import { Project } from '../types';
import BaseHeader from '../components/BaseHeader';
import BaseSection from '../components/BaseSection';
import BaseContainer from '../components/BaseContainer';
import ScrollHint from '../components/ScrollHint';
import PageHero from '../components/PageHero';
import PageAbout from '../components/PageAbout';
import PageProjects from '../components/PageProjects';
import PageContact from '../components/PageContact';
import shuffleArray from '../utils/shuffleArray';
import '../scss/base.scss';

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
          }
        }
      }
    }
  }
`;

const IndexPage: React.FC<HomePageProps> = (props) => {
  const projects: Array<Project> = props.data.allPrismicProject.edges.map((edge: any) => {
    return {
      ...edge.node.data,
    };
  });

  const extractProjectCategories = (acc: Array<string>, { category }: Project): Array<string> => {
    if (!acc.includes(category)) {
      acc.push(category);
    }

    return acc;
  };

  const projectFilters = projects
    .reduce(extractProjectCategories, [])
    .sort((a, b) => a.localeCompare(b));

  const shuffledProjects: Array<Project> = shuffleArray(projects);

  return (
    <main>
      <BaseHeader />

      <BaseSection
        id="hero"
        modifiers="hero"
      >
        <PageHero data={props.data.prismicHomepage} />
        <ScrollHint />
      </BaseSection>

      <BaseSection
        id="about-me"
        modifiers="background-grey"
      >
        <BaseContainer>
          <PageAbout data={props.data.prismicAbout} />
        </BaseContainer>
      </BaseSection>

      <BaseSection id="projects">
        <BaseContainer>
          <PageProjects
            projects={shuffledProjects}
            filters={projectFilters}
          />
        </BaseContainer>
      </BaseSection>

      <BaseSection
        id="contact"
        modifiers="background-grey"
      >
        <BaseContainer>
          <PageContact data={props.data.prismicContact} />
        </BaseContainer>
      </BaseSection>
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