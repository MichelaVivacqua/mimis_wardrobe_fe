import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import logo from "../assets/OIG4 (6).jpg";
import Modal from "react-bootstrap/Modal";

const EliminaIndumento = () => {
  const [myClothes, setMyClothes] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedClothingId, setSelectedClothingId] = useState(null);

  useEffect(() => {
    const errorTimeout = setTimeout(() => setError(""), 5000);
    const successTimeout = setTimeout(() => setSuccessMessage(""), 5000);

    return () => {
      clearTimeout(errorTimeout);
      clearTimeout(successTimeout);
    };
  }, [error, successMessage]);

  useEffect(() => {
    const fetchMyClothes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/indumenti/miei", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Errore durante la richiesta.");
        }
        const data = await response.json();
        setMyClothes(data);
      } catch (error) {
        console.error("Errore durante la fetch:", error);
      }
    };

    fetchMyClothes();
  }, []);

  const handleShowModal = (clothingId) => {
    setSelectedClothingId(clothingId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedClothingId(null);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/indumenti/${selectedClothingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Errore durante l'eliminazione dell'indumento.");
      }
      // Rimuovo l'indumento dall'array myClothes
      setMyClothes((prevClothes) =>
        prevClothes.filter((clothing) => clothing.id !== selectedClothingId)
      );
      setSuccessMessage("INDUMENTO ELIMINATO!");
      handleCloseModal();
    } catch (error) {
      console.error("Errore durante l'eliminazione:", error);
      setError("Errore durante l'eliminazione dell'indumento.");
      handleCloseModal();
    }
  };

  const getSelectedClothing = () => {
    return myClothes.find((clothing) => clothing.id === selectedClothingId);
  };

  const selectedClothing = getSelectedClothing();

  return (
    <div>
      <Link to="/MyNavbar">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <div className="cards-container">
        {myClothes.map((clothing) => (
          <Card
            key={clothing.id}
            className="custom-card col-5 col-md-3 col-lg-2"
          >
            <Card.Img
              variant="top"
              src={clothing.image}
              alt={clothing.tipo}
              className="card-image"
            />
            <Card.Body>
              <Card.Title className="card-title">{clothing.tipo}</Card.Title>
              <Card.Text className="card-text">{clothing.colore}</Card.Text>
              <Button
                variant="danger"
                onClick={() => handleShowModal(clothing.id)}
                className="delete-button"
              >
                Elimina
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      {error && <div className="text-danger m-2">{error}</div>}
      {successMessage && (
        <div className="text-success m-2">{successMessage}</div>
      )}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione Indumento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedClothing && (
            <>
              <p>
                Sei sicuro di voler eliminare questo indumento? Non potrai più
                recuperarlo. Verrano eliminati anche gli outfit che lo
                prevedono.
              </p>
              <Card key={selectedClothing.id} className="custom-card">
                <Card.Img
                  variant="top"
                  src={selectedClothing.image}
                  alt={selectedClothing.tipo}
                  className="card-image"
                />
                <Card.Body>
                  <Card.Title className="card-title">
                    {selectedClothing.tipo}
                  </Card.Title>
                  <Card.Text className="card-text">
                    {selectedClothing.colore}
                  </Card.Text>
                </Card.Body>
              </Card>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EliminaIndumento;
