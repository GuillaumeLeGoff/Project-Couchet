import Login from "./Login/Login";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";
import { useState } from "react";
import Dashboard from "./dashboard/Dashboard";



function App() {
  const [token, setToken] = useState();

  if (token) {
    return <Login setToken={setToken} />;
  }
  return (
    <div className="App">
      {/* <ul>
        <li>
          {" "}
          <a href="/dashboard">Dashboard</a>{" "}
        </li>
        <li>
          {" "}
          <a href="/login">Login</a>{" "}
        </li>
      </ul> */}

      <Login />
      <Dashboard />

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
