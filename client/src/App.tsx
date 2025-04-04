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
import { getUser } from './redux/thunks/userThunk';
import { useAppDispatch } from './redux/store';
import { socketJoinAllMail, socketJoinNewMail } from './services/socket';
import { MailActions } from './redux/slices/mailSlice';
import { useToast } from './hooks/use-toast';
import { getMail } from './redux/thunks/mailThunk';


import './App.css';

function App() {
  const location = useLocation();

  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const { logout, autoLogout } = useAuth();


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
      dispatch(getUser({ token: localToken }))
        .unwrap()
        .then((res) => {
          socketJoinAllMail(res.data.mails)
          dispatch(MailActions.getMails(res.data.mails));
        })
        .catch(err => {
          toast({
            title: "Error",
            description: err.message,
            variant: "destructive"
          });
        });
    } else {
      const mailId = localStorage.getItem("mailId") ?? "";

      if (mailId) {
        socketJoinNewMail(mailId);
        dispatch(getMail( { token: localToken, mailId, isAuth: isAuth }));
      }
      
    };
  }, []);

  return (
    <div className='flex  gap-y-4 flex-col my-4 md:my-6 w-full mx-2	md:mx-6 max-w-5xl'>
      <Header />
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
