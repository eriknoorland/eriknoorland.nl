require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `eriknoorland`,
    siteUrl: `https://eriknoorland.nl`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: process.env.PRISMIC_REPOSITORY_NAME,
				accessToken: process.env.PRISMIC_TOKEN,
				customTypesApiToken: process.env.PRISMIC_CUSTOM_TYPES_TOKEN,
        routes: [
          { type: 'project', path: '/:uid' },
        ],
      },
    },
  ],
};

export default config;
