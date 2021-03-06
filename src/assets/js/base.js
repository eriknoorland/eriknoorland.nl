import initFont from './font';
import initLazyLoad from './lazyload';
import initProjectTriggers from './project';
import loadScript from './utils/loadScript';

((window, document) => {
  /**
   * Initialise
   */
  function initialise() {
    initFont();
    initProjectTriggers();
    initLazyLoad();
  }

  /**
   * Returns is the browser supports all requested features
   * @return Boolean
   */
  function browserSupportsAllFeatures() {
    return window.fetch;
  }

  // let's get this party started!
  window.onload = () => {
    if(browserSupportsAllFeatures()) {
      initialise();
    } else {
      loadScript('/js/polyfills.min.js', initialise);
    }
  };
})(window, document);
