import axios from "axios";
import { useEffect, useRef } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { AiOutlineCheck, AiOutlineFileAdd } from "react-icons/ai";
import { FaSave } from "react-icons/fa";
import { MdOutlineDeleteOutline, MdFileDownload } from "react-icons/md";
import { useImmer } from "use-immer";
import authService from "../../../../../services/authService";
import "../../../../../styles/App.css";

function MultiScreen({ ModeChoice, changeMode }) {
  var [State, setState] = useImmer([]);

  const dragItem = useRef();
  const dragOverItem = useRef();
  const URL_API = "http://localhost:4000";
  useEffect(() => {
    getFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getFile() {
    const data = {};
     axios.get(URL_API + "/files", JSON.stringify(data)).then((result) => {
      setState(result.data.slice(4));
    });
  }

  //////////////////DRAG AND DROP//////////////////
  function dragStart(e, position) {
    dragItem.current = position;
    
  }

  function dragEnter(e, position) {
    dragOverItem.current = position;
    
  }

  function drop(e) {
    const copyListItems = [...State];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    
    setState(copyListItems);
  }
  ////////////////////////////////////////////////

  ////////////////// FILE///////////////////
  async function NewFile() {
     axios
      .post(URL_API + "/files", {
        fileName: "file",
        duration: 1,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    getFile();
  }

  async function saveFiles(file) {
    let exception = false;
    try {
      // eslint-disable-next-line eqeqeq
      if (file.fileName != "file") {
         axios
          .post("http://localhost:4000/upload", file, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (ex) {
      console.log(ex);
      exception = true;
    } finally {
      if (!exception) {
        try {
           axios.put("http://localhost:4000/file/" + file._id, {
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

  async function saveAllFile() {
    console.log(State);
    State.forEach(async (file) => {
     /*  await axios.delete("http://localhost:4000/file/" + file._id);
      await axios.post(URL_API + "/files", {
        duration: file.duration,
        fileName: file.fileName,
        path: file.path,
        format: file.format 
      }); */

      axios.all([
        await axios.delete("http://localhost:4000/file/" + file._id), 
        await axios.post(URL_API + "/files", {
          duration: file.duration,
          fileName: file.fileName,
          path: file.path,
          format: file.format 
        })
      ])
      .then(axios.spread((data1, data2) => {
        // output of req.
        console.log('data1', data1, 'data2', data2)
      }));
      window.location.reload(false);

   /*  try {
      const res =  await axios.delete("http://localhost:4000/file/" + file._id);
      console.log(res);
    } catch (ex) {
      console.log(ex);
      
    } finally {
      try {        
        const res = await axios.post(URL_API + "/files", {
        duration: file.duration,
        fileName: file.fileName,
        path: file.path,
        format: file.format 
      });
      console.log(res);
      }catch (ex) {
        console.log(ex);
       
      }
    } */
  });
}


  async function onFileChange(value, file, index) {
   
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    const fileName = "timeScreen_" + text;
    /* const fileName = value.target.files[0].name; */

    const format = value.target.files[0].type.split("/").pop();
    if (value.target.files[0] != null) {
      if (file.fileName != "file") {
         axios
          .post(URL_API + "/delete", {
            fileName: file.fileName,
            format: file.format,
          })
          .then((res) => {
            console.log(res);
            console.log(res.data);
          });
      }
      setState((draft) => {
        const dock = draft.find((dock) => dock._id === file._id);
        dock.file = value.target.files[0];
        dock.fileName = fileName;
        dock.format = format;
        dock.user = authService.getCurrentUser().username;
        dock.path = "/media/" + fileName + "." + format;
        saveFiles(dock);
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
   
    try {
      // eslint-disable-next-line eqeqeq
      if (file.fileName != "file") {
          axios
          .post(URL_API + "/delete", {
            fileName: file.fileName,
            format: file.format,
          })
          .then((res) => {
            console.log(res);
            console.log(res.data);
          });
      }
    } catch (ex) {
      console.log(ex);
      
    } finally {
      try {
        
           axios.delete(URL_API + "/file/" + file._id).then((res) => {
            console.log(res);
            console.log(res.data);
          });
        
      } catch (ex) {
       
        console.log(ex);
      } finally {
        
         getFile();
        
      }
    }
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
              <tbody key={file._id}>
                <tr
                  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragEnd={drop}
                  key={index}
                  draggable
                >
                  <td key={index}>{file.fileName}</td>

                  {file.fileName === "écran Camion" ? (
                    <td></td>
                  ) : (
                    <td>
                      <input
                        type="file"
                        id={"file" + index}
                        onChange={(e) => onFileChange(e, file)}
                        style={{ display: "none" }}
                      />
                      <label htmlFor={"file" + index}>
                        {file.fileName == "file" ? (
                          <span className="fa fa-edit edit-icon">
                            <MdFileDownload className="downloadIcone" />
                          </span>
                        ) : (
                          <img
                            className="imgUpload"
                            alt="test"
                            src={file.path}
                          />
                        )}
                      </label>
                    </td>
                  )}

                  <td>
                    <Form.Control
                      onChange={(e) => onTimeChange(e, file)}
                      type="number"
                      value={file.duration}
                      min="1"
                    />
                  </td>

                  {file.fileName === "écran Camion" ? (
                    <td></td>
                  ) : (
                    <td>
                      {file.id === 0 ? (
                        ""
                      ) : (
                        <Button
                          onClick={() => DeleteFile(file)}
                          className="ButtonUp"
                          variant="secondary"
                        >
                          <MdOutlineDeleteOutline />
                        </Button>
                      )}
                      {/* {file.select ? (
                        <Button
                          onClick={() => handleSubmit(index, file)}
                          className="btn-large waves-effect blue-grey darken-4 waves-orange"
                        >
                          Ajouter ce média
                        </Button>
                      ) : (
                        ""
                      )} */}
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
        className="buttonActive margin50"
        variant="success"
        type="submit"
        onClick={() => changeMode("3")}
      >
        <AiOutlineCheck />
      </Button>
      <Button className="buttonActive" variant="success" onClick={saveAllFile}>
        <FaSave />
      </Button>
    </div>
  );
}

export default MultiScreen;
