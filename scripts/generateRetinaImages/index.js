const fs = require('fs');
const path = require('path');
const rename = require('rename');
const sharp = require('sharp');

/**
 * Returns all generated images from the given directory
 * @param {[type]} directory
 * @return {Promise}
 */
const getGeneratedImages = (directory) => new Promise((resolve, reject) => {
  const nameMatch = /(?:.*)(@[0-9]{0,10}x)\.[A-Za-z]{0,5}$/

  fs.readdir(directory, (error, images) => {
    if (error) {
      return reject(error);
    }

    resolve(images.filter((image) => nameMatch.test(image)));
  })
});

/**
 *
 * @param {String} path
 * @param {Object} config
 * @return {Promise}
 */
const generateImage = (filePath, config) => new Promise((resolve, reject) => {
  const image = sharp(filePath);
  const filePathObj = path.parse(filePath);

  image.metadata((error, metadata) => {
    if (error) {
      return reject(error);
    }

    if (config.rename) {
      filePath = path.join(filePathObj.dir, rename(filePathObj.base, config.rename));
    }

    const width = Math.round(metadata.width * config.width);

    image.resize(width);

    image.toFile(filePath, (error) => {
      if (error) {
        return reject(error);
      }

      return resolve();
    });
  });
});

/**
 * Generates new images based on the given config
 * @param {Array} paths
 * @param {Array} configs
 * @return {Promise}
 */
const generateImages = (paths, configs) => {
  const promises = [];

  paths.forEach(path => {
    configs.forEach(config => {
      promises.push(generateImage(path, config));
    });
  });

  return Promise.all(promises);
};

module.exports = {
  getGeneratedImages,
  generateImages,
};
