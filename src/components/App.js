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
  const logOut = () => {
    setUserObj(null);
  };
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      }
    });
  }, []);

  return (
    <div className="position-relative">
      <Router>
        <ScrollToTop />
        <Header user={userObj} logOut={logOut} />
        <div className="background-wrapper position-absolute w-50 d-none d-lg-block">
          <img className="opacity-75 w-100" src="./assets/gimbap_bg.jpg" alt="background gimbap" />
        </div>
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
