import { Button, Form, Table } from "react-bootstrap";
import { useImmer } from "use-immer";
/* import { useRef } from "react"; */
import { AiOutlineCheck, AiOutlineFileAdd } from "react-icons/ai";
import { useEffect } from "react";
import axios from "axios";
import authService from "../../../../../services/authService";
function MultiScreen({ ModeChoice, setModeChoice }) {
  var [State, setState] = useImmer([]);
  var [Id, setId] = useImmer([]);
  /* const dragItem = useRef();
  const dragOverItem = useRef(); */
  const URL_API = "http://localhost:4000";
  useEffect(() => {
    getFile();
  }, []);

  async function getFile() {
    const data = {};
    await axios.get(URL_API + "/files", JSON.stringify(data)).then((result) => {
      console.log(result.data.slice(4));
      setState(result.data.slice(4));
      setId(result.data[0]._id);
      /* State.forEach((file,index) => {
        setState((draft) => {
          const dock = draft.find((dock) => dock._id === Id[index+5]._id);
          dock.id= index+5;
        });  
      }); */
    });
    console.log(State);
  }

  //////////////////DRAG AND DROP//////////////////
  /* function dragStart(e, position) {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  }

  function dragEnter(e, position) {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  }

  function drop(e) {
    const copyListItems = [...MultiScreen];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setMultiScreen(copyListItems);
  } */
  ////////////////////////////////////////////////

  //////////////////OPTION FILE///////////////////
  async function NewFile() {
    await axios
      .post(URL_API + "/files", {
        fileName: "file",
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    getFile();
  }
  async function handleSubmit(index, file) {
    console.log(file);
    setState((draft) => {
      const dock = draft.find((dock) => dock._id === file._id);
      dock.select = false;
    });
    let exception = false;
    try {
      await axios
        .post("http://localhost:4000/upload", file, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (ex) {
      console.log(ex);
      exception = true;
    } finally {
      if (!exception) {
        try {
          await axios.put("http://localhost:4000/file/" + file._id, {
            fileName: file.fileName,
            format: file.format,
            path: file.path,
            duration: file.duration,
          });
        } catch (ex) {
          console.log(ex);
        }
      }
    }
  }

  function onFileChange(value, file) {
    const fileName = value.target.files[0].name;
    const format = value.target.files[0].type.split("/").pop();
    if (value.target.files[0] != null) {
      setState((draft) => {
        const dock = draft.find((dock) => dock._id === file._id);
        dock.file = value.target.files[0];
        dock.fileName = fileName;
        dock.format = format;
        dock.user = authService.getCurrentUser().username;
        dock.path = "../../../../../../../public/media/" + fileName;
        dock.select = true;
      });
    }
  }
  function onTimeChange(value, file) {
       setState((draft) => {
        const dock = draft.find((dock) => dock._id === file._id);
        dock.duration = value.target.valueAsNumber;
      });
    
  }
  async function DeleteFile(file) {
    await axios.delete(URL_API + "/file/" + file._id).then((res) => {
      console.log(res);
      console.log(res.data);
    });
    getFile();
  }

  /////////////////////////////////////////////////

  return (
    <div>
      <Form>
        <Table striped>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Aperçu</th>
              <th>Durée (sc)</th>
              <th></th>
            </tr>
          </thead>
          {State &&
            State.map((file, index) => (
              <tbody>
                <tr
                  /*   onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragEnd={drop} */
                  key={index}
                  draggable
                >
                  <td key={index}>{file.fileName}</td>

                  {file.id === 4 ? (
                    <td></td>
                  ) : (
                    <td>
                      <Form.Control
                        onChange={(e) => onFileChange(e, file)}
                        type="file"
                        name="file"
                      />
                    </td>
                  )}
                  {file.id === 4 ? (
                    <td></td>
                  ) : (
                    <td>
                      <Form.Control
                        onChange={(e) => onTimeChange(e, file)}
                        type="number"
                        value={file.duration}
                        min="1"
                      />
                    </td>
                  )}
                  {file.id === 4 ? (
                    <td></td>
                  ) : (
                    <td>
                      {file.id === 0 ? (
                        ""
                      ) : (
                        <Button onClick={() => DeleteFile(file)}>X</Button>
                      )}
                      {file.select ? (
                        <Button
                          onClick={() => handleSubmit(index, file)}
                          className="btn-large waves-effect blue-grey darken-4 waves-orange"
                        >
                          Ajouter ce média
                        </Button>
                      ) : (
                        ""
                      )}
                    </td>
                  )}
                </tr>
              </tbody>
            ))}
        </Table>
      </Form>
      <Button
        className="buttonActive margin50"
        variant="success"
        type="submit"
        onClick={() => NewFile()}
      >
        <AiOutlineFileAdd />
      </Button>
      <Button
        className="buttonActive"
        variant="success"
        type="submit"
        onClick={() => setModeChoice(1)}
      >
        <AiOutlineCheck />
      </Button>
    </div>
  );
}

export default MultiScreen;
