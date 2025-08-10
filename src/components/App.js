import { useState, useEffect } from 'react';
import { authService } from 'fbase';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from 'ScrollToTop';
import Header from 'components/Header';
import Home from 'routes/Home';
import Auth from 'routes/Auth';
import SignIn from 'routes/SignIn';
import Menu from 'routes/Menu';
import Order from 'routes/Order';
import Orders from 'routes/Orders';
import Footer from 'components/Footer';
import 'components/App.css';

function App() {
  const [userObj, setUserObj] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const logOut = () => {
    setUserObj(null);
  };
  useEffect(() => {
    const unsub = authService.onAuthStateChanged((user) => {
      setUserObj(user ?? null);
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  if (!authReady) {
    return (
      <div className="auth-loading d-flex justify-content-center align-items-center fs-5">
        Loading…
      </div>
    );
  }

  return (
    <div className="site-bg position-relative">
      <Router>
        <ScrollToTop />
        <Header user={userObj} logOut={logOut} />
        <Routes>
          <Route path={`${process.env.PUBLIC_URL}/`} element={<Home user={userObj} />} />
          <Route basename={process.env.PUBLIC_URL} path="/auth" element={<Auth />} />
          <Route basename={process.env.PUBLIC_URL} path="/signin" element={<SignIn user={userObj} />} />
          <Route basename={process.env.PUBLIC_URL} path="/menu" element={<Menu user={userObj} />} />
          <Route basename={process.env.PUBLIC_URL} path="/order" element={<Order user={userObj} />} />
          <Route basename={process.env.PUBLIC_URL} path="/orders" element={<Orders user={userObj} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
