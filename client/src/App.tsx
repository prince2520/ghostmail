import './App.css';

import Authentication from './pages/Authentication/Authentication';

import { Navigate, Route, Routes } from "react-router-dom";
import AuthenticationLogin from './pages/Authentication/AuthenticationLogin/AuthenticationLogin';
import AuthenticationSignUp from './pages/Authentication/AuthenticationSignUp/AuthenticationSignUp';
import Header from './components/custom/Header';

import Home from './pages/Home/Home';

function App() {

  return (
    <div className='flex  gap-y-4 flex-col my-5 w-full	mx-6 max-w-5xl'>
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
    </div>
  )
}

export default App
