import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "../../../../styles/Main.css";
import Picture from "./picture";
import Nav from "react-bootstrap/Nav";
import SplitScreen from "./modeMedia/SplitScreen";
import TimeScreen from "./modeMedia/TimeScreen";
import { useDrop } from "react-dnd";
import FullScreen from "./modeMedia/FullScreen";
import { useImmer } from "use-immer";




function Media() {
  const [ModeChoice, setModeChoice] = useState(0);
  const [NavMode, setNavMode] = useState(
    <SplitScreen ModeChoice={ModeChoice} setModeChoice={setModeChoice} />
  );
    var [PictureList, setPictureList] = useImmer([
    {
      id: 1,
      url: "https://yt3.ggpht.com/ytc/AAUvwnjOQiXUsXYMs8lwrd4litEEqXry1-atqJavJJ09=s900-c-k-c0x00ffffff-no-rj",
      name: "media1",
    },
    {
      id: 2,
      url: "https://images.pexels.com/photos/4603884/pexels-photo-4603884.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      name: "media2",
    },
    {
      id: 3,
      url: "https://images.pexels.com/photos/4603884/pexels-photo-4603884.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      name: "media3",
    },
  ]); 
  const [board, setBoard] = useState([]);
  const [board2, setBoard2] = useState([]);

  const [{ isOver2 }, drop2] = useDrop(() => ({
    accept: "image",
    drop2: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  
  const addImageToBoard = (id) => {
    const pictureList = PictureList.filter((picture) => id === picture.id);
    setBoard((board) => [...board, pictureList[0]]);
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard2(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const addImageToBoard2 = (id) => {
    const pictureList = PictureList.filter((picture) => id === picture.id);
    setBoard2((board) => [...board, pictureList[0]]);
  };
   

  
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
    <div>
      <Nav fill variant="tabs">
        <Nav.Item>
          <Nav.Link eventKey="1" onClick={() => nav(1)}>
            {" "}
            {ModeChoice === 1 ? (
              <strong className="ModeChoice">écran diviser</strong>
            ) : (
              "3 Images"
            )}
          </Nav.Link>
        </Nav.Item>
        {/*  <Nav.Item>
          <Nav.Link eventKey="2" onClick={() => nav(2)}>
            {ModeChoice === 2 ? (
              <strong className="ModeChoice">1 Image</strong>
            ) : (
              "1 Image"
            )}
          </Nav.Link>
        </Nav.Item> */}
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
      {/* {NavMode} */}
      <div className="Board" ref={drop}>
          {board.map((picture) => {
            return <Picture url={picture.url} id={picture.id} />;
          })}
        </div>
        <div className="Board" ref={drop2}>
          {board2.map((picture) => {
            return <Picture url={picture.url} id={picture.id} />;
          })}
        </div>
        
      
        <div className="Pictures">
          {PictureList.map((picture) => {
            return <Picture url={picture.url} id={picture.id} />;
          })}
        </div>
        
      
    </div>
  );
}

export default Media;
