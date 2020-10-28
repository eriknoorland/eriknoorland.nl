const hasLocalStorage = 'localStorage' in window;

/**
 * Initialise lazy font loading
 */
const initFont = () => {
  if (hasLocalStorage) {
    const storedFont = localStorage.getItem('google-font');

    if (storedFont) {
      onFontLoadSucces(storedFont);
    }

    return;
  }

  window
    .fetch('http://fonts.googleapis.com/css?family=Open+Sans:300')
    .then(response => response.text())
    .then(onFontLoadSucces);
};

/**
 * Handle font loaded event
 * @param {String} response
 */
const onFontLoadSucces = (response) => {
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');

  style.type = 'text/css';

  if (style.styleSheet){
    style.styleSheet.cssText = response;
  } else {
    style.appendChild(document.createTextNode(response));
  }

  head.appendChild(style);

  if (hasLocalStorage && !localStorage.getItem('google-font')) {
    localStorage.setItem('google-font', response);
  }
};

export default initFont;
