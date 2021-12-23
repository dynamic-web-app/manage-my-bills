import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignUpForm from './pages/SignUpForm';
import LoginForm from './pages/LoginForm';
import Dashboard from './components/Dashboard';
import AddData from './components/AddData';
import CalculateData from './components/CalculateData';
import ViewData from './components/ViewData';
function App() {
  return (
  <Router basename='/manage-my-bills'>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/log-in"}>Bill-Stack</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/log-in"}>Sign in</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="outer">
        <div className="inner">
          <Routes>
            <Route exact path='/' element={<LoginForm/>} />
            <Route exact path='/manage-my-bills' element={<LoginForm/>} />
            <Route exact path='/dashboard' element={<Dashboard/>} />
            <Route path="/log-in" element={<LoginForm/>} />
            <Route path="/sign-up" element={<SignUpForm/>} />
            <Route path="/addDetails" element={<AddData/>} />
            <Route path="/calculateBill" element={<CalculateData/>} />
            <Route path="/viewData" element={<ViewData/>} />
          </Routes>
        </div>
      </div>
    </div></Router>
  );
}

export default App;
