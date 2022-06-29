import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ToastProvider } from './library/toast';
import { App } from './pages/App';
import { FixedGlobalStyle, ThemedGlobalStyle, ThemeProvider } from './theme';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <FixedGlobalStyle />
    <ThemeProvider>
      <ThemedGlobalStyle />
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>
);
