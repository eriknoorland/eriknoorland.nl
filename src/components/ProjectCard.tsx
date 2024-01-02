import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Project } from '../types';

import '../scss/components/projectCard.scss';

type Props = {
  data: Project;
  className: string;
  onCustomClick: Function;
};

export default (props: Props) => {
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
    props.onCustomClick(props.data);
  };

  return (
    <div
      id={props.data.title.text}
      className={`projectCard ${isInView ? 'projectCard--inView' : ''} ${props.className}`}
      ref={cardRef}
      onClick={handleClick}
    >
      {!props.data.video && doLoadAssets &&
        <img
          src={props.data.image.url}
          width={props.data.image.dimensions.width}
          height={props.data.image.dimensions.height}
          alt={props.data.title.text}
          className="projectCard__image"
        />
      }

      {!!props.data.video && doLoadAssets &&
        <video
          src={props.data.video.url}
          poster={props.data.image.url}
          className="projectCard__video"
          muted
          autoPlay
          playsInline
          loop
        />
      }

      <div className="project__category">
        {props.data.category}
      </div>
    </div>
  );
};