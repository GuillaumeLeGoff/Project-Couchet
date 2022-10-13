import { Button, Form, Table } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { useImmer } from "use-immer";
import { useRef } from "react";
function MultiScreen({ ModeChoice, setModeChoice }) {
  const dragItem = useRef();
  const dragOverItem = useRef();
  ///////////////////////DATA//////////////////////
  var [MultiScreen, setMultiScreen] = useImmer([
    {
      id: 0,
      fileName: "écran camion",
      file: "salut",
      Time: 4,
    },
  ]);
  /////////////////////////////////////////////////

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
    const copyListItems = [...MultiScreen];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setMultiScreen(copyListItems);
  }
  ////////////////////////////////////////////////

  //////////////////OPTION FILE///////////////////
  function NewFile() {
    setMultiScreen((draft) => {
      draft.push({
        id: "file_" + Math.random(),
        fileName: "new file" + Math.random(),
        file: "new file",
        Time: 1,
      });
    });
  }

  function DeleteFile(e, file) {
    const id = file.id;

    setMultiScreen((draft) => {
      const file1 = draft.findIndex((file1) => file1.id === id);
      draft.splice(file1, 1);
    });
  }

  function HandleToggleTime(e, file) {
    const id = file.id;
    setMultiScreen((draft) => {
      const files = draft.find((files) => files.id === id);
      files.Time = e.target.value;
    });
    console.log(file);
  }
  /////////////////////////////////////////////////

  return (
    <div>
      <Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Aperçu</th>
              <th>Durée</th>
              <th></th>
            </tr>
          </thead>
          {MultiScreen &&
            MultiScreen.map((file, index) => (
              <tbody>
                <tr
                  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragEnd={drop}
                  key={index}
                  draggable
                >
                  <td key={file.id}>{file.fileName}</td>
                  <td>
                    {" "}
                    <Form.Control type="file" name="file" />{" "}
                  </td>
                  <td>
                    <Form.Control
                      onChange={(e) => HandleToggleTime(e, file)}
                      type="number"
                      value={file.Time}
                      min="1"
                    />
                  </td>
                  <td>
                    <Button onClick={(e) => DeleteFile(e, file)}>X</Button>
                  </td>
                </tr>
              </tbody>
            ))}
        </Table>
      </Form>
      <Button variant="primary" type="submit" onClick={(e) => NewFile()}>
        Ajouter Document
      </Button>
      <Button variant="primary" type="submit" onClick={() => setModeChoice(3)}>
        Active
      </Button>
    </div>
  );
}

export default MultiScreen;
