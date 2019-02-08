/**
 * Init project filters
 */
const initFilters = () => {
  const filters = [...document.querySelectorAll('[data-js-filter]')];
  filters.forEach(filter => filter.addEventListener('change', onFilterChange));
}

/**
 * Filter click event handler
 */
function onFilterChange(event) {
  const projects = [...document.querySelectorAll('.project')];
  const filters = [...document.querySelectorAll('[data-js-filter]')];
  
  const selectedFilters = filters
    .filter(filter => filter.checked)
    .map(filter => filter.getAttribute('data-js-filter'));

  projects.forEach(project => project.classList.remove('is-hidden'));
  projects
    .filter(project => selectedFilters.indexOf(project.getAttribute('data-js-project-type')) === -1)
    .forEach(project => project.classList.add('is-hidden'));
}

export default initFilters;
