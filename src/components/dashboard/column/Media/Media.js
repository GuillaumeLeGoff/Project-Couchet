import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "../../../../styles/Main.css";
import Nav from "react-bootstrap/Nav";
import SplitScreen from "./modeMedia/SplitScreen";
import TimeScreen from "./modeMedia/TimeScreen";
import FullScreen from "./modeMedia/FullScreen";


function Media() {
  const [ModeChoice, setModeChoice] = useState(0);
  const [NavMode, setNavMode] = useState(
    <SplitScreen ModeChoice={ModeChoice} setModeChoice={setModeChoice} />
  );

  function nav(mode) {
    console.log(mode);
    if (mode === 1) {
      setNavMode(
        <SplitScreen ModeChoice={ModeChoice} setModeChoice={setModeChoice} />
      );
      console.log(NavMode);
    }

    if (mode === 2) {
      setNavMode(
        <FullScreen ModeChoice={ModeChoice} setModeChoice={setModeChoice} />
      );
      console.log(NavMode);
    }

    if (mode === 3) {
      setNavMode(
        <TimeScreen ModeChoice={ModeChoice} setModeChoice={setModeChoice} />
      );
      console.log(NavMode);
    }
  }

  return (
    <div className="Media Truck">

      <h5 className="titleColumn">Média</h5>

      <Nav fill variant="tabs">
        <Nav.Item>
          <Nav.Link eventKey="1" onClick={() => nav(1)}>
            {" "}
            {ModeChoice === 1 ? (
              <strong className="ModeChoice">3 images </strong>
            ) : (
              "3 Images"
            )}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2" onClick={() => nav(2)}>
            {ModeChoice === 2 ? (
              <strong className="ModeChoice">1 Image</strong>
            ) : (
              "1 Image"
            )}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="3" onClick={() => nav(3)}>
            {ModeChoice === 3 ? (
              <strong className="ModeChoice">Camion et média </strong>
            ) : (
              "Camion et média "
            )}
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="tabMedia">
      {NavMode}
      </div>
    </div>
  );
}

export default Media;
