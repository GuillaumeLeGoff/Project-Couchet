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

    fetch(
      "http://freeimage.host/api/1/upload/?key=6d207e02198a847aa98d0a2a901485a5",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
