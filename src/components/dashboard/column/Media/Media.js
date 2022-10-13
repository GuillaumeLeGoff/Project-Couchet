import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";
import "../../../../styles/Main.css";

import Nav from "react-bootstrap/Nav";
import SplitScreen from "./modeMedia/SplitScreen";
import TimeScreen from "./modeMedia/TimeScreen";
import FullScreen from "./modeMedia/FullScreen";
import { useImmer } from "use-immer";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, Form, Table } from "react-bootstrap";

function Media() {
  const [ModeChoice, setModeChoice] = useState(0);
  const [NavMode, setNavMode] = useState(
    <SplitScreen ModeChoice={ModeChoice} setModeChoice={setModeChoice} />
  );
  var [media, updateMedia] = useImmer([
    {
      id: "Media 1",
      name: "Media 1",
      thumb: "/images/gary.png",
    },
    {
      id: "Media 2",
      name: "Media 2",
      thumb: "/images/cato.png",
    },
    {
      id: "Media 3",
      name: "Media 3",
      thumb: "/images/kvn.png",
    },
    {
      id: "Media 4",
      name: "Media 5",
      thumb: "/images/mooncake.png",
    },
  ]);

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
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(media);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateMedia(items);
  }

  return (
    <div className="Media">
      <Nav fill variant="tabs">
        <Nav.Item>
          <Nav.Link eventKey="1" onClick={() => nav(1)}>
            {" "}
            {ModeChoice === 1 ? (
              <strong className="ModeChoice">3 Images</strong>
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
      {NavMode}
      <br />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {media.map(({ id, name, thumb }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {/* <div className="characters-thumb">
                          <img src={thumb} alt={`${name} Thumb`} />
                        </div> */}
                        <p>{name}</p>
                        <Button variant="outline-dark">X</Button>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <Form>
        <Form.Group controlId="formFileSm" className="mb-3">
          <Form.Label>Add file</Form.Label>
          <Form.Control type="file" size="sm" />
          <br />
          <Form.Control size="sm" type="text" placeholder="File name" />
          <br />
          <Button variant="primary" type="submit" >Add</Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Media;
