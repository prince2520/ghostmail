import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
import { SocketContextProvider } from "./context/socketContext.jsx";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthContextProvider>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
          <Toaster />
        </AuthContextProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
