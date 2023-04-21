import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {NavLink} from "react-router-dom";

function NavBar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark-grey bg-light sticky-top">
      <div class="px-4 collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class=" text-dark nav-link" href='/'>Astronauts</a>
          </li>
          <li class="nav-item">
            <a class="text-dark nav-link" href="/missions">Missions</a>
          </li>
          <li class="nav-item">
            <a class="text-dark nav-link" href="/spaceships">Spaceships</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;



<Nav class="navbar navbar-default" >
<div class="container-fluid">
  <ul class = "nav navbar-nav">
  <Container >
  <Nav>
    <NavLink class="nav-link" to='/'> Home Page</NavLink>
  </Nav>
  <Nav className="me-auto">
    <NavLink class="nav-link" to="/spaceships">Spaceships</NavLink>
  </Nav>
  <Nav>
    <NavLink class="nav-link" to="/missions">Missions</NavLink>
  </Nav>
  </Container>
  </ul>
</div>
</Nav>