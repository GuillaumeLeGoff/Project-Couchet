import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { FaArrowUp, FaSave } from "react-icons/fa";
import { useImmer } from "use-immer";
import "../../styles/Main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import Come from "../State/Come";
import Loading from "../State/Loading";
import Wait from "../State/Wait";
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
></link>;

function Truck() {
  const URL_API = "http://localhost:4000";
  useEffect(() => {
    getTruck();
  }, []);
  var [LoadingTruck, setLoadingTruck] = useImmer([]);
  var [NextTruck, setNextTruck] = useImmer([]);

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

  function MoveLoadingToNext(e, docks) {
    var id = docks.id;
    var id2 = docks.id;
    id2 = id2 - 6;
    setNextTruck((draft) => {
      const dock = draft.find((dock) => dock.id === id);
      dock.plate = "";
      dock.dockIndex = "";
    });

    setLoadingTruck((draft) => {
      const dock = draft.find((dock) => dock.id === id2);
      dock.plate = NextTruck[id2].plate;
      dock.dockIndex = NextTruck[id2].dockIndex;
    });
    console.log(LoadingTruck);
  }
  async function getTruck() {
    const data = {};
    await axios
      .get(URL_API + "/trucks", JSON.stringify(data))
      .then((result) => {
        setLoadingTruck(result.data.slice(0, 6));
        setNextTruck(result.data.slice(6, 12));
        console.log(result.data.slice(6, 12));
        console.log(result.data.slice(0, 6));
      });
  }
  async function postTruck() {
    LoadingTruck.forEach((truck) => {
      axios
        .put(URL_API + "/truck/" + truck._id, {
          id: truck.id,
          dockIndex: truck.dockIndex,
          plate: truck.plate,
          state: truck.state,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });
    });
    NextTruck.forEach((truck) => {
        axios
          .put(URL_API + "/truck/" + truck._id, {
            id: truck.id,
            dockIndex: truck.dockIndex,
            plate: truck.plate,
            state: truck.state,
          })
          .then((res) => {
            console.log(res);
            console.log(res.data);
          });
      });
  }

  return (
    <div className="Truck">
      <Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Docks</th>
              <th>Truck</th>
              <th>State</th>
            </tr>
          </thead>

          {LoadingTruck.map((docks) => (
            <tbody>
              <tr>
                <td>
                  {" "}
                  <Form.Control
                    className="Inputtruck"
                    onChange={(e) => HandleToggleLoadingDock(e, docks)}
                    value={docks.dockIndex}
                  />{" "}
                </td>
                <td>
                  <Form.Control
                    className="Inputtruck"
                    onChange={(e) => HandleToggleLoading(e, docks)}
                    value={docks.plate}
                  />
                </td>
                <td>{docks.state ? <Loading/> : <Come/>}</td>
              </tr>
            </tbody>
          ))}
        </Table>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Docks</th>
              <th>Truck</th>
              <th>State</th>
              <th></th>
            </tr>
          </thead>
          {NextTruck.map((docks) => (
            <tbody>
              <tr>
                <td>
                  {" "}
                  <Form.Control
                    className="Inputtruck"
                    onChange={(e) => HandleToggleNextDock(e, docks)}
                    value={docks.dockIndex}
                  />{" "}
                </td>
                <td>
                  <Form.Control
                    className="Inputtruck"
                    onChange={(e) => HandleToggleNext(e, docks)}
                    value={docks.plate}
                  />
                </td>
                <td>{docks.plate.length >0  ? <Wait/> : ''}</td>
                <td>
                  <Button
                    className="ButtonUp"
                    button
                    onClick={(e) => MoveLoadingToNext(e, docks)}
                    variant="primary"
                  >
                    <FaArrowUp />
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>

      </Form>
      <Button onClick={postTruck}>
        <FaSave />
      </Button>
    </div>
  );
}

export default Truck;
