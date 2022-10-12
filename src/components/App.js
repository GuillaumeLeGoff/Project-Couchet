
import Header from "./Header";
import Login from "./Login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Link,
  Route,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";
import { useState } from "react";
import Dashboard from "./dashboard/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function childToParent(childdata) {
    setIsLoggedIn(childdata);
    console.log(isLoggedIn);
  }
  return (
    <div className="App">
      <Header/>
      <Dashboard/>
      {/* <div className="menu">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/dashboard">dashboard</Link>
          </li>
        </ul>
      </div>
      <div className="App-intro">
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </div> */}
    </div>
  );
}

export default App;
