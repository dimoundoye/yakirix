import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource-variable/space-grotesk'
import 'lenis/dist/lenis.css'
import './index.css'
import './styles/mockups.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
