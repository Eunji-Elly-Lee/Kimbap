import { useState, useEffect } from 'react';
import { authService } from 'fbase';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from 'components/Header';
import Home from 'routes/Home';
import SignIn from 'routes/SignIn';
import Menu from 'routes/Menu';
import Orders from 'routes/Orders';
import Footer from 'components/Footer';

function App() {
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      }
    });
  }, []);

  return (
    <div>
      <Router>
        <Header user={userObj} />
        <Routes>
          <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
          <Route basename={process.env.PUBLIC_URL} path="/signin" element={<SignIn user={userObj} />} />
          <Route basename={process.env.PUBLIC_URL} path="/menu" element={<Menu user={userObj} />} />
          <Route basename={process.env.PUBLIC_URL} path="/orders" element={<Orders user={userObj} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
