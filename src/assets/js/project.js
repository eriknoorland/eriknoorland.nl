import closest from './utils/closest';
import scrollTo from './utils/scrollTo';

const hasSessionStorage = 'sessionStorage' in window;

/**
 * init project triggers
 */
const initProjectTriggers = () => {
  const projectList = document.querySelector('.project__list');
  const triggers = [...projectList.getElementsByClassName('toggle-trigger')];

  triggers.forEach(trigger => trigger.addEventListener('click', onToggleTrigger));
}

/**
 * Handle project triggers click event
 * @param {Event} event
 */
function onToggleTrigger(event) {
  event.preventDefault();

  const project = closest(event.currentTarget, '.project');
  const content = project.querySelector('.project__content');
  const isLoading = content.classList.contains('is-loading');
  const isOpen = content.classList.contains('is-open');
  const isActive = isLoading || isOpen;
  const executeFunction = isActive ? close : open;

  executeFunction(project);
}

/**
 * Opens the project content
 * @param {Element} project
 */
function open(project) {
  toggle(project, true);
}

/**
 * Closes the project content
 * @param {Element} project
 */
function close(project) {
  toggle(project, false);
}

/**
 * Toggles the project content
 * @param {Element} project
 * @param {Boolean} toggle
 */
function toggle(project, toggle) {
  const content = project.querySelector('.project__content');

  if (!toggle) {
    content.removeAttribute('style');
    content.classList.remove('is-open');
  } else {
    const link = project.querySelector('.project__link');
    const url = link.getAttribute('href');
    const title = link.getAttribute('title');
    const storageKey = createStorageKey(title, 'project');
    
    content.classList.add('is-loading');

    if (hasSessionStorage && sessionStorage.getItem(storageKey)) {
      onProjectLoadSucces(content, storageKey, sessionStorage.getItem(storageKey));
    } else {
      window
        .fetch(url)
        .then(response => response.text())
        .then(onProjectLoadSucces.bind(null, content, storageKey));
    }

    scrollTo(project.offsetTop, () => {});
  }
}

/**
 * Returns a storage key
 * @param {String} name
 * @param {String} prefix
 * @return {String}
 */
function createStorageKey(name, prefix = '') {
  const key = name.replace(/\s/g, '-').toLowerCase();
  return `${prefix}-${key}`;
}

/**
 * Handle project loaded event
 * @param {Element} content
 * @param {String} storageKey
 * @param {String} response
 */
function onProjectLoadSucces(content, storageKey, response) {
  const contentInner = content.querySelector('.project__content__inner');
  const onLoadCallback = onProjectContentLoaded.bind(null, content, contentInner);

  content.classList.add('is-open');
  contentInner.innerHTML = response;

  const video = contentInner.querySelector('.project__preview__video');
  const image = contentInner.querySelector('.project__preview__image');

  if (video) {
    video.onloadeddata = onLoadCallback;
    video.onloadedmetadata = onLoadCallback;
  }

  if (image) {
    image.onload = onLoadCallback;
  }

  if (hasSessionStorage && !sessionStorage.getItem(storageKey)) {
    sessionStorage.setItem(storageKey, response);
  }
}

/**
 * Handler for when the project content (i.e. video or image) is loaded
 * @param {Element} content
 * @param {Element} contentInner
 */
function onProjectContentLoaded(content, contentInner) {
  content.classList.remove('is-loading');
  content.style.height = contentInner.offsetHeight + 'px';
}

export default initProjectTriggers;
