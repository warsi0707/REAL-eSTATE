import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RecoilRoot } from 'recoil'
import { Auth } from './context/authContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <RecoilRoot>
  <Auth>
    <div className='bg-gray-100'>
      <App />
    </div>
  </Auth>
  </RecoilRoot> 
  // </StrictMode>,
)
