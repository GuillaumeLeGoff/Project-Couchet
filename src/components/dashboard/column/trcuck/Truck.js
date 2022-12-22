import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaArrowUp, FaSave } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useImmer } from "use-immer";
import "../../../../styles/Main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import Come from "./State/Come";
import Loading from "./State/Loading";
import Wait from "./State/Wait";
import moment from "moment";
import TruckService from "../../../../services/truckService"
import veilleService from "../../../../services/veilleService";
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
></link>;

function Truck() {
  useEffect(() => {
    waitLoading();
    getHeure();
    getDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var [Heure, setHeure] = useImmer([]);
  var [Date, setDate] = useImmer([]);
  var [LoadingTruck, setLoadingTruck] = useImmer([]);
  var [NextTruck, setNextTruck] = useImmer([]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


  async function getHeure() {
    var date = moment().utcOffset("+01:00").format();
    setHeure(date.substring(11, 16));
    
  }
  async function getDate() {
    var date = moment().utcOffset("+01:00").format("YYYY-MM-DD");
    setDate(date);
  }
  function HandleToggleNext(e, docks) {
    const id = docks.id;
    setNextTruck((draft) => {
      const dock = draft.find((dock) => dock.id === id);
      dock.plate = e.target.value;
    });
  }

  function HandleToggleNextDock(e, docks) {
    const id = docks.id;
    setNextTruck((draft) => {
      const dock = draft.find((dock) => dock.id === id);

      dock.dockIndex = e.target.value;
    });
  }

  function HandleToggleLoading(e, docks) {
    const id = docks.id;
    setLoadingTruck((draft) => {
      const dock = draft.find((dock) => dock.id === id);
      dock.plate = e.target.value;
    });
  }

  function HandleToggleLoadingDock(e, docks) {
    const id = docks.id;
    setLoadingTruck((draft) => {
      const dock = draft.find((dock) => dock.id === id);
      dock.dockIndex = e.target.value;
    });
  }

  async function DeleteNextTruck(docks){ 
    setLoadingTruck((draft) => {
        const dock = draft.find((dock) => dock._id === docks._id);
        dock.dockIndex = 0;
        dock.plate = "";
        dock.state = true;
        dock.flag = true;
        postTruck(dock)
      });
    
  }

  //Move next vers loading
  async function MoveNextToLoading(e, docks) {
    var id = docks.id;
    var id2 = docks.id;
    id2 = id2 - 6;

    LoadingTruck.forEach((dock, index) => {
      // eslint-disable-next-line eqeqeq
      if (docks.dockIndex == dock.dockIndex) {
        setLoadingTruck((draft) => {
          const dock = draft.find((dock) => dock.id === index);
          dock.dockIndex = 0;
          dock.plate = "";
          dock.state = true;
          dock.flag = true;
          postTruck(dock);
        });
      }
    });
    setNextTruck((draft) => {
      const dock = draft.find((dock) => dock.id === id);
      dock.plate = "";
      dock.dockIndex = 0;
      
      postTruck(dock);
    });

    setLoadingTruck((draft) => {
      const dock = draft.find((dock) => dock.id === id2);
      dock.plate = NextTruck[id2].plate;
      dock.dockIndex = NextTruck[id2].dockIndex;
      dock.state = false;
      postTruck(dock);
    });
    window.location.reload();
   /*  await delay(120000);
    setLoadingTruck((draft) => {
      const dock = draft.find((dock) => dock.id === id2);
      dock.state = true;
      postTruck(dock);
    }); */
    
  }

  //Au lancement mettre state en loading(true) au bout de 2 minutes
  async function waitLoading() {
    await getTruck();
   
    await delay(120000);
    for (let i = 0; i <= 5; i++) {
      setLoadingTruck((draft) => {
        const dock = draft.find((dock) => dock.id === i);
        dock.state = true;
        
        postTruck(dock);
      });
    }
  }
  //GET all Trucks
  async function getTruck() {
    TruckService.getTrucks()
      .then((result) => {
        setLoadingTruck(result.data.slice(0, 6));
        setNextTruck(result.data.slice(6, 12));
      });
  }
  //POST all Trucks
  async function postTrucks() {
    LoadingTruck.forEach((truck) => {
      postTruck(truck);
    });
    NextTruck.forEach((truck) => {
      postTruck(truck);
    });
    veilleService.Heure(Heure, Date);
  }
  //POST one Trucks
  async function postTruck(truck) {
    TruckService.postTruck(truck)
  }

  return (
    <div className="Truck">
      <h5 className="titleColumn">Camion</h5>
      <h6 className="titleColumn">Chargement</h6>
      <Form>
        <Table striped variant="dark">
          <thead>
            <tr>
              <th>Docks</th>
              <th>Référence</th>
              <th>State</th>
            </tr>
          </thead>

          {LoadingTruck.map((docks) => (
            <tbody key={docks._id} >
              <tr>
                <td className="inputDock">
                  {" "}
                  <Form.Control
                    className="Inputtruck"
                    type="number"
                    onChange={(e) => HandleToggleLoadingDock(e, docks)}
                    value={docks.dockIndex}
                  />{" "}
                </td>
                <td className="inputPlate">
                  <Form.Control
                    className="Inputtruck"
                    onChange={(e) => HandleToggleLoading(e, docks)}
                    value={docks.plate}
                  />
                </td>
                <td>{docks.state ?  <Loading plate= {docks.plate}  />  : <Come />}</td>
                <td>
                  <Button
                    className="ButtonUp"
                    onClick={() => DeleteNextTruck(docks)}
                    variant="secondary"
                  >
                    <MdOutlineDeleteOutline />
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
        <h6 className="titleColumn">Prochain</h6>
        <Table striped variant="dark">
          <thead>
            <tr>
              <th>Docks</th>
              <th>Référence</th>
              <th>State</th>
              <th></th>
            </tr>
          </thead>
          {NextTruck.map((docks) => (
            <tbody key={docks._id} >
              <tr>
                <td className="inputDock">
                  {" "}
                  <Form.Control
                    className="Inputtruck"
                    type="number"
                    onChange={(e) => HandleToggleNextDock(e, docks)}
                    value={docks.dockIndex}
                  />{" "}
                </td>
                <td className="inputPlate">
                  <Form.Control
                    className="Inputtruck"
                    onChange={(e) => HandleToggleNext(e, docks)}
                    value={docks.plate}
                  />
                </td>
                <td>{docks.plate ? <Wait /> : ""}</td>
                <td>
                  <Button
                    className="ButtonUp"
                    onClick={(e) => MoveNextToLoading(e, docks)}
                    variant="secondary"
                  >
                    <FaArrowUp />
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Form>
      <Button className="buttonActive" variant="success" onClick={postTrucks}>
        <FaSave />
      </Button>
    </div>
  );
}

export default Truck;
