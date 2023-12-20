import * as React from 'react';
import { useState, useEffect } from 'react';
import TheLogo from './TheLogo';
import '../scss/components/baseHeader.scss';

export default () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > (window.innerHeight - 57));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onNavClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const targetId: string | null = event.currentTarget.getAttribute('href');

    if (targetId) {
      const targetElement: HTMLElement | null = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`header ${isVisible && 'header--visible'}`}>
      <TheLogo className="header__logo" />
  
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