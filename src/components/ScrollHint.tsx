import * as React from 'react';
import { useState, useEffect } from 'react';
import '../scss/components/scrollHint.scss';

export default () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      if (timeout) {
        clearTimeout(timeout);
      }

      setIsVisible(false);
      window.removeEventListener('scroll', handleScroll);
    };

    timeout = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`scrollHint ${isVisible && 'scrollHint--visible'}`}>
      <svg className="scrollHint__icon bi bi-chevron-down" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>
  
      <span className="scrollHint__label">
        scroll
      </span>
    </div>
  );
};