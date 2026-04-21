import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FullLocationWeatherProvider } from './context/FullLocationWeatherContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FullLocationWeatherProvider>
      <App />
    </FullLocationWeatherProvider>
  </StrictMode>
)
