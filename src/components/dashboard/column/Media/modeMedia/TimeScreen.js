import { useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { AiOutlineCheck, AiOutlineFileAdd } from "react-icons/ai";
import { FaSave } from "react-icons/fa";
import { MdOutlineDeleteOutline, MdFileDownload } from "react-icons/md";
import { FcVideoFile } from "react-icons/fc";
import { useImmer } from "use-immer";
import authService from "../../../../../services/authService";
import fileService from "../../../../../services/fileService";
import uploadService from "../../../../../services/uploadService";
import "../../../../../styles/App.css";

function MultiScreen({ changeMode }) {
  var [State, setState] = useImmer([]);

  useEffect(() => {
    getFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getFile() {
    fileService.get().then((result) => {
      setState(result.data.slice(4));
    });
  }

  function NewFile() {
    const file = {
      fileName: "file",
      duration: 1,
    };
    fileService.post(file);
    getFile();
  }

  async function saveFiles(file) {
   
    if (file.fileName !== "file") {
      uploadService.upload(file);
    }
    fileService.update(file);
  }

  async function saveAllFile() {
    console.log(State);
    State.forEach((file) => {
      fileService.put(file);
      window.location.reload();
    });
  }

  async function onFileChange(value, file, index) {
    var text = "";
    var duration = 0;
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    const fileName = "timeScreen_" + text;
    const format = value.target.files[0].type.split("/").pop();
    if (format === "mp4") {
      const url = URL.createObjectURL(value.target.files[0]);
      const video = document.createElement("video");
      video.src = url;

      video.addEventListener("loadedmetadata", () => {
        duration = video.duration;
        duration = duration.toString().split(".");
        console.log(duration);
        if (value.target.files[0] != null) {
          if (file.fileName !== "file") {
            uploadService.delete(file);
          }
          setState((draft) => {
            console.log(duration);
            const dock = draft.find((dock) => dock._id === file._id);
            dock.file = value.target.files[0];
            dock.name = value.target.files[0].name;
            dock.fileName = fileName;
            dock.format = format;
            dock.user = authService.getCurrentUser().username;
            dock.path = "/media/" + fileName + "." + format;
            dock.duration = duration[0];
            saveFiles(dock);
          });
        }
      });
    } else {
      if (value.target.files[0] != null) {
        if (file.fileName !== "file") {
          uploadService.delete(file);
        }
        setState((draft) => {
          console.log(duration);
          const dock = draft.find((dock) => dock._id === file._id);
          dock.file = value.target.files[0];
          dock.name = value.target.files[0].name;
          dock.fileName = fileName;
          dock.format = format;
          dock.user = authService.getCurrentUser().username;
          dock.path = "/media/" + fileName + "." + format;
          dock.duration = duration[0];
          saveFiles(dock);
        });
      }
    }
  }

  function onTimeChange(value, file) {
    setState((draft) => {
      const dock = draft.find((dock) => dock._id === file._id);
      dock.duration = value.target.valueAsNumber;
    });
  }

  async function DeleteFile(file) {
    // eslint-disable-next-line eqeqeq
    if (file.fileName != "file") {
      uploadService.delete(file);
    }
    fileService.delete(file);
    getFile();
    window.location.reload();
  }

  return (
    <div>
      <p>format des medias: 192 x 433 </p>
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
                <tr key={index}>
                  {file.fileName === "écran Camion" ? (
                    <td key={index}>
                      <strong>Écran Camion</strong>
                    </td>
                  ) : (
                    <td key={index}>{file.name}</td>
                  )}

                  {file.fileName === "écran Camion" ? (
                    <td></td>
                  ) : (
                    <td>
                      
                      <input
                        type="file"
                        id={"file" + index}
                        onChange={(e) => onFileChange(e, file)}
                        style={{ display: "none" }}
                        accept="image/*,video/*"
                      />
                      <label htmlFor={"file" + index}>
                        {file.fileName === "file" ? (
                          <span className="fa fa-edit edit-icon">
                            <MdFileDownload className="downloadIcone" />
                          </span>
                        ) : (
                          <div>
                            {file.format === "mp4" ? (
                              <FcVideoFile className="downloadIcone" />
                            ) : (
                              <img
                                className="imgUpload"
                                alt="test"
                                src={file.path}
                              />
                            )}
                          </div>
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
