import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && window.parent !== window) {
    window.parent.postMessage({ type: 'virtual-lab-close' }, 'https://2026.igem.wiki');
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
