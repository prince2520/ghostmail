import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from "@/components/ui/theme-provider.tsx";

import { AuthContextProvider } from "./context/authContext.js";
import { SocketContextProvider } from "./context/socketContext.js";

import store from "./store/store.js";

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_API_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <AuthContextProvider>
            <SocketContextProvider>
              <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <App />
              </ThemeProvider >
            </SocketContextProvider>
            <Toaster />
          </AuthContextProvider>
        </Provider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
