import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CurrentLocationProvider } from './context/CurrentLocationContext';
import { ForecastLocationProvider } from './context/ForecastLocationContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CurrentLocationProvider>
      <ForecastLocationProvider>
        <App />
      </ForecastLocationProvider>
    </CurrentLocationProvider>
  </StrictMode>,
)
