import Login from "./Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";
import React, { useState } from "react";
import Dashboard from "./dashboard/Dashboard";
import Hearder from "./Header";
import moment from "moment";
import Footer from "./Footer";
import AuthService from "../services/authService";
import veilleService from "../services/veilleService";

function App() {
  const [token] = useState(AuthService.getCurrentUser());

  setInterval(updateDateHeure, 240000);

  async function updateDateHeure() {
    var heure = moment().utcOffset("+01:00").format();
    heure = heure.substring(11, 16);
    var date = moment().utcOffset("+01:00").format("YYYY-MM-DD");
    veilleService.Heure(heure, date);
  }

  if (token == null) {
    return (
      <div className="App">
        <Hearder token={token} />
        <Login />
        <Footer />
      </div>
    );
  } else
    return (
      <div className="App">
        <Hearder token={token} />
        <Dashboard />
        <Footer />
      </div>
    );
}

export default App;
