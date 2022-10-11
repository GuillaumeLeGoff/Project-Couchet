import Truck from './column/Truck';
import Media from './column/Media';
import Header from './Header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Login from './Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css';
import { useState } from 'react';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function childToParent(childdata){
    setIsLoggedIn(childdata);
    console.log(isLoggedIn);
  }
  return (
    
    <div className="App">
      <Header  childToParent={childToParent}/>
      {/* <div className="Body"> */}
        {isLoggedIn ? <Login className="Column"/> : <Row>
          <Col sm={3} className="Column"><Truck  /></Col>
          <Col sm={4}className="Column">Screen</Col>
          <Col className="Column" ><Media  /></Col>
        </Row>}
       
      {/* </div> */}
      {/* <Footer/> */}
    </div>
  );
}

export default App;
