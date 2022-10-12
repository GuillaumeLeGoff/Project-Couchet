import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function FullScreen() {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };
  const handleSubmission = () => {
    const formData = new FormData();

    formData.append("File", selectedFile);

    /* axios
    .put(URL_API + "/truck/" + truck._id, {
      id: truck.id,
      dockIndex: truck.dockIndex,
      plate: truck.plate,
      state: truck.state,
    })
    .then((res) => {
      console.log(res);
      console.log(res.data);
    }); */
  };
  return (
    <div>
      <Form.Control type="file" name="file" onChange={changeHandler} />
      {isSelected ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>
            lastModifiedDate:{" "}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <Button variant="primary" type="submit" onClick={handleSubmission}>
        Submit
      </Button>
    </div>
  );
}

export default FullScreen;
