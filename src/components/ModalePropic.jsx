import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const ModalePropic = ({ show, handleClose }) => {
  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleImageUpload = async () => {
    const token = localStorage.getItem("token");
    // console.log(token);

    if (!token) {
      console.error("Token non trovato");
      return;
    }

    const formData = new FormData();
    formData.append("propic", image);

    try {
      const response = await fetch("http://localhost:3001/utenti/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        handleClose();
        window.location.reload();
      } else {
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
      <Modal.Header closeButton style={{ backgroundColor: "#FFDAB9" }}>
        <Modal.Title>Cambia Immagine Profilo</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#FFDAB9" }}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Seleziona un'immagine</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#FFDAB9" }}>
        <Button variant="secondary" onClick={handleClose}>
          Annulla
        </Button>
        <Button className="custom-button" onClick={handleImageUpload}>
          Carica
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalePropic;
