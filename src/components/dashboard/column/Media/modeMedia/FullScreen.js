import { useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import axios from "axios";
import authService from "../../../../../services/authService";
import { useImmer } from "use-immer";

/* var bcrypt = require("bcryptjs"); */
function FullScreen({ ModeChoice, setModeChoice }) {
  var [State, setState] = useImmer([]);
  var [Id, setId] = useImmer([]);
  const URL_API = "http://localhost:4000";

  useEffect(() => {
    getFile();
  }, []);

  async function getFile() {
    const data = {};
    await axios.get(URL_API + "/files", JSON.stringify(data)).then((result) => {
      console.log(result.data.slice(0, 1));
      setState(result.data.slice(0, 1));
      setId(result.data[0]._id);
    });
  }

  function onFileUpload(value) {
    const fileName = value.target.files[0].name;
    const format = value.target.files[0].type.split("/").pop();

    setState((draft) => {
      const dock = draft.find((dock) => dock.id === 0);
      dock.file = value.target.files[0];
      dock.fileName = fileName;
      dock.format = format;
      dock.user = authService.getCurrentUser().username;
      dock.path = "../../../../../../../public/media/" + fileName;
    });
    
  }
  async function handleSubmit() {
    let exception = false;
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
          await axios.put("http://localhost:4000/file/" + Id, {
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
              <th>Overview</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="image-upload">
                <label>
                  <label></label>
                  {/* <IconContext.Provider value={{ size: "3em", className: "global-class-name" }}>
                    <AiOutlineFileAdd />
                  </IconContext.Provider> */}
                </label>

                <input
                  id="file-input"
                  type="file"
                  onChange={(e) => onFileUpload(e)}
                />
                
                {State.map((docks , index) => (
                  <div>
                    <p  key={index} >{docks.fileName}</p>

                  </div>
                ))}
              </td>
              <td>
                <Button className="ButtonUp" variant="secondary">
                  <MdOutlineDeleteOutline value={{ color: "blue" }} />
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Form>
      <Button
        className="buttonActive"
        variant="success"
        onClick={() => setModeChoice(1)}
      >
        <AiOutlineCheck />
      </Button>
      <Button
        onClick={() => handleSubmit()}
        className="btn-large waves-effect blue-grey darken-4 waves-orange"
      >
        {" "}
        Ajouter ce média
      </Button>
    </div>
  );
}

export default FullScreen;
