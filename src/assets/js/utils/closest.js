/**
 * Finds the nearest ancestor from element with the given selector
 * @param {element} element
 * @param {String} selector
 * @return {element}
 */
const closest = (element, selector) => {
  var matchesSelector = element.matches ||
    element.webkitMatchesSelector ||
    element.mozMatchesSelector ||
    element.msMatchesSelector;

  while(element) {
    if (matchesSelector.call(element, selector)) {
      break;
    }

    element = element.parentElement;
  }

  return element;
}

export default closest;
