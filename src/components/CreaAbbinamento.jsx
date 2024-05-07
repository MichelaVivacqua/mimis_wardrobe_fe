import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const CreaAbbinamento = () => {
  const [myClothes, setMyClothes] = useState([]);
  const [selectedClothes, setSelectedClothes] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

  const toggleSelection = (clothing) => {
    const isSelected = selectedClothes.some((c) => c.id === clothing.id);
    if (isSelected) {
      setSelectedClothes(selectedClothes.filter((c) => c.id !== clothing.id));
    } else {
      setSelectedClothes([...selectedClothes, clothing]);
    }
  };

  const createAbbinamento = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/abbinamenti", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ indumenti: selectedClothes.map((c) => c.id) }),
      });
      if (!response.ok) {
        throw new Error("Errore durante la creazione dell'abbinamento.");
      }
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Errore durante la creazione dell'abbinamento:", error);
    }
  };

  return (
    <div className="my-clothes-container">
      {showSuccessMessage && (
        <Alert
          variant="success"
          onClose={() => setShowSuccessMessage(false)}
          dismissible
        >
          Abbinamento creato con successo!
        </Alert>
      )}
      {myClothes.map((clothing) => (
        <Card key={clothing.id}>
          <Card.Img variant="top" src={clothing.image} alt={clothing.tipo} />
          <Card.Body>
            <Card.Title>{clothing.tipo}</Card.Title>
            <Card.Text>{clothing.colore}</Card.Text>
            <Button onClick={() => toggleSelection(clothing)}>
              {selectedClothes.some((c) => c.id === clothing.id)
                ? "Deseleziona"
                : "Seleziona"}
            </Button>
          </Card.Body>
        </Card>
      ))}
      <Button onClick={createAbbinamento}>Crea Abbinamento</Button>
    </div>
  );
};

export default CreaAbbinamento;
