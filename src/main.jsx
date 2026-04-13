import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CurrentLocationProvider } from './context/CurrentLocationContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CurrentLocationProvider>
      <App />
    </CurrentLocationProvider>
  </StrictMode>,
)
