import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import type { TProps } from './interfaces';

import './styles.scss';

export default ({ data, className, onCustomClick }: TProps) => {
  const [isInView, setIsInView] = useState(false);
  const [doLoadAssets, setDoLoadAssets] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const onIntersectAnimation = (entries: Array<IntersectionObserverEntry>, observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      });
    };

    const onIntersectLazyLoad = (entries: Array<IntersectionObserverEntry>, observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setDoLoadAssets(true);
          observer.unobserve(entry.target);
        }
      });
    };

    const animationObserver = new IntersectionObserver(onIntersectAnimation, { rootMargin: '0px', threshold: .1 });
    const lazyLoadObserver = new IntersectionObserver(onIntersectLazyLoad, { rootMargin: '300px 0px 300px 0px' });

    if (cardRef.current) {
      animationObserver.observe(cardRef.current);
      lazyLoadObserver.observe(cardRef.current);
    }

    return () => {
      animationObserver.disconnect();
      lazyLoadObserver.disconnect();
    };
  }, []);

  const handleClick = () => {
    onCustomClick(data);
  };

  return (
    <button
      id={data.title.text}
      className={`projectCard ${isInView ? 'projectCard--inView' : ''} ${className}`}
      ref={cardRef}
      onClick={handleClick}
      aria-label={data.title.text}
      >
      {!data.video && doLoadAssets &&
        <img
          src={data.image.url}
          width={data.image.dimensions.width}
          height={data.image.dimensions.height}
          alt={data.title.text}
          className="projectCard__image"
        />
      }

      {!!data.video && doLoadAssets &&
        <video
          src={data.video.url}
          poster={data.image.url}
          className="projectCard__video"
          muted
          autoPlay
          playsInline
          loop
        />
      }

      <div className="project__category">
        {data.category}
      </div>
    </button>
  );
};