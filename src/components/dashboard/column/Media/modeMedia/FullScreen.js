import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";

function FullScreen({ ModeChoice,setModeChoice}) {
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

  function test() {
    setModeChoice(1);
    console.log(ModeChoice);
  }
  return (
    <div>
      <Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Aperçu</th>
              <th></th>
            </tr>
          </thead>
          
              <tbody>
                <tr>
                  <td> </td>
                  <td>
                    {" "}
                    <Form.Control type="file" name="file" />{" "}
                  </td>
                  <td>
                    <Button >X</Button>
                  </td>
                </tr>
              </tbody>
        </Table>
      </Form>
      <Button variant="primary" type="submit" onClick={() => setModeChoice(2) }>
        Active
      </Button>
    </div>
  );
}

export default FullScreen;
