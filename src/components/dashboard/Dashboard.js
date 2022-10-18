import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import Truck from "./column/trcuck/Truck";
import Media from "./column/Media/Media";
import Screen from "./column/Screen";
import "../../styles/App.css";
import "../../styles/Main.css";

function Dashboard() {
  return (
    <div>
      <Row >
        <Col className="Column" sm={3}>
          <Truck />
        </Col>
        <Col className="Column" sm={4}><Screen/></Col>
        <Col className="Column">
          <Media />
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
