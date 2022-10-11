

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { FaArrowUp } from "react-icons/fa";
import { useImmer } from "use-immer";
import '../../styles/Main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { } from 'react';
import Come from '../State/Come';
import Loading from '../State/Loading';
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"></link>



function Truck() {

    var [LoadingTruck, setLoadingTruck] = useImmer([
        {
            id: 0,
            dock: 13,
            dockvalue: "",
            state: '',
        },
        {
            id: 1,
            dock: 14,
            dockvalue: '',
            state: '',
            value: false
        },
        {
            id: 2,
            dock: 15,
            dockvalue: '',
            state: '',
        }
        ,
        {
            id: 3,
            dock: 16,
            dockvalue: '',
            state: '',
        }
        ,
        {
            id: 4,
            dock: 17,
            dockvalue: '',
            state: '',
        }
        ,
        {
            id: 5,
            dock: 18,
            dockvalue: '',
            state: '',
        }
    ]);
    var [NextTruck, setNextTruck] = useImmer([
        {
            id: 0,
            dock: 13,
            dockvalue: "",
            state: '',
        },
        {
            id: 1,
            dock: 14,
            dockvalue: '',
            state: '',
        },
        {
            id: 2,
            dock: 15,
            dockvalue: '',
            state: '',
        }
        ,
        {
            id: 3,
            dock: 16,
            dockvalue: '',
            state: '',
        }
        ,
        {
            id: 4,
            dock: 17,
            dockvalue: '',
            state: '',
        }
        ,
        {
            id: 5,
            dock: 18,
            dockvalue: '',
            state: '',
        }
    ]);

    function HandleToggleNext(e, docks) {
        const id = docks.id
        setNextTruck((draft) => {
            const dock = draft.find((dock) => dock.id === id);
            dock.dockvalue = e.target.value;
        });
    }

    function HandleToggleLoading(e, docks) {
        const id = docks.id
        setLoadingTruck((draft) => {
            const dock = draft.find((dock) => dock.id === id);
            dock.dockvalue = e.target.value;
        });
    }

    function MoveLoadingToNext(e, docks) {
        const id = docks.id
        setLoadingTruck((draft) => {
            const dock = draft.find((dock) => dock.id === id);
            dock.dockvalue = NextTruck[id].dockvalue;
            dock.state = <Come />;

            setTimeout(() => {
                console.log('you can see me after 2 seconds')
            }, 2000);
            dock.state = <Loading />;

        });

        setNextTruck((draft) => {
            const dock = draft.find((dock) => dock.id === id);
            dock.dockvalue = "";
            dock.state = "";
        });
    }

    const submitUser = async (e) => {
        e.preventDefault();
        const userdata = {
        };
        await axios
            .post(
                "",
                JSON.stringify(userdata)
            )
            .then((result) => {
                console.log(result.data);
                console.log(result.data.msg);
            });
    }

    // Third Attempts



    /* const [post, setPost] = React.useState(null); */

    /* React.useEffect(() => {
        axios.get("http://localhost/devopsdeveloper/user/adduser").then((response) => {
            setPost(response.data);
        });
    }, []);  */


    return (

        <div className="Truck">
            <Form onSubmit={submitUser}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Docks</th>
                            <th>Truck</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    {LoadingTruck.map(docks => (
                        <tbody>
                            <tr>
                                <td key={docks.dock}>{docks.dock}</td>
                                <td><Form.Control className="Inputtruck" onChange={(e) => HandleToggleLoading(e, docks)} value={docks.dockvalue} /></td>
                                <td>{docks.state}</td>
                            </tr>
                        </tbody>
                    ))}
                </Table>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Docks</th>
                            <th>Truck</th>
                            <th>State</th>
                            <th></th>
                        </tr>
                    </thead>
                    {NextTruck.map(docks => (
                        <tbody>
                            <tr>
                                <td key={docks.id}>{docks.dock}</td>
                                <td><Form.Control className="Inputtruck" onChange={(e) => HandleToggleNext(e, docks)} value={docks.dockvalue} /></td>
                                <td>{docks.state}</td>
                                <td><Button className="ButtonUp" button onClick={(e) => MoveLoadingToNext(e, docks)} variant="primary" disabled><FaArrowUp /></Button></td>

                            </tr>
                        </tbody>
                    ))}
                </Table>
            </Form>



        </div>
    );
}

export default Truck;
