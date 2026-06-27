import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

import { HomepageProvider } from './context/HomepageContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomepageProvider>
      <App />
    </HomepageProvider>
  </StrictMode>
);
