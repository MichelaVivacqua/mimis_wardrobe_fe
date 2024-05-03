import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/OIG4 (6).jpg";
import NavDropdown from "react-bootstrap/NavDropdown";

const MyNavbar = () => (
  <Container fluid>
    <Navbar
      style={{ backgroundColor: "#E24B3D" }}
      className="justify-content-between"
    >
      <Navbar.Brand href="#">
        <img src={logo} alt="logo" style={{ width: "150px", height: "auto" }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarSupportedContent" />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="me-auto mb-2 mb-lg-0">
          <NavDropdown title="Indumenti" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">
              Aggiungi indumento
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Elimina indumento
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Armadio" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.3">
              Visualizza tutto
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.4">
              Filtra per colore
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.4">
              Filtra per tipologia
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Abbinamenti" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.3">
              Crea abbinamento
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.4">
              Vedi abbinamenti
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.4">
              Elimina abbinamento
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Container>
);

export default MyNavbar;
