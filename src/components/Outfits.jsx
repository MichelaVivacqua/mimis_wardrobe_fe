import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import logo from "../assets/OIG4 (6).jpg";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Rating from "react-rating";

const Outfits = () => {
  const [myOutfits, setMyOutfits] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [wornOutfits, setWornOutfits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOutfitId, setSelectedOutfitId] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(1);
  const [sortByRating, setSortByRating] = useState(false);

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
        const sortedOutfits = data.sort((a, b) => (a.dataIndossato ? 1 : -1));
        setMyOutfits(sortedOutfits);
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
    setRating(1);
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

      setMyOutfits((prevOutfits) => {
        const index = prevOutfits.findIndex(
          (outfit) => outfit.id === selectedOutfitId
        );
        const updatedOutfits = [...prevOutfits];
        updatedOutfits[index] = updatedOutfit;
        return updatedOutfits;
      });

      handleCloseRatingModal();
    } catch (error) {
      console.error("Errore durante la valutazione:", error);
    }
  };

  const getSelectedOutfit = () => {
    return myOutfits.find((outfit) => outfit.id === selectedOutfitId);
  };

  const shareOutfit = (outfitId) => {
    const outfitUrl = `${window.location.origin}/outfit/${outfitId}`;
    const message = `Ciao! Cosa ne pensi se indosso quest'outfit? ${outfitUrl}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Guarda il mio outfit!",
          text: message,
          url: outfitUrl,
        })
        .catch((error) =>
          console.error("Errore durante la condivisione:", error)
        );
    } else {
      navigator.clipboard.writeText(outfitUrl).then(() => {
        alert("Link copiato negli appunti!");
      });
    }
  };

  const sortedOutfits = sortByRating
    ? [...myOutfits].sort((a, b) => (b.valutazione || 0) - (a.valutazione || 0))
    : myOutfits;

  const selectedOutfit = getSelectedOutfit();

  return (
    <div>
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
      <button
        className="custom-button m-2"
        onClick={() => setSortByRating(!sortByRating)}
      >
        {sortByRating ? (
          <i className="bi bi-arrow-counterclockwise"></i>
        ) : (
          "Ordina per valutazione"
        )}
      </button>
      <div>
        <div className="outfits-container" style={{ minHeight: "55vh" }}>
          {sortedOutfits
            .filter(
              (outfit) =>
                !selectedSeason ||
                outfit.indumenti.every((indumento) =>
                  seasonsMap[selectedSeason].includes(indumento.tipo)
                )
            )
            .map((outfit) => (
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
                    {outfit.dataIndossato && (
                      <p style={{ backgroundColor: "white", color: "#e24b3d" }}>
                        Indossato il:{" "}
                        {new Date(outfit.dataIndossato).toLocaleDateString()}
                      </p>
                    )}
                    <div>
                      <Rating
                        initialRating={outfit.valutazione || 0}
                        readonly
                        emptySymbol={
                          <i
                            className="bi bi-star"
                            style={{ color: "gold" }}
                          ></i>
                        }
                        fullSymbol={
                          <i
                            className="bi bi-star-fill"
                            style={{ color: "gold" }}
                          ></i>
                        }
                      />
                      <i
                        className="bi bi-pencil mx-1"
                        onClick={() => handleShowRatingModal(outfit.id)}
                      ></i>
                    </div>
                  </Card.Text>
                  <button
                    className="btn btn-secondary m-1"
                    onClick={() => handleShowModal(outfit.id)}
                  >
                    INDOSSATO!
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => shareOutfit(outfit.id)}
                  >
                    <i className="bi bi-share-fill mx-1"></i>
                    Chiedi un consiglio!
                  </button>
                </Card.Body>
              </Card>
            ))}
        </div>

        <Modal
          show={showModal}
          onHide={handleCloseModal}
          className="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Conferma</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOutfit && (
              <>
                <p className="text-center">
                  STAI INDOSSANDO QUESTO OUTFIT? <br /> Lo sposteremo in fondo
                  al tuo armadio così avrai a portata di mano sempre indumenti
                  diversi!
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
            <Button className="custom-button" onClick={markAsWorn}>
              Conferma
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showRatingModal}
          onHide={handleCloseRatingModal}
          className="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Valuta Outfit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOutfit && (
              <>
                <p className="text-center">
                  VALUTA QUESTO OUTFIT DA 1 A 5 STELLE:
                  <br />
                  1 STELLA = molto sportivo
                  <br />5 STELLE = molto elegante
                </p>
                <Rating
                  initialRating={rating}
                  emptySymbol={
                    <i className="bi bi-star" style={{ color: "gold" }}></i>
                  }
                  fullSymbol={
                    <i
                      className="bi bi-star-fill"
                      style={{ color: "gold" }}
                    ></i>
                  }
                  onChange={(value) => setRating(value)}
                />
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
