import { useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useImmer } from "use-immer";
import { MdFileDownload } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import authService from "../../../../../services/authService";
import fileService from "../../../../../services/fileService";
import uploadService from "../../../../../services/uploadService";
import "../../../../../styles/App.css";
function Normale({ changeMode }) {
  var [State, setState] = useImmer([]);

  useEffect(() => {
    getFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getFile() {
    fileService.get().then((result) => {
      setState(result.data.slice(1, 4));
    });
  }

  async function onFileUpload(value, file) {
    if (value.target.files[0] != null) {
      var text = "";
      var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 20; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      const fileName = "splitScreen_" + text;
      const format = value.target.files[0].type.split("/").pop();
      if (file.fileName != "file") {
        uploadService.delete(file);
      }
      setState((draft) => {
        const dock = draft.find((dock) => dock._id === file._id);
        dock.name = value.target.files[0].name
        dock.file = value.target.files[0];
        dock.fileName = fileName;
        dock.format = format;
        dock.user = authService.getCurrentUser().username;
        dock.path = "/media/" + fileName + "." + format;
        /* dock.select = true; */
        saveFiles(dock);
      });
    }
    window.location.reload();
  }
  async function saveFiles(file) {
    // eslint-disable-next-line eqeqeq
    if (file.fileName != "file") {
      console.log("upload");
      uploadService.upload(file);
    }
    fileService.update(file);
  }

  return (
    <div>
      <p>format des medias: 192 x 145  </p>
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
              <tbody key={file._id}>
                <tr
                  /*  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragEnd={drop} */
                  key={file._id}
                  /* draggable */
                >
                  <td>{file.name}</td>

                  <td>
                    <input
                      type="file"
                      id={"file" + index}
                      onChange={(e) => onFileUpload(e, file)}
                      style={{ display: "none" }}
                      accept="image/*,video/*"
                    />
                    <label htmlFor={"file" + index}>
                      {file.fileName == "file" ? (
                        <span className="fa fa-edit edit-icon">
                          <MdFileDownload className="downloadIcone" />
                        </span>
                      ) : (
                        <img className="imgUpload" alt="test" src={file.path} />
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
        onClick={() => changeMode("1")}
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
