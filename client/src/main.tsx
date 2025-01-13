import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthContextProvider } from "./context/authContext.jsx";
import { SocketContextProvider } from "./context/socketContext.jsx";
import { ThemeProvider } from "@/components/ui/theme-provider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    {console.log("google client id ", import.meta.env.VITE_API_GOOGLE_CLIENT_ID )}
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
