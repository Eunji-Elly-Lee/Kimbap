import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from 'components/Header';
import Home from 'routes/Home';
import SignIn from 'routes/SignIn';
import SignUp from 'routes/SignUp';
import Menu from 'routes/Menu';
import Footer from 'components/Footer';

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Header />
        <Routes>
          <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
          <Route basename={process.env.PUBLIC_URL} path="/signin" element={<SignIn />} />
          <Route basename={process.env.PUBLIC_URL} path="/signup" element={<SignUp />} />
          <Route basename={process.env.PUBLIC_URL} path="/menu" element={<Menu />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
