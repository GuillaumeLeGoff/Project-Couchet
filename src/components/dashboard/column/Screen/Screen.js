
import React from "react";
import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { RiShutDownLine } from "react-icons/ri";
import { useImmer } from "use-immer";
import ModeService from '../../../../services/modeService'
import veilleService from "../../../../services/veilleService";
import VeilleService from '../../../../services/veilleService'
function Screen() {
  var [State, setState] = useImmer([]);
  var [Heure, setHeure] = useImmer([]);
  useEffect(() => {
    getVeille();
    getHeure()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getVeille() {
    VeilleService.getVeille().then((result) => {
      console.log(result.data);
      setState(result.data);
    });
  }
  async function getHeure() {
    VeilleService.getHeure().then((result) => {
      console.log(result.data);
      setHeure(result.data);
    });
  }
  function heureChange(e, time){
    console.log(time._id);
    setHeure((draft) => {
      const heure = draft.find((heure) => heure._id === time._id);
      heure.heure = e.target.value;

      /* setState(stop e.target.valueAsNumber ) */
    });   
    console.log(Heure);
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
    /* State.forEach((file) => {
      veilleService.Veille(file)
      
    }); */
    Heure.forEach((file) => {
      console.log(file);
      veilleService.Heure(file)
      
    });
  }

  async function switchOff(){
    ModeService.choiceMode(0);
      window.location.reload();
    }

  return (
    <div className="Truck">
      <h5 className="titleColumn">Screen</h5>
      
        {Heure.map((time, index) => (
          <div key={index}><input
          type="time"
          onChange={(e) => heureChange(e, time)}
          value={time.heure}
        ></input></div>
          
        ))}
      
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
  );
}

export default Screen;
