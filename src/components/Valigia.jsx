import { useState } from "react";
import { Form, Button, Dropdown, Container, Row, Col } from "react-bootstrap";

const Valigia = () => {
  const [outfitCount, setOutfitCount] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [outfits, setOutfits] = useState([]);
  const [selectedOutfits, setSelectedOutfits] = useState([]);

  const seasons = ["Primavera/Autunno", "Estate", "Inverno"];

  const handleOutfitCountChange = (event) => {
    setOutfitCount(parseInt(event.target.value));
  };

  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
    // Qui puoi effettuare una chiamata API per ottenere gli outfit
    // corrispondenti alla stagione selezionata e aggiornare lo stato degli outfit.
  };

  const handleConfirmOutfits = () => {
    // Qui puoi implementare la logica per confermare gli outfit selezionati dall'utente.
    // Ad esempio, potresti mostrare un messaggio con la lista degli indumenti corrispondenti
    // agli outfit selezionati.
  };

  const handleChooseOutfits = () => {
    // Qui puoi implementare la logica per mostrare tutti gli outfit della stagione selezionata
    // e consentire all'utente di selezionarne un numero specifico.
  };

  return (
    <Container>
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
                      onClick={() => handleSeasonSelect(season)}
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
