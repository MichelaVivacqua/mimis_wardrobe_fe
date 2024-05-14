import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/OIG4 (6).jpg";
import indumenti from "../assets/indumenti senza sfondo.png";
import outfit from "../assets/outfit senza sfondo.png";
import armadio from "../assets/armadio senza sfondo.png";
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
    <Container fluid>
      <Row>
        <div className="d-flex justify-content-md-end justify-content-center align-items-center py-3">
          <img
            src={userData && userData.propic}
            alt="Foto del profilo"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
          <div className="mx-2">
            Ciao, {userData ? userData.name : "Utente"}!
          </div>
          <NavDropdown
            title={<i className="bi bi-person-bounding-box m-2"></i>}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item
              onClick={handleModalOpen}
              className="linknondecorato"
            >
              <i className="bi bi-image mx-1"></i>
              Cambia Immagine Profilo
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="./ModificaProfilo" className="linknondecorato">
                <i className="bi bi-pencil-square mx-1"></i>
                Modifica Dati Profilo
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="./EliminaProfilo" className="linknondecorato">
                <i className="bi bi-trash-fill mx-1"></i>
                Elimina Profilo
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <Link to="/">
                <i className="bi bi-box-arrow-right mx-1"></i>
                Logout
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </div>
        <Navbar className="justify-content-between">
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto mb-2 mb-lg-0 row">
              <Navbar.Brand className="col-12 col-md-2">
                <Link to="./">
                  <img
                    src={logo}
                    alt="logo"
                    style={{ width: "150px", height: "auto" }}
                    className="m-2"
                  />
                </Link>
              </Navbar.Brand>
              <div className="col-12 col-md-3 text-center">
                <img
                  src={indumenti}
                  alt="logo"
                  style={{ width: "200px", height: "auto" }}
                  className="m-5"
                />
                <NavDropdown
                  title="Indumenti"
                  id="basic-nav-dropdown"
                  className="mt-4"
                >
                  <NavDropdown.Item>
                    <Link to="./CreaIndumento" className="linknondecorato">
                      <i className="bi bi-tags-fill mx-1"></i>
                      Aggiungi indumento
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="./EliminaIndumento" className="linknondecorato">
                      <i className="bi bi-trash-fill mx-1"></i>
                      Elimina indumento
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
              <div className="col-12 col-md-3 text-center">
                <img
                  src={armadio}
                  alt="logo"
                  style={{ width: "150px", height: "auto" }}
                  className="m-5"
                />
                <NavDropdown title="Armadio" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="./Armadio" className="linknondecorato">
                      <i className="bi bi-layout-split mx-1"></i>
                      Visualizza tutto
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="./FiltroColore" className="linknondecorato">
                      <i className="bi bi-palette2 mx-1"></i>
                      Visualizza per colore
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="./FiltroTipologia" className="linknondecorato">
                      <i className="bi bi-funnel-fill mx-1"></i>
                      Visualizza per tipo
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="./Stagioni" className="linknondecorato">
                      <i className="bi bi-cloud-sun-fill mx-1"></i>
                      Visualizza per stagione
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
              <div className="col-12 col-md-3 text-center">
                <img
                  src={outfit}
                  alt="logo"
                  style={{ width: "150px", height: "auto" }}
                  className="m-5"
                />
                <NavDropdown title="Abbinamenti" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="./CreaAbbinamento" className="linknondecorato">
                      <i className="bi bi-plus-circle-fill mx-1"></i>
                      Crea abbinamento
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="./Outfits" className="linknondecorato">
                      <i className="bi bi-arrow-left-right mx-1"></i>
                      Outfits
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="./EliminaAbbinamento" className="linknondecorato">
                      <i className="bi bi-trash-fill mx-1"></i>
                      Elimina Abbinamento
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
              <Nav.Link className="my-4">
                <Link to="./Meteo" className="linknondecorato">
                  <i className="bi bi-sun-fill mx-1"></i>
                  Cosa indosso oggi?
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="./Valigia" className="linknondecorato">
                  <i className="bi bi-suitcase2-fill mx-1"></i>
                  Prepara la valigia
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <ModalePropic show={showModal} handleClose={handleModalClose} />
      </Row>
    </Container>
  );
};

export default MyNavbar;
