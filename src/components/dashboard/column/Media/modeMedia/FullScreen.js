import React,{ useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { MdFileDownload } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import authService from "../../../../../services/authService";
import fileService from "../../../../../services/fileService";
import uploadService from "../../../../../services/uploadService";
import { FcVideoFile } from "react-icons/fc";

import { useImmer } from "use-immer";

function FullScreen({ changeMode }) {
  var [State, setState] = useImmer([]);
  useEffect(() => {
    getFile();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function getFile() {
    fileService.get().then((result) => {
      setState(result.data.slice(0, 1));
    });
  }

  async function onFileUpload(value, file) {
    //Nom fichier aléatoire
    if (value.target.files[0] != null) {
      var text = "";
      var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 20; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      const fileName = "fullScreen_" + text;
      const format = value.target.files[0].type.split("/").pop();
      if (file.fileName !== "file") {
        uploadService.delete(file);
      }
      setState((draft) => {
        const dock = draft.find((dock) => dock.id === file.id);
        dock.name = value.target.files[0].name;
        dock.file = value.target.files[0];
        dock.fileName = fileName;
        dock.format = format;
        dock.user = authService.getCurrentUser().username;
        dock.path = "/media/" + fileName + "." + format;
        saveFiles(dock);
      });
    }
    await sleep(1000);
    window.location.reload();
  }
  
  async function saveFiles(file) {
    // eslint-disable-next-line eqeqeq
    if (file.fileName != "file") {
      uploadService.upload(file);
    }
    fileService.update(file);
  }

  return (
    <div>
      <p>format du media: 192 x 433 </p>
      <Form>
        <Table striped>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Overview</th>
            </tr>
          </thead>
          <tbody>
            {State.map((file, index) => (
              <tr key={file._id}>
                <td>
                  <p key={index}>{file.name}</p>
                </td>
                <td>
                  <input
                    type="file"
                    id={"file" + index}
                    onChange={(e) => onFileUpload(e, file)}
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
              </tr>
            ))}
          </tbody>
        </Table>
      </Form>
      <Button
        className="buttonActive margin50"
        variant="success"
        onClick={() => changeMode("2")}
      >
        <AiOutlineCheck />
      </Button>
    </div>
  );
}

export default FullScreen;
