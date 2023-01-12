import React from "react";
import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { RiShutDownLine } from "react-icons/ri";
import { useImmer } from "use-immer";
import Preview from "./Preview";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import ModeService from "../../../../services/modeService";
import veilleService from "../../../../services/veilleService";
import VeilleService from "../../../../services/veilleService";
import "../../../../styles/App.css";
function Screen() {
  var [State, setState] = useImmer([]);
  var [mode, setMode] = useImmer([{ flag: false }]);
  useEffect(() => {
    getVeille();
    getMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function getVeille() {
    VeilleService.getVeille().then((result) => {
      setState(result.data);
    });
  }

  async function getMode() {
    ModeService.getMode().then((result) => {
      setMode(result.data);
    });
  }

  function timeStopChange(e, time) {
    setState((draft) => {
      const veille = draft.find((veille) => veille._id === time._id);
      veille.stop = e.target.value;
    });
  }
  function timeStartChange(e, time) {
    setState((draft) => {
      const veille = draft.find((veille) => veille._id === time._id);
      veille.start = e.target.value;
    });
  }

  async function saveTime() {
    getMode();
    ModeService.choiceMode(mode[0].modeBack);

    State.forEach((file) => {
      veilleService.Veille(file);
    });
    sleep(500);
    window.location.reload();
  }

  async function switchOff() {
    getMode();
    console.log(mode[0].flag, mode[0].activeMode);

    if (mode[0].activeMode === "4") {
      ModeService.choiceMode(mode[0].modeBack);
    } else {
      ModeService.choiceMode2(4);
    }
    sleep(500);
    window.location.reload();
  }

  function changeMode() {
    console.log();
    ModeService.shutdownMode(!mode[0].flag);
    mode[0].flag = !mode[0].flag;
    if ( mode[0].activeMode === '4'){
      mode[0].activeMode = '4';
    }
    setMode([mode[0]]);
  }

  return (
    <div className="Truck">
      <h5 className="titleColumn">Écran</h5>
      <Preview />
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
                  disabled={!mode[0].flag}
                  className="horaire"
                  type="time"
                  onChange={(e) => timeStartChange(e, time)}
                  value={time.start}
                ></input>
              </td>
              <td>
                {index === 2 ? (
                  ""
                ) : (
                  <input
                    disabled={!mode[0].flag}
                    className="horaire"
                    type="time"
                    onChange={(e) => timeStopChange(e, time)}
                    value={time.stop}
                  ></input>
                )}
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
      {mode.map((mode1) => (
        <div key={mode1._id}>
          <div className="d-flex justify-content-center switchBouton">
            <p className="p">Mode Automatique </p>
            <BootstrapSwitchButton
              checked={mode1.flag}
              onstyle="success"
              onChange={() => changeMode()}
            />
          </div>
          {mode1.flag === true ? (
            <div>
              <Button
                className="buttonActive "
                variant="success"
                onClick={() => saveTime()}
              >
                <FaSave />
              </Button>
            </div>
          ) : (
            <div>
              {mode1.activeMode === "4" ? (
                <Button
                  className="buttonActive "
                  variant="danger"
                  onClick={() => switchOff()}
                >
                  <RiShutDownLine />
                </Button>
              ) : (
                <Button
                  className="buttonActive "
                  variant="success"
                  onClick={() => switchOff()}
                >
                  <RiShutDownLine />
                </Button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Screen;
