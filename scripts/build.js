// https://www.webdevdrops.com/build-static-site-generator-nodejs-8969ebe34b22/

const fse = require('fs-extra');
const path = require('path');
const { promisify } = require('util');
const ejsRenderFile = promisify(require('ejs').renderFile);
const globP = promisify(require('glob'));
const sass = require('node-sass');
const {
  getResponsiveImages,
  generateResponsiveImages,
  renameImagesToSize,
} = require('responsive-images-generator/lib');
const config = require('../site.config');

const srcPath = './src';
const imgSrcPath = `${srcPath}/assets/img/exports`;
const distPath = './public';
const imgDistPath = `${distPath}/img`;

// clear destination folder
fse.emptyDirSync(distPath);

// compile scss
const compiledScss = sass.renderSync({ file: `${srcPath}/assets/scss/base.scss`, outputStyle: 'compressed' });
const css = compiledScss.css.toString('utf8');

// generate (retina) images
globP('**/*.jpg', { cwd: imgSrcPath })
  .then((images) => {
    const paths = images.map(image => `${imgSrcPath}/${image}`);
    const config = [
      { width: '50%', rename: { suffix: '@1x' } },
      { width: '100%', rename: { suffix: '@2x' } },
    ];

    generateResponsiveImages(paths, config)
      .then(getResponsiveImages.bind(null, `${imgSrcPath}`))
      .then((images) => {
        images.forEach((image) => {
          if (!fse.existsSync(imgDistPath)){
            fse.mkdirSync(imgDistPath);
          }

          fse.rename(
            `${imgSrcPath}/${image}`,
            `${distPath}/img/${image}`
          );
        });
      });
    });

// copy icons folder
globP('**', { cwd: `${srcPath}/assets/icons` })
  .then((files) => {
    files.forEach((file) => {
      fse.copy(`${srcPath}/assets/icons/${file}`, `${distPath}/${file}`);
    });
  });

// read page templates
globP('**/*.ejs', { cwd: `${srcPath}/templates/pages` })
  .then((files) => {
    files.forEach((file) => {
      const fileData = path.parse(file);
      const destPath = path.join(distPath, fileData.dir);

      // create destination directory
      fse.mkdirs(destPath)
        .then(renderPage.bind(null, file))
        .then(renderLayout)
        .then(writeHtmlFile.bind(null, destPath, fileData.name))
        .catch(console.error);
    })
  })
  .catch(console.error);

/**
 * Renders the page template
 * @param {String} file
 * @return {String}
 */
const renderPage = (file) => ejsRenderFile(`${srcPath}/templates/pages/${file}`, Object.assign({}, config));

/**
 * Renders the layout template with page content
 * @param {String} body
 * @return {String}
 */
const renderLayout = (body) => ejsRenderFile(`${srcPath}/templates/layouts/default.ejs`, Object.assign({}, config, { css, body }));

/**
 * Writes the full page to an HTML file
 * @param {String} path
 * @param {String} name
 * @param {String} content
 */
const writeHtmlFile = (path, name, content) => fse.writeFile(`${path}/${name}.html`, content);
