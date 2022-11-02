import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { useImmer } from "use-immer";

function Screen() {
  var [State, setState] = useImmer({});
  const URL_API = "http://localhost:4000";
  useEffect(() => {
    getVeille();
  }, []);

  async function getVeille() {
    const data = {};
    await axios.get(URL_API + "/veille", JSON.stringify(data)).then((result) => {

      setState(result.data);
    });

  }
  function timeStopChange(e) {
    /* setState(stop e.target.valueAsNumber ) */
    
  }

  function timeStartChange(e) {
    console.log("timeStartChange");
    console.log(e);
  }
  return (
    <div className="Truck">
      <h5 className="titleColumn">Screen</h5>
      <p>  heure d’arrêt:</p>
      <input type="time" onChange={(e) =>timeStopChange(e)}></input>
      <p>heure de lancement:</p>
      <input type="time"  onChange={(e) => timeStartChange(e)}></input>
      <Button className="buttonActive" variant="success">
        <FaSave />
      </Button>
    </div>
  );
}

export default Screen;
