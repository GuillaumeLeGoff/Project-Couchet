import Login from "./Login/Login";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";
import { useState } from "react";
import Dashboard from "./dashboard/Dashboard";
import Hearder from "./Header";
import Footer from "./Footer";

import { Route, Routes } from "react-router-dom";

function App() {
  const [token, setToken] = useState();

  if (token) {
    return (<div className="App"><Hearder/> <Login setToken={setToken}/></div>) ;
  }
  return (
    <div className="App">
      <Hearder/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer/>
      </div>
  );
}

export default App;
