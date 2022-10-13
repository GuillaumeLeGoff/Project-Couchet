import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";

function FullScreen({ ModeChoice,setModeChoice}) {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  

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
