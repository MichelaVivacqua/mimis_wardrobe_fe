import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/OIG4 (6).jpg";
import NavDropdown from "react-bootstrap/NavDropdown";
import ModalePropic from "./ModalePropic";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        <Nav.Link onClick={handleModalOpen}>
          <i className="bi bi-person-bounding-box m-2"></i>
        </Nav.Link>
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
              <NavDropdown.Item>
                <Link to="./CreaIndumento" className="linknondecorato">
                  Aggiungi indumento
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="./EliminaIndumento" className="linknondecorato">
                  Elimina indumento
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Armadio" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to="./Armadio" className="linknondecorato">
                  Visualizza tutto
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="./FiltroColore" className="linknondecorato">
                  Filtra per colore
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="./FiltroTipologia" className="linknondecorato">
                  Filtra per tipo
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Abbinamenti" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to="./CreaAbbinamento" className="linknondecorato">
                  Crea abbinamento
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="./Outfits" className="linknondecorato">
                  Outfits
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="./EliminaAbbinamento" className="linknondecorato">
                  Elimina Abbinamento
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <ModalePropic show={showModal} handleClose={handleModalClose} />
    </Container>
  );
};

export default MyNavbar;
