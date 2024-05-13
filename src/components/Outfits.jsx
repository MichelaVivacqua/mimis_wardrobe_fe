import React, { useState } from "react";
import { Form, Button, Dropdown, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/OIG4 (6).jpg";

const Valigia = ({ outfits }) => {
  const [outfitCount, setOutfitCount] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedOutfits, setSelectedOutfits] = useState([]);

  const seasons = ["Primavera/Autunno", "Estate", "Inverno"];

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
    <Container>
      <Link to="/MyNavbar">
        <img src={logo} alt="logo" style={{ width: "150px", height: "auto" }} />
      </Link>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
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
                <Dropdown.Toggle variant="primary">
                  {selectedSeason ? selectedSeason : "Seleziona stagione"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {seasons.map((season) => (
                    <Dropdown.Item
                      key={season}
                      onClick={() => handleFilterBySeason(season)}
                    >
                      {season}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Button variant="success" onClick={handleChooseOutfits}>
              Scegli
            </Button>
            <Button
              variant="primary"
              className="ml-2"
              onClick={handleConfirmOutfits}
            >
              Conferma
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Valigia;
