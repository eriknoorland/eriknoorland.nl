require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

import * as path from 'path';
import type { GatsbyConfig } from 'gatsby';

const SCSS_ALIAS = '#scss/';

// Resolves `@use '#scss/<path>'` to `src/scss/<path>`, mirroring the `#scss/*` TS path alias for Sass's own module resolution.
const scssAliasImporter = (url: string) => {
  if (!url.startsWith(SCSS_ALIAS)) {
    return null;
  }

  return { file: path.resolve(__dirname, 'src/scss', url.slice(SCSS_ALIAS.length)) };
};

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
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        cssLoaderOptions: {
          modules: {
            localIdentName: '[local]--[hash:hex:5]',
          },
        },
        sassOptions: {
          importer: scssAliasImporter,
        },
      },
    },
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
