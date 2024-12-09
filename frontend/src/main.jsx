import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MainContext from '../MainContext.jsx'
import { Provider } from 'react-redux'
import { store } from './Pages/redux/store.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
    <MainContext>
    <App />
    </MainContext>
    </Provider>
  </StrictMode>,
)
