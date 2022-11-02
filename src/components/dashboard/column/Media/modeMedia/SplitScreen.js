import { Button, Form, Table } from "react-bootstrap";
import { useImmer } from "use-immer";
import { useEffect } from "react";

import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import authService from "../../../../../services/authService";
import axios from "axios";
function Normale({ ModeChoice, setModeChoice }) {
  const URL_API = "http://localhost:4000";
  var [State, setState] = useImmer([]);
  var [Id, setId] = useImmer([]);
  const fichier1 = false
  const fichier2 = false
  const fichier3 = false

  useEffect(() => {
    getFile();
  }, []);

  async function getFile() {
    const data = {};
    await axios.get(URL_API + "/files", JSON.stringify(data)).then((result) => {
      setState(result.data.slice(1, 4));
      setId(result.data);
    });
  }

  function DeleteFile(e, file) {
    const id = file.id;

    setState((draft) => {
      const file1 = draft.findIndex((file1) => file1.id === id);
    });
  }
  function onFileUpload(value, index) {
    if (value.target.files[0] != null) {
     
      const fileName = value.target.files[0].name;
      const format = value.target.files[0].type.split("/").pop();

      setState((draft) => {
        const dock = draft.find((dock) => dock.id === index + 1);
        dock.file = value.target.files[0];
        dock.fileName = fileName;
        dock.format = format;
        dock.user = authService.getCurrentUser().username;
        dock.path = "../../../../../../../public/media/" + fileName;
        dock.select = true;
        
      });
    }
  }
  async function handleSubmit(index) {
    let exception = false;
    console.log(Id[index+1]);
    setState((draft) => {
      const dock = draft.find((dock) => dock.id === index + 1);
      dock.select = false;
      
    }); 
    try {
      await axios
        .post("http://localhost:4000/upload", State, {
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
          await axios.put("http://localhost:4000/file/" + Id[index+1]._id, {
            id: State[0].id,
            fileName: State[0].fileName,
            format: State[0].format,
            path: State[0].path,
          });
        } catch (ex) {
          console.log(ex);
        }
      }
    }
  }

  return (
    <div>
      <Form>
        <Table striped>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Aperçu</th>
              <th></th>
            </tr>
          </thead>
          {State &&
            State.map((file, index) => (
              <tbody>
                <tr
                  /*  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragEnd={drop} */
                  key={index}
                  draggable
                >
                  <td key={file.id}>{file.fileName}</td>
                  <td>
                    <Form.Control
                      onChange={(e) => onFileUpload(e, index)}
                      type="file"
                      name="file"
                    />
                  </td>
                  <td>
                    <Button
                      className="ButtonUp"
                      variant="secondary"
                      onClick={(e) => DeleteFile(e, file)}
                    >
                      <MdOutlineDeleteOutline />
                    </Button>
                    {file.select ? <Button
                      onClick={() => handleSubmit(index)}
                      className="btn-large waves-effect blue-grey darken-4 waves-orange"
                    >
                      Ajouter ce média
                    </Button> : ""}
                    
                  </td>
                </tr>
              </tbody>
            ))}
        </Table>
      </Form>
      <Button
        className="buttonActive"
        variant="success"
        type="submit"
        onClick={() => setModeChoice(1)}
      >
        <AiOutlineCheck />
      </Button>
      {/* <Button variant="primary" type="submit" onClick={(e) => NewFile()}>
        Ajouter Document
      </Button> */}
    </div>
  );
}

export default Normale;
