import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import logo from "../assets/OIG4 (6).jpg";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Outfits = () => {
  const [myOutfits, setMyOutfits] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [wornOutfits, setWornOutfits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOutfitId, setSelectedOutfitId] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(1);

  const seasonsMap = {
    Estate: [
      "PANTALONCINI",
      "TOP",
      "BODY",
      "GONNA",
      "MAGLIA",
      "CANOTTIERA",
      "BORSA",
      "CINTURA",
      "TACCHI",
      "ABITO",
      "SANDALI",
      "TUTA",
      "COSTUME",
    ],
    Inverno: [
      "CAPPOTTO",
      "TRENCH",
      "JEANS",
      "PANTALONI",
      "MAGLIONCINO",
      "FELPA",
      "BORSA",
      "CINTURA",
      "SNEAKERS",
      "TACCHI",
      "ANFIBI",
      "STIVALI",
      "TUTA",
      "SCIARPA",
      "CAPPOTTO",
      "GIUBOTTO",
      "ABITO",
    ],
    PrimaveraAutunno: [
      "GIUBBOTTO",
      "JEANS",
      "PANTALONI",
      "MAGLIA",
      "CAMICIA",
      "BORSA",
      "CINTURA",
      "SNEAKERS",
      "TACCHI",
      "TRENCH",
      "GIACCA",
      "GIUBOTTO",
      "ABITO",
      "BLAZER",
    ],
  };

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

  const handleFilterBySeason = (season) => {
    setSelectedSeason(season);
  };

  const handleShowModal = (outfitId) => {
    setSelectedOutfitId(outfitId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOutfitId(null);
  };

  const handleShowRatingModal = (outfitId) => {
    setSelectedOutfitId(outfitId);
    setShowRatingModal(true);
  };

  const handleCloseRatingModal = () => {
    setShowRatingModal(false);
    setSelectedOutfitId(null);
    setRating(0);
  };

  const markAsWorn = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/abbinamenti/${selectedOutfitId}/indossato`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Errore durante l'aggiornamento dello stato.");
      }

      const updatedOutfit = await response.json();

      setWornOutfits((prevWornOutfits) => [
        ...prevWornOutfits,
        selectedOutfitId,
      ]);
      setMyOutfits((prevOutfits) =>
        prevOutfits
          .filter((outfit) => outfit.id !== selectedOutfitId)
          .concat(updatedOutfit)
      );
      handleCloseModal();
    } catch (error) {
      console.error("Errore durante l'aggiornamento dello stato:", error);
    }
  };

  const submitRating = async () => {
    if (rating < 1 || rating > 5) {
      alert("Per favore, seleziona una valutazione valida tra 1 e 5.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/abbinamenti/${selectedOutfitId}/rate`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ valutazione: rating }),
        }
      );

      if (!response.ok) {
        throw new Error("Errore durante la valutazione.");
      }

      const updatedOutfit = await response.json();

      setMyOutfits((prevOutfits) =>
        prevOutfits.map((outfit) =>
          outfit.id === selectedOutfitId ? updatedOutfit : outfit
        )
      );

      handleCloseRatingModal();
    } catch (error) {
      console.error("Errore durante la valutazione:", error);
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
      <Dropdown>
        <Dropdown.Toggle className="custom-button m-2" id="dropdown-basic">
          {selectedSeason || "Tutte le stagioni"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            key="Estate"
            onClick={() => handleFilterBySeason("Estate")}
          >
            <i className="bi bi-brightness-high mx-1"></i>
            Estate
          </Dropdown.Item>
          <Dropdown.Item
            key="PrimaveraAutunno"
            onClick={() => handleFilterBySeason("PrimaveraAutunno")}
          >
            <i className="bi bi-cloud-sun mx-1"></i>
            Primavera/Autunno
          </Dropdown.Item>
          <Dropdown.Item
            key="Inverno"
            onClick={() => handleFilterBySeason("Inverno")}
          >
            <i className="bi bi-snow2 mx-1"></i>
            Inverno
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div className="cards-container">
        {myOutfits
          .filter(
            (outfit) =>
              !selectedSeason ||
              outfit.indumenti.every((indumento) =>
                seasonsMap[selectedSeason].includes(indumento.tipo)
              )
          )
          .map((outfit) => (
            <Card key={outfit.id} className="custom-card">
              <Card.Body>
                <Card.Title className="card-title">
                  Outfit {outfit.id}
                </Card.Title>
                <Card.Text className="card-text">
                  {outfit.indumenti &&
                    outfit.indumenti.map((indumento) => (
                      <div key={indumento.id}>
                        <Card.Img
                          variant="top"
                          src={indumento.image}
                          alt={indumento.tipo}
                          className="card-image"
                        />
                        <p>{indumento.tipo}</p>
                        <p>{indumento.colore}</p>
                      </div>
                    ))}
                  {outfit.dataIndossato && (
                    <p style={{ backgroundColor: "white", color: "#e24b3d" }}>
                      Indossato il:{" "}
                      {new Date(outfit.dataIndossato).toLocaleDateString()}
                    </p>
                  )}
                  {outfit.valutazione && (
                    <p style={{ backgroundColor: "white", color: "#e24b3d" }}>
                      {outfit.valutazione}
                    </p>
                  )}
                </Card.Text>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleShowModal(outfit.id)}
                >
                  INDOSSATO!
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleShowRatingModal(outfit.id)}
                >
                  VALUTA
                </button>
              </Card.Body>
            </Card>
          ))}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Conferma Indossato</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOutfit && (
              <>
                <p className="text-center">
                  STAI INDOSSANDO QUESTO OUTFIT? <br /> Lo sposteremo in fondo
                  al tuo armadio così avrai a portata di mano sempre indumenti
                  diversi!
                </p>
                <Card key={selectedOutfit.id} className="custom-card">
                  <Card.Body>
                    <Card.Title className="card-title">
                      Outfit {selectedOutfit.id}
                    </Card.Title>
                    <Card.Text className="card-text">
                      {selectedOutfit.indumenti &&
                        selectedOutfit.indumenti.map((indumento) => (
                          <div key={indumento.id}>
                            <Card.Img
                              variant="top"
                              src={indumento.image}
                              alt={indumento.tipo}
                              className="card-image"
                            />
                            <p>{indumento.tipo}</p>
                            <p>{indumento.colore}</p>
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
            <Button className="custom-button" onClick={markAsWorn}>
              Conferma
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showRatingModal} onHide={handleCloseRatingModal}>
          <Modal.Header closeButton>
            <Modal.Title>Valuta Outfit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOutfit && (
              <>
                <p className="text-center">
                  VALUTA QUESTO OUTFIT DA 1 A 5 STELLE:
                </p>
                <Form>
                  <Form.Group controlId="rating">
                    <Form.Label>Valutazione</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(parseInt(e.target.value))}
                    >
                      <option value="1">1 stella</option>
                      <option value="2">2 stelle</option>
                      <option value="3">3 stelle</option>
                      <option value="4">4 stelle</option>
                      <option value="5">5 stelle</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseRatingModal}>
              Annulla
            </Button>
            <Button className="custom-button" onClick={submitRating}>
              Conferma
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Outfits;
