import Header from "./components/Header"
import Home from "./routes/Home";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Header />
        <Routes>
          <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
