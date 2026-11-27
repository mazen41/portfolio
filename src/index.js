import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './Them';
import { inject } from '@vercel/analytics';

// Initialize Vercel Analytics
inject();

const container = document.getElementById('root');
const app = (
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// Prerendered pages (build/<route>/index.html) already contain markup, so hydrate them.
// Dev server and any page without prerendered markup keep the normal client render.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}
