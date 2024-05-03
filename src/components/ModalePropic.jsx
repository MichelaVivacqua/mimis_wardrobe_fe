import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const ModalePropic = ({ show, handleClose }) => {
  const [image, setImage] = useState(""); // Stato per memorizzare l'immagine

  const handleImageChange = (e) => {
    // Gestione del cambiamento dell'immagine
    const file = e.target.files[0];
    // Esegui eventuali controlli sull'immagine qui...
    setImage(file);
  };

  const handleImageUpload = async () => {
    // Ottieni il token memorizzato nel localStorage
    const token = localStorage.getItem("token");
    console.log(token);

    // Verifica che il token sia valido
    if (!token) {
      console.error("Token non trovato");
      return;
    }

    // Crea l'oggetto FormData e aggiungi l'immagine
    const formData = new FormData();
    formData.append("propic", image);

    try {
      const response = await fetch("http://localhost:3001/utenti/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Aggiungi il token all'header Authorization
        },
        body: formData,
      });

      if (response.ok) {
        // Immagine caricata con successo
        handleClose(); // Chiudi il modale
      } else {
        // Gestisci errori di caricamento
        console.error(
          "Errore durante il caricamento dell'immagine:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Errore durante il caricamento dell'immagine:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cambia Immagine Profilo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Seleziona un'immagine</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Annulla
        </Button>
        <Button variant="primary" onClick={handleImageUpload}>
          Carica
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalePropic;
