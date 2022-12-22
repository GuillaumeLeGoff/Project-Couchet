import React from "react";
import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { RiShutDownLine } from "react-icons/ri";
import { useImmer } from "use-immer";


import ModeService from "../../../../services/modeService";
import veilleService from "../../../../services/veilleService";
import VeilleService from "../../../../services/veilleService";
import "../../../../styles/App.css";
function Screen() {
  var [State, setState] = useImmer([]);
  
  var [mode, setMode] = useImmer([]);
  useEffect(() => {
    getVeille();
    
    getMode();
   

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getVeille() {
    VeilleService.getVeille().then((result) => {
      setState(result.data);
    });
  }
  
  /* async function getHeure() {
    VeilleService.getHeure().then((result) => {
      var heure = result.data.substring(0, result.data.length - 1);
      setHeure(heure);
    });
  } */
  async function getMode() {
    ModeService.getMode().then((result) => {
      setMode(result.data);
    });
  }
 

  function timeStopChange(e, time) {
    setState((draft) => {
      const veille = draft.find((veille) => veille._id === time._id);
      veille.stop = e.target.value;

      /* setState(stop e.target.valueAsNumber ) */
    });
  }
  function timeStartChange(e, time) {
    setState((draft) => {
      const veille = draft.find((veille) => veille._id === time._id);
      veille.start = e.target.value;

      /* setState(stop e.target.valueAsNumber ) */
    });
  }

  async function saveTime() {
    State.forEach((file) => {
      veilleService.Veille(file);
    });
    
  }

  async function switchOff() {
    getMode();
    console.log(mode[0].activeMode);
    if (mode[0].activeMode == 0) {
      ModeService.choiceMode2(mode[0].modeBack);
    } else {
      ModeService.shutdownMode(0);
    }
    window.location.reload();
  }

  return (
    <div className="Truck">
      <h5 className="titleColumn">Écran</h5>

      {/* <div className="heure">
        <input
          type="time"
          onChange={(e) => heureChange(e)}
          value={Heure}
        ></input>
        <input type="date" onChange={(e) => dateChange(e)} value={Date}></input>
      </div> */}
      <Table striped>
        <thead>
          <tr>
            <th>Jour</th>
            <th>Début</th>
            <th>Fin</th>
          </tr>
        </thead>
        {State.map((time, index) => (
          <tbody key={time._id}>
            <tr>
              <td>
                <p>{time.title}</p>
              </td>
              <td>
                <input
                  type="time"
                  onChange={(e) => timeStartChange(e, time)}
                  value={time.start}
                ></input>
              </td>
              <td>
                <input
                  type="time"
                  onChange={(e) => timeStopChange(e, time)}
                  value={time.stop}
                ></input>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>

      {mode.map((mode1) => (
        <div key={mode1._id}>
          {mode1.activeMode == 0 ? (
            <div>
              <Button
                className="buttonActive margin50"
                variant="success"
                onClick={() => saveTime()}
              >
                <FaSave />
              </Button>
              <Button
                className="buttonActive "
                variant="danger"
                onClick={() => switchOff()}
              >
                <RiShutDownLine />
              </Button>
            </div>
          ) : (
            <div>
              <Button
                className="buttonActive margin50"
                variant="success"
                onClick={() => saveTime()}
              >
                <FaSave />
              </Button>
              <Button
                className="buttonActive "
                variant="success"
                onClick={() => switchOff()}
              >
                <RiShutDownLine />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Screen;
