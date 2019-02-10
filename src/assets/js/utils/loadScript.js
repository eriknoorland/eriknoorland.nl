/**
 * Injects a polyfill script in the head 
 * and calls the callback function when done
 * @param {String} src
 * @param {Function} callback
 */
const loadScript = (src, callback) => {
  const js = document.createElement('script');
  js.src = src;

  js.onload = () => callback();
  js.onerror = () => callback(new Error('Failed to load script ' + src));

  document.head.appendChild(js);
}

export default loadScript;
