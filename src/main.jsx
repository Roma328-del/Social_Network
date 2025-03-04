import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Store from './Store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>


    <Provider store={Store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>

  </StrictMode>,
)
