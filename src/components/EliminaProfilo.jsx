import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import logo from "../assets/OIG4 (6).jpg";

const EliminaProfilo = () => {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const errorTimeout = setTimeout(() => setError(""), 5000);
    const successTimeout = setTimeout(() => setSuccessMessage(""), 5000);

    return () => {
      clearTimeout(errorTimeout);
      clearTimeout(successTimeout);
    };
  }, [error, successMessage]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://amused-jeniece-mimiswardrobe-dcb5d9c7.koyeb.app/utenti/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
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

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const deleteUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const utenteId = userData.id;
      const response = await fetch(
        `http://amused-jeniece-mimiswardrobe-dcb5d9c7.koyeb.app/utenti/${utenteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setSuccessMessage("UTENTE ELIMINATO CON SUCCESSO!");
        window.location.href = "/";
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Errore durante l'eliminazione del profilo'", error);
    }
  };

  return (
    <div className="login-container">
      <Link to="/MyNavbar">
        <img src={logo} alt="logo" style={{ width: "150px", height: "auto" }} />
      </Link>

      <p className="mt-5">
        <strong>ATTENZIONE!</strong>
        <br />
        L'eliminazione del profilo non è reversibile, <br />e con essa perderai
        anche tutti i tuoi dati
      </p>

      <Button variant="danger" onClick={handleShowModal} className="m-5">
        ELIMINA IL MIO PROFILO
      </Button>

      {error && <p className="text-danger">{error}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione Profilo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare il tuo profilo? Non potrai più
          recuperarlo.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annulla
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            Elimina Profilo
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EliminaProfilo;
