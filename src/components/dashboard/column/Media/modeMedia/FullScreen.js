import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
function FullScreen({ ModeChoice, setModeChoice }) {
  
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

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

          <tbody>
            <tr>
              <td> </td>
              <td>
                {" "}
                <Form.Control type="file" name="file" />{" "}
              </td>
              <td>
              <Button
                    className="ButtonUp"
                    variant="secondary"
                  >
                    <MdOutlineDeleteOutline />
                  </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Form>
      <Button className="buttonActive" variant="success" type="submit" onClick={() => setModeChoice(1)}>
        <AiOutlineCheck/>
      </Button>
    </div>
  );
}

export default FullScreen;
