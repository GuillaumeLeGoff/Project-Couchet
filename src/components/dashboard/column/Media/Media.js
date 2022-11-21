import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "../../../../styles/Main.css";
import Nav from "react-bootstrap/Nav";
import SplitScreen from "./modeMedia/SplitScreen";
import TimeScreen from "./modeMedia/TimeScreen";
import FullScreen from "./modeMedia/FullScreen";
import ModeService from "../../../../services/modeService";
import { useEffect } from "react";

function Media() {

  const [ModeChoice, setModeChoice] = useState([]);
  const [NavMode, setNavMode] = useState();

  useEffect(() => {
    getMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getMode() {
    ModeService.getMode().then((result) => {
      setModeChoice(result.data);
      nav(result.data[0].activeMode);
    });
  }
  
  async function changeMode(mode) {
    ModeService.choiceMode(mode);
    getMode();
  }

  function nav(mode) {
    if (mode === "1") {
      setNavMode(<SplitScreen changeMode={changeMode} />);
    }

    if (mode === "2") {
      setNavMode(<FullScreen changeMode={changeMode} />);
    }

    if (mode === "3") {
      setNavMode(<TimeScreen changeMode={changeMode} />);
    }
  }

  return (
    <div className="Media Truck">
      <h5 className="titleColumn">Média</h5>
      {ModeChoice.map((Choice) => (
        <Nav key={Choice._id} fill variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="1" onClick={() => nav("1")}>
              {" "}
              {Choice.activeMode === "1" ? (
                <strong className="ModeChoice">3 images </strong>
              ) : (
                "3 Images"
              )}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="2" onClick={() => nav("2")}>
              {Choice.activeMode === "2" ? (
                <strong className="ModeChoice">1 Image</strong>
              ) : (
                "1 Image"
              )}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="3" onClick={() => nav("3")}>
              {Choice.activeMode === "3" ? (
                <strong className="ModeChoice">Camion et média </strong>
              ) : (
                "Camion et média "
              )}
            </Nav.Link>
          </Nav.Item>
        </Nav>
      ))}
      <div className="tabMedia">{NavMode}</div>
    </div>
  );
}

export default Media;
