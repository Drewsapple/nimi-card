import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import { FixedGlobalStyle, ThemedGlobalStyle, ThemeProvider } from './theme';
import { App } from './pages/App';
import './i18n';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <FixedGlobalStyle />
    <ThemeProvider>
      <ThemedGlobalStyle />
      <App />
    </ThemeProvider>
  </StrictMode>
);
