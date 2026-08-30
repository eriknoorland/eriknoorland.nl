import * as React from 'react';
import { Link } from 'gatsby';
import type { HeadFC, PageProps } from 'gatsby';
import '#scss/404.scss';

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <main className="page404Wrapper">
      <div className="page404">
        <h1 className="page404__title">
          Page not found
        </h1>

        <p className="page404__body">
          Sorry 😔, we can't find the requested page<br /><br />
          
          Click <Link to="/">here</Link> to go back.
        </p>
      </div>
    </main>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <>
  <html lang="en" />
  <title>Not found</title>
</>
