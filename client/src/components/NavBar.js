import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from "react-router-dom";

function NavBar() {
  return (
    <>
      <Navbar >
        <Container class="nav flex-column">
          <Nav>
            <NavLink to='/'> Home Page</NavLink>
          </Nav>
          <Nav className="me-auto">
            <NavLink to="/spaceships">Spaceships</NavLink>
          </Nav>
          <Nav>
            <NavLink to="/missions">Missions</NavLink>
          </Nav>
        </Container>
      </Navbar>
      
    </>
  );
}

export default NavBar;