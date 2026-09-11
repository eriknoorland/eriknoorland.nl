import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Logo from '#components/Logo';
import * as styles from './styles.module.scss';

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
    <header ref={headerRef} className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
      <a href="#hero" onClick={onNavClick} aria-label="Erik Noorland">
        <Logo className={styles.logo} />
      </a>

      <nav className={styles.nav}>
        <a
          href="#about-me"
          className={styles.navLink}
          onClick={onNavClick}
        >
          About me
        </a>

        <a
          href="#projects"
          className={styles.navLink}
          onClick={onNavClick}
        >
          Projects
        </a>

        <a
          href="#contact"
          className={styles.navLink}
          onClick={onNavClick}
        >
          Contact
        </a>
      </nav>
    </header>
  );
};