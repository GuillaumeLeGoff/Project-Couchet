
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Nav } from 'react-bootstrap';
import '../styles/Main.css';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBInputGroup
} from 'mdb-react-ui-kit';

function Header({ childToParent }, props) {

  const data = true;
  return (
    <MDBNavbar light bgColor='light'>
      {props.data}
      <MDBContainer fluid>
        <Image
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
        <MDBNavbarBrand>Panneau Couchet </MDBNavbarBrand>
        <MDBInputGroup tag="form" className='d-flex w-auto mb-3'>

          <Nav.Link className='Logout' onClick={() => childToParent(data)} variant="primary">Logout</Nav.Link>

        </MDBInputGroup>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Header;
