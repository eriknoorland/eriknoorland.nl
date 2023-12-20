import * as ReactDOM from 'react-dom/client';

export default () => {
  return (element: any, container: any) => {
    const root = ReactDOM.createRoot(container);

    root.render(element);
  };
};