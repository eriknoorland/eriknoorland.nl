import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Logo from '#components/Logo';
import './styles.scss';

export default () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > (window.innerHeight - 57));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const headerElement = headerRef.current;

    if (headerElement) {
      headerElement.inert = !isVisible;
    }
  }, [isVisible]);

  const onNavClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const targetId: string | null = event.currentTarget.getAttribute('href');

    if (targetId) {
      const targetElement: HTMLElement | null = document.querySelector(targetId);

      if (targetElement) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        targetElement.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    }
  };

  return (
    <header ref={headerRef} className={`header ${isVisible && 'header--visible'}`}>
      <a href="#hero" onClick={onNavClick}>
        <Logo className="header__logo" />
      </a>
  
      <nav className="header__nav">
        <a
          href="#about-me"
          className="header__nav__link"
          onClick={onNavClick}
        >
          About me
        </a>
  
        <a
          href="#projects"
          className="header__nav__link"
          onClick={onNavClick}
        >
          Projects
        </a>
  
        <a
          href="#contact"
          className="header__nav__link"
          onClick={onNavClick}
        >
          Contact
        </a>
      </nav>
    </header>
  );
};