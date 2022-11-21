import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Main.css";
import ModeService from "../services/modeService"
import Button from "react-bootstrap/Button";
import { BiLogOut } from "react-icons/bi";
import {
  MDBContainer,
  MDBNavbar,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import AuthService from "../services/authService";
import logo from "../assets/Logo_JDE.png";

function Header({ token }) {
  function logOut() {
    ModeService.choiceMode(0);
    AuthService.logout();
    window.location.reload();
  }
  return (
    <MDBNavbar className="header">
      <MDBContainer className="headerContainer" fluid>
        <img src={logo} height="35" alt="JDE Logo" />
        <h5 className="title">Dashboard</h5>
        <MDBInputGroup tag="form" className="d-flex w-auto mb-3">
          {token === null ? (
            ""
          ) : (
            <Button className="Logout" variant="success" onClick={logOut}>
              <BiLogOut />
            </Button>
          )}
        </MDBInputGroup>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Header;
