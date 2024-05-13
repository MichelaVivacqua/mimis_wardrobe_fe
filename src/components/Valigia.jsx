import { useState, useEffect } from "react";
import { Form, Button, Dropdown, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/OIG4 (6).jpg";
import Card from "react-bootstrap/Card";

const Valigia = () => {
  const [outfitCount, setOutfitCount] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [outfits, setOutfits] = useState([]);
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
  };

  const handleConfirmOutfits = () => {
    // Ottenere la lista degli indumenti corrispondenti agli outfit selezionati
    const selectedItems = outfits
      .filter((outfit) => selectedOutfits.includes(outfit.id))
      .flatMap((outfit) => outfit.items);

    // Mostrare un messaggio con la lista degli indumenti corrispondenti
    alert(
      `ECCO LA TUA VALIGIA:\n${selectedItems
        .map((item) => `- ${item.tipo} (${item.stagione})`)
        .join("\n")}`
    );
  };

  const handleChooseOutfits = () => {
    // Verifica se è stata selezionata una stagione
    if (!selectedSeason) {
      alert("Seleziona prima una stagione.");
      return;
    }

    // Filtra gli outfit della stagione selezionata
    const outfitsOfSelectedSeason = outfits.filter(
      (outfit) => outfit.season === selectedSeason
    );

    // Verifica se ci sono outfit disponibili per la stagione selezionata
    if (outfitsOfSelectedSeason.length === 0) {
      alert("Nessun outfit disponibile per la stagione selezionata.");
      return;
    }

    // Memorizza gli outfit selezionati nello stato
    const selectedOutfits = [];
    for (let i = 0; i < outfitCount; i++) {
      const selectedOutfitIndex = prompt(
        `Seleziona l'outfit numero ${i + 1} (1-${
          outfitsOfSelectedSeason.length
        }):`
      );
      const parsedIndex = parseInt(selectedOutfitIndex);
      if (
        !isNaN(parsedIndex) &&
        parsedIndex >= 1 &&
        parsedIndex <= outfitsOfSelectedSeason.length
      ) {
        selectedOutfits.push(outfitsOfSelectedSeason[parsedIndex - 1].id);
      } else {
        alert("Inserimento non valido. Riprova.");
        i--; // Permetti all'utente di reinserire l'indice correttamente
      }
    }

    // Memorizza gli outfit selezionati nello stato
    setSelectedOutfits(selectedOutfits);
  };

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
            {/* <Button
              variant="secondary"
              onClick={handleChooseOutfits}
              className="m-3"
            >
              Cambia Outfits
            </Button> */}
            <Button
              variant="success"
              className="m-3"
              onClick={handleConfirmOutfits}
            >
              Conferma
            </Button>
          </Form>
        </Col>
      </Row>
      {outfits
        .filter(
          (outfit) =>
            !selectedSeason ||
            outfit.indumenti.every((indumento) =>
              seasonsMap[selectedSeason].includes(indumento.tipo)
            )
        )
        .map((outfit) => (
          <Card key={outfit.id} className="m-1 col-12 col-md-3">
            <Card.Body>
              <Card.Title>Outfit {outfit.id}</Card.Title>
              <Card.Text>
                {outfit.indumenti &&
                  outfit.indumenti.map((indumento) => (
                    <div key={indumento.id}>
                      <Card.Img
                        variant="top"
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
        ))}
    </div>
  );
};

export default Valigia;
