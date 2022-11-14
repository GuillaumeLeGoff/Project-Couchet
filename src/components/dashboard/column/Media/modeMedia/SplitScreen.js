import { useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useImmer } from "use-immer";
import { MdFileDownload } from "react-icons/md";
import axios from "axios";
import { AiOutlineCheck } from "react-icons/ai";
import authService from "../../../../../services/authService";
import "../../../../../styles/App.css";
function Normale({ ModeChoice, changeMode }) {
  const URL_API = "http://localhost:4000";
  var [State, setState] = useImmer([]);

  useEffect(() => {
    getFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getFile() {
    const data = {};
    await axios.get(URL_API + "/files", JSON.stringify(data)).then((result) => {
      setState(result.data.slice(1, 4));
    });
  }

  /*  function DeleteFile(e, file) {
     const id = file.id;

    setState((draft) => {
      const file1 = draft.findIndex((file1) => file1.id === id);
    });
  } */
   function onFileUpload(value, file) {
    if (value.target.files[0] != null) {
      var text = "";
      var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 20; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      const fileName = "splitScreen_" + text;
      const format = value.target.files[0].type.split("/").pop();
       axios
        .post(URL_API + "/delete", {
          fileName: file.fileName,
          format: file.format,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });
      setState((draft) => {
        const dock = draft.find((dock) => dock._id === file._id);
        dock.file = value.target.files[0];
        dock.fileName = fileName;
        dock.format = format;
        dock.user = authService.getCurrentUser().username;
        dock.path = "/media/" + fileName + "." + format;
        /* dock.select = true; */
        saveFiles(dock);
      });
    }
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
              <tbody  key={file._id}>
                <tr
                  /*  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragEnd={drop} */
                  key={file._id}
                  /* draggable */
                >
                  <td>{file.fileName}</td>

                  <td>
                    <input
                      type="file"
                      id={"file" + index}
                      onChange={(e) => onFileUpload(e, file)}
                      style={{ display: "none" }}
                    />
                    <label htmlFor={"file" + index}>
                      {file.fileName == "file" ? (
                        <span className="fa fa-edit edit-icon">
                          <MdFileDownload className="downloadIcone" />
                        </span>
                      ) : (
                        <img   className="imgUpload" alt="test" src={file.path} />
                      )}
                    </label>
                  </td>
                  <td>
                    {/*  <Button
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
                    </Button> : ""} */}
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
        onClick={() => changeMode("1", ModeChoice)}
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
