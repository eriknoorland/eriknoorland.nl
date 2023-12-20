import * as React from 'react';
import { Link, HeadFC, PageProps } from 'gatsby';
import '../scss/404.scss';

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <main className="page404Wrapper">
      <div className="page404">
        <h1 className="page404__title">
          Page not found
        </h1>

        <p className="page404__body">
          Sorry 😔, we kunnen de door jou opgevraagde pagina niet vinden.<br /><br />
          
          Klik <Link to="/">hier</Link> om terug te gaan naar de homepagina.
        </p>
      </div>
    </main>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>
