import { Button, Form, Table } from "react-bootstrap";
import { useImmer } from "use-immer";
import { useRef } from "react";
import "../../../../../styles/Main.css";
import { useDrag } from "react-dnd";

function Normale({ ModeChoice,setModeChoice,board}) {
  const dragItem = useRef();
  const dragOverItem = useRef();

  var [SplitScreen, setSplitScreen] = useImmer([
    {
      id: 0,
      fileName: "file 1",
      file: "salut",
    },
    {
      id: 2,
      fileName: "file 2",
      file: "salut",
    },
    {
      id: 3,
      fileName: "file 3",
      file: "salut",
    },
  ]);

  function NewFile() {
    if (SplitScreen.length <3){
    setSplitScreen((draft) => {
      draft.push({
        id: "file_" + Math.random(),
        fileName: "new file" + Math.random(),
        file: "new file",
        Time: 1,
      });
    });}
  }

  //////////////////DRAG AND DROP//////////////////
  function dragStart(e, position) {
    dragItem.current = position;
    /* console.log(e.target.innerHTML); */
  }

  function dragEnter(e, position) {
    dragOverItem.current = position;
    /* console.log(e.target.innerHTML); */
  }

  function drop(e) {
    const copyListItems = [...SplitScreen];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setSplitScreen(copyListItems);
  }
  ////////////////////////////////////////////////

  //////////////////OPTION FILE///////////////////
  /* function NewFile() {
    setSplitScreen((draft) => {
      draft.push({
        id: "file_" + Math.random(),
        fileName: "new file" + Math.random(),
        file: "new file",
        Time: 0,
      });
    });
  } */

  function DeleteFile(e, file) {
    const id = file.id;

    setSplitScreen((draft) => {
      const file1 = draft.findIndex((file1) => file1.id === id);
      draft.splice(file1, 1);
      
    });
  }
  /////////////////////////////////////////////////
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: board.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div >
      <Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Aperçu</th>
              <th></th>
            </tr>
          </thead>
          {board &&
            board.map((file, index) => (
               <img
              ref={drag}
              src={board.url}
              width="100px"
              height="100px"
              style={{ border: isDragging ? "5px solid pink" : "0px" }}
            />
            ))}
        </Table>
      </Form>
      <Button variant="primary" type="submit" onClick={() => setModeChoice(1) }>
        Active
      </Button>
      <Button variant="primary" type="submit" onClick={() => NewFile()}>
        Ajouter Document
      </Button>
      {/* <Button variant="primary" type="submit" onClick={(e) => NewFile()}>
        Ajouter Document
      </Button> */}
    </div>
  );
}

export default Normale;
