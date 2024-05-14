import { useState, useEffect } from "react";
import { Form, Dropdown, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/OIG4 (6).jpg";

const Valigia = () => {
  const [outfitCount, setOutfitCount] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [outfits, setOutfits] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAllSeasonOutfits, setShowAllSeasonOutfits] = useState(false);
  const [selectedOutfits, setSelectedOutfits] = useState([]);

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
        setOutfits(data);
      } catch (error) {
        console.error("Errore durante la fetch:", error);
      }
    };

    fetchMyOutfits();
  }, []);

  const handleOutfitCountChange = (event) => {
    setOutfitCount(parseInt(event.target.value));
  };

  const handleFilterBySeason = (season) => {
    setSelectedSeason(season);
    setShowAllSeasonOutfits(false);
    setShowConfirmation(false);
    setSelectedOutfits([]);
  };

  const handleConfirm = () => {
    setShowConfirmation(true);
  };

  const handleChangeOutfit = () => {
    setShowAllSeasonOutfits(true);
    setShowConfirmation(false);
    setSelectedOutfits([]);
  };

  const handleSelectOutfit = (outfitId) => {
    setSelectedOutfits((prevSelectedOutfits) => {
      if (prevSelectedOutfits.includes(outfitId)) {
        return prevSelectedOutfits.filter((id) => id !== outfitId);
      } else {
        return [...prevSelectedOutfits, outfitId];
      }
    });
  };

  const filteredOutfits = outfits
    .filter(
      (outfit) =>
        !selectedSeason ||
        outfit.indumenti.every((indumento) =>
          seasonsMap[selectedSeason].includes(indumento.tipo)
        )
    )
    .slice(0, outfitCount);

  const allSeasonOutfits = outfits.filter(
    (outfit) =>
      selectedSeason &&
      outfit.indumenti.every((indumento) =>
        seasonsMap[selectedSeason].includes(indumento.tipo)
      )
  );

  const uniqueItems = (items) => {
    const seen = new Set();
    return items.filter((item) => {
      const key = `${item.tipo}-${item.colore}`;
      if (seen.has(key)) {
        return false;
      } else {
        seen.add(key);
        return true;
      }
    });
  };

  const selectedOutfitIndumenti = uniqueItems([
    ...filteredOutfits.flatMap((outfit) => outfit.indumenti),
    ...selectedOutfits.flatMap(
      (id) => outfits.find((outfit) => outfit.id === id).indumenti
    ),
  ]);

  return (
    <div>
      <Link to="/MyNavbar">
        <img src={logo} alt="logo" style={{ width: "150px", height: "auto" }} />
      </Link>
      <Row className="justify-content-center mt-5">
        <Col>
          <h2>Seleziona gli outfit desiderati</h2>
          <Form>
            <Form.Group controlId="outfitCount">
              <Form.Label>Quanti outfit ti servono?</Form.Label>
              <Form.Control
                as="select"
                value={outfitCount}
                onChange={handleOutfitCountChange}
              >
                {[1, 2, 3, 4, 5].map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="seasonSelect">
              <Form.Label>Come sarà la temperatura?</Form.Label>
              <Dropdown>
                <Dropdown.Toggle className="custom-button m-3">
                  {selectedSeason ? selectedSeason : "Seleziona stagione"}
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
            </Form.Group>
          </Form>
        </Col>
      </Row>
      {showConfirmation ? (
        <div className="mt-5">
          <h3>Ecco cosa devi mettere in valigia:</h3>
          <ul>
            {selectedOutfitIndumenti.map((indumento) => (
              <li key={indumento.id}>
                <img
                  src={indumento.image}
                  alt={indumento.tipo}
                  style={{ width: "50px", height: "auto" }}
                />
                {indumento.tipo} - {indumento.colore}
              </li>
            ))}
          </ul>
        </div>
      ) : showAllSeasonOutfits ? (
        <div>
          <Row className="justify-content-center mt-5">
            {allSeasonOutfits.map((outfit) => (
              <Col key={outfit.id} className="m-1 col-12 col-md-3">
                <Card
                  onClick={() => handleSelectOutfit(outfit.id)}
                  className={
                    selectedOutfits.includes(outfit.id) ? "border-primary" : ""
                  }
                >
                  <Card.Body>
                    <Card.Title>Outfit {outfit.id}</Card.Title>
                    <Card.Text>
                      {outfit.indumenti.map((indumento) => (
                        <div key={indumento.id}>
                          <img
                            src={indumento.image}
                            alt={indumento.tipo}
                            style={{ width: "100px", height: "auto" }}
                            className="align-self-center"
                          />
                          <p>{indumento.tipo}</p>
                          <p>{indumento.colore}</p>
                        </div>
                      ))}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {selectedOutfits.length > 0 && (
            <div className="text-center mt-3">
              <Button onClick={handleConfirm} variant="success">
                Conferma
              </Button>
            </div>
          )}
        </div>
      ) : (
        selectedSeason && (
          <div>
            <Row className="justify-content-center mt-5">
              {filteredOutfits.map((outfit) => (
                <Col key={outfit.id} className="m-1 col-12 col-md-3">
                  <Card>
                    <Card.Body>
                      <Card.Title>Outfit {outfit.id}</Card.Title>
                      <Card.Text>
                        {outfit.indumenti.map((indumento) => (
                          <div key={indumento.id}>
                            <img
                              src={indumento.image}
                              alt={indumento.tipo}
                              style={{ width: "100px", height: "auto" }}
                              className="align-self-center"
                            />
                            <p>{indumento.tipo}</p>
                            <p>{indumento.colore}</p>
                          </div>
                        ))}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            {filteredOutfits.length > 0 && (
              <div className="text-center mt-3">
                <Button
                  onClick={handleConfirm}
                  variant="success"
                  className="m-1"
                >
                  Conferma
                </Button>
                <Button
                  onClick={handleChangeOutfit}
                  className="custom-button m-1"
                >
                  Cambia Outfit
                </Button>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Valigia;
