import { Button, Form, Table } from 'react-bootstrap';
import { useImmer } from 'use-immer';
import { useRef } from "react";
import { FaSave } from 'react-icons/fa';
function Normale() {

    const dragItem = useRef();
    const dragOverItem = useRef();

    var [SplitScreen, setSplitScreen] = useImmer([
        {
            id: 0,
            fileName: "file test",
            file: "salut",
        },
    ]);

    //////////////////DRAG AND DROP//////////////////
    function dragStart(e, position) {
        dragItem.current = position;
        /* console.log(e.target.innerHTML); */
    };

    function dragEnter(e, position) {
        dragOverItem.current = position;
        /* console.log(e.target.innerHTML); */
    };

    function drop(e) {
        const copyListItems = [...SplitScreen];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setSplitScreen(copyListItems);
    };
    ////////////////////////////////////////////////

     //////////////////OPTION FILE///////////////////
     function NewFile() {
        setSplitScreen((draft) => {
            draft.push({
                id: "file_" + Math.random(),
                fileName: "new file" + Math.random(),
                file: "new file",
                Time: 0,
            })
        })
    }

    function DeleteFile(e, file) {
        const id = file.id

        setSplitScreen((draft) => {
            const file1 = draft.findIndex((file1) => file1.id === id);
            draft.splice(file1, 1);
        })
    }
    /////////////////////////////////////////////////
    
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
                    {SplitScreen &&
                        SplitScreen.map((file, index) => (
                            <tbody>
                                <tr onDragStart={(e) => dragStart(e, index)}
                                    onDragEnter={(e) => dragEnter(e, index)}
                                    onDragEnd={drop}
                                    key={index}
                                    draggable>
                                    <td key={file.id}>{file.fileName}</td>
                                    <td> <Form.Control type="file" name="file" /> </td>
                                    <td><Button onClick={(e) => DeleteFile(e, file)}>X</Button></td>
                                </tr>
                            </tbody>
                        ))}
                </Table>
            </Form>
            <Button variant="primary" type="submit" onClick={(e) => NewFile()}>Ajouter Document</Button>
            <Button className='FullScreenSave' variant="primary" type="submit" ><FaSave /></Button>
        </div>
    );
}

export default Normale;