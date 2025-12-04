import 'animate.css';
import './styles/global.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './hooks/useTheme';
import { Router } from './routes/Router';
import { LeadProvider } from './hooks/useLeads';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <LeadProvider>
    <Router />
    </LeadProvider>
    </ThemeProvider >
  </StrictMode>,
)
