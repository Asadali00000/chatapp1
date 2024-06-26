import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { SocketContextProvider } from './context/atom/socketState.jsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
  <BrowserRouter>
  <RecoilRoot>
    <SocketContextProvider>



    <App />
    <Toaster/>
    </SocketContextProvider>
  </RecoilRoot>
  </BrowserRouter>
  </React.StrictMode>,
)
