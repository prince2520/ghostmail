import { useEffect } from 'react';


import Authentication from './pages/Authentication/Authentication';

import { Navigate, Route, Routes } from "react-router-dom";
import AuthenticationLogin from './pages/Authentication/AuthenticationLogin/AuthenticationLogin';
import AuthenticationSignUp from './pages/Authentication/AuthenticationSignUp/AuthenticationSignUp';
import Header from './components/custom/Header';
import Footer from './components/custom/Footer';
import Home from './pages/Home/Home';

import { useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { getUserThunk } from './redux/thunks/userThunk';
import { useAppDispatch } from './redux/store';
import { socketJoinAllMail, socketJoinNewMail } from './services/socket';
import { getMailThunk } from './redux/thunks/mailThunk';

import { ToastContainer } from 'react-toastify';
import { Slide } from 'react-toastify';
import { useTheme } from './components/ui/theme-provider';

import './App.css';

function App() {
  const location = useLocation();

  const dispatch = useAppDispatch();

  const { logout, autoLogout } = useAuth();

  const {theme} = useTheme();


  useEffect(() => {
    const localToken = localStorage.getItem("token") ?? "";
    const localExpiryDate = localStorage.getItem("expiryDate");

    if (!localExpiryDate) {
      return;
    }

    if (new Date(localExpiryDate) <= new Date()) {
      logout();
      return;
    }

    const remainingMilliseconds =
      new Date(localExpiryDate).getTime() - new Date().getTime();

    autoLogout(remainingMilliseconds);

    const isAuth = localStorage.getItem("isAuth") == "true" ? true : false;

    if (isAuth) {
      dispatch(getUserThunk({ token: localToken }))
        .unwrap()
        .then((res) => {
          socketJoinAllMail(res.data.mails)
        });
    } else {
      const mailId = localStorage.getItem("mailId") ?? "";

      if (mailId) {
        socketJoinNewMail(mailId);
        dispatch(getMailThunk({ token: localToken, mailId, isAuth: isAuth }));
      }

    };
  }, []);

  return (
    <div className='flex  gap-y-4 flex-col my-4 md:my-6 w-full mx-2	md:mx-6 max-w-5xl'>
      <Header />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        aria-label="Toast notifications container"
        draggable
        pauseOnHover
        transition={Slide}
        theme={theme !== "dark"? "dark" : "light"}
      />
      <Routes>
        <Route path="/auth" element={<Authentication />}>
          <Route path="login" element={<AuthenticationLogin />} />
          <Route path="signup" element={<AuthenticationSignUp />} />
          <Route path="" element={<Navigate to={"/auth/login"} />} />
        </Route>
        <Route path="/home" element={<Home />} />
        <Route
          path="/"
          element={<Navigate to={"/home"} />}
        />
      </Routes>
      {(location.pathname === '/home') && <Footer />}
    </div>
  )
}

export default App
