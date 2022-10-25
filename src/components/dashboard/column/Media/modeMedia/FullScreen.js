import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import axios from "axios";
import authService from "../../../../../services/authService";
import { useImmer } from "use-immer";


function FullScreen({ ModeChoice, setModeChoice }) {
  var [State, setState] = useImmer([]);
  const URL_API = "http://localhost:4000";

  useEffect(() => {
     getTruck();
  }, []);

  async function getTruck() {
    const data = {};
    await axios
      .get(URL_API + "/files", JSON.stringify(data))
      .then((result) => {
        console.log(result.data.slice(0, 1));
        setState(result.data.slice(0, 1));
        console.log(State);
  
      });
  }

  function onFileUpload(value) {
    const fileName = value.target.files[0].name;
    const format = value.target.files[0].type.split("/").pop();
    setState({
      file: value.target.files[0],
      fileName: fileName,
      format: format,
      user: authService.getCurrentUser().username,
      path: "../../../../../../public/media/" + fileName + "." + format,
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
          const res = await axios.post("http://localhost:4000/files", State);
          console.log(res);
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
                <label for="file-input">
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
                
                {/* {State.map((docks) => ( {docks ==  ? option 1 : option 1}<img src={docks.path} alt="media"></img>))} */}
                
                
                
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
