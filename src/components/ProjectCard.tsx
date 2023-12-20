import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Project } from '../types';

import '../scss/components/projectCard.scss';

type Props = {
  data: Project;
  className: string;
};

export default (props: Props) => {
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const onIntersectAnimation = (entries: Array<IntersectionObserverEntry>, observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;

          setIsInView(true);
          observer.unobserve(element);
        }
      });
    };

    const animationObserver = new IntersectionObserver(onIntersectAnimation, { rootMargin: '0px', threshold: .5 });

    if (cardRef.current) {
      animationObserver.observe(cardRef.current);
    }

    return () => {
      animationObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={`projectCard ${isInView && 'projectCard--inView'} ${props.className}`}
      ref={cardRef}
    >
      {!props.data.video &&
        <img
          src={props.data.image.url}
          width={props.data.image.dimensions.width}
          height={props.data.image.dimensions.height}
          alt={props.data.title.text}
          className="projectCard__image"
        />
      }

      {!!props.data.video && 
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