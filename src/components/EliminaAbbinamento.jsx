import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import logo from "../assets/OIG4 (6).jpg";
import Modal from "react-bootstrap/Modal";

const EliminaAbbinamento = () => {
  const [myOutfits, setMyOutfits] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedOutfitId, setSelectedOutfitId] = useState(null);

  useEffect(() => {
    const errorTimeout = setTimeout(() => setError(""), 5000);
    const successTimeout = setTimeout(() => setSuccessMessage(""), 5000);

    return () => {
      clearTimeout(errorTimeout);
      clearTimeout(successTimeout);
    };
  }, [error, successMessage]);

  useEffect(() => {
    const fetchMyOutfits = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/abbinamenti/miei", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Errore durante la richiesta.");
        }
        const data = await response.json();
        setMyOutfits(data);
      } catch (error) {
        console.error("Errore durante la fetch:", error);
      }
    };

    fetchMyOutfits();
  }, []);

  const handleShowModal = (outfitId) => {
    setSelectedOutfitId(outfitId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOutfitId(null);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/abbinamenti/${selectedOutfitId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Errore durante l'eliminazione dell'abbinamento.");
      }
      // Rimuovo l'outfit dall'array myOutfits
      setMyOutfits((prevOutfits) =>
        prevOutfits.filter((outfit) => outfit.id !== selectedOutfitId)
      );
      setSuccessMessage("ABBINAMENTO ELIMINATO!");
      handleCloseModal();
    } catch (error) {
      console.error("Errore durante l'eliminazione:", error);
      setError("Errore durante l'eliminazione dell'abbinamento.");
      handleCloseModal();
    }
  };

  const getSelectedOutfit = () => {
    return myOutfits.find((outfit) => outfit.id === selectedOutfitId);
  };

  const selectedOutfit = getSelectedOutfit();

  return (
    <div className="indumento-container">
      <Link to="/MyNavbar">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <div className="outfits-container">
        {myOutfits &&
          myOutfits.map((outfit) => (
            <Card key={outfit.id} className="card-horizontal">
              <div className="images-container">
                {outfit.indumenti &&
                  outfit.indumenti.map((indumento) => (
                    <img
                      key={indumento.id}
                      src={indumento.image}
                      alt={indumento.tipo}
                    />
                  ))}
              </div>
              <Card.Body>
                <Card.Title className="card-title">
                  Outfit {outfit.id}
                </Card.Title>
                <Card.Text className="card-text">
                  {outfit.indumenti &&
                    outfit.indumenti.map((indumento) => (
                      <div key={indumento.id}>
                        <p>
                          {indumento.tipo} {indumento.colore}
                        </p>
                      </div>
                    ))}
                </Card.Text>
                <Button
                  variant="danger"
                  onClick={() => handleShowModal(outfit.id)}
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
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione Outfit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOutfit && (
            <>
              <p>
                Sei sicuro di voler eliminare questo outfit? Non potrai più
                recuperarlo.
              </p>
              <Card key={selectedOutfit.id} className="card-horizontal">
                <div className="images-container">
                  {selectedOutfit.indumenti &&
                    selectedOutfit.indumenti.map((indumento) => (
                      <img
                        key={indumento.id}
                        src={indumento.image}
                        alt={indumento.tipo}
                      />
                    ))}
                </div>
                <Card.Body>
                  <Card.Title>Outfit {selectedOutfit.id}</Card.Title>
                  <Card.Text>
                    {selectedOutfit.indumenti &&
                      selectedOutfit.indumenti.map((indumento) => (
                        <div key={indumento.id}>
                          <p>
                            {indumento.tipo} {indumento.colore}
                          </p>
                        </div>
                      ))}
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

export default EliminaAbbinamento;
