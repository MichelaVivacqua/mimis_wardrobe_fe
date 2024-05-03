import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/OIG4 (6).jpg";
import NavDropdown from "react-bootstrap/NavDropdown";
import ModalePropic from "./ModalePropic";
import { useState, useEffect } from "react";

const MyNavbar = () => {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  useEffect(() => {
    // Funzione per ottenere i dati dell'utente
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3001/utenti/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          console.error("Errore nel caricamento dei dati dell'utente");
        }
      } catch (error) {
        console.error("Errore nel caricamento dei dati dell'utente:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Container fluid style={{ backgroundColor: "#E24B3D" }}>
      <div className="d-flex justify-content-end align-items-center py-3">
        <img
          src={userData && userData.propic}
          alt="Foto del profilo"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
        <div>Ciao {userData ? userData.name : "Utente"}</div>
      </div>
      <Navbar className="justify-content-between">
        <Navbar.Brand href="#">
          <img
            src={logo}
            alt="logo"
            style={{ width: "150px", height: "auto" }}
          />
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
            <Nav.Link onClick={handleModalOpen}>
              <i className="bi bi-person-bounding-box"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <ModalePropic show={showModal} handleClose={handleModalClose} />
    </Container>
  );
};

export default MyNavbar;
