import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SuperTokensConfig } from './Supertokens.jsx'
import App from './App.jsx'
import './index.css'

SuperTokensConfig();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
