
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import '../../styles/Main.css'

import Nav from 'react-bootstrap/Nav';
import SplitScreen from '../modeScreen/SplitScreen';
import TimeScreen from '../modeScreen/TimeScreen';
import FullScreen from '../modeScreen/FullScreen';

function Media() {
    const [option, setOption] = useState(<SplitScreen />);

    function nav(nombre) {
        console.log(nombre)
        if (nombre === 1) {
            setOption(<SplitScreen />)
            console.log(option)
        }

        if (nombre === 2) {
            setOption(<FullScreen />)
            console.log(option)
        }

        if (nombre === 3) {
            setOption(<TimeScreen />)
            console.log(option)
        }
    }




    return (
        <div className="Media">
            <Nav fill defaultActiveKey="1">
                <Nav.Item>
                    <Nav.Link eventKey="1" onClick={() => nav(1)}>Split Screen</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="2" onClick={() => nav(2)} >Full Screen</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="3" onClick={() => nav(3)}>Time Screen</Nav.Link>
                </Nav.Item>
            </Nav>

            {option}

        </div>

    );
}

export default Media;