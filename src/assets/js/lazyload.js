/**
 * Lazy load images
 */
const initLazyLoad = () => {
  const images = [...document.querySelectorAll('[data-js-lazyLoad]')];

  images.forEach(image => {
    const intersectHandler = onIntersect.bind(null, image);
    const observer = new window.IntersectionObserver(intersectHandler, {
      rootMargin: '300px 0px 300px 0px',
    });

    observer.observe(image);
  });
};

/**
 * Intersect lazy image event handler
 * @param {Element} image
 * @param {Array} entries
 * @param {Observer} observer
 */
const onIntersect = (image, entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      image.setAttribute('src', image.dataset.src);
      image.setAttribute('srcset', image.dataset.srcset);
      image.removeAttribute('data-src');
      image.removeAttribute('data-srcset');
      image.removeAttribute('data-js-lazyload');
      observer.unobserve(image);
    }
  });
};

export default initLazyLoad;
