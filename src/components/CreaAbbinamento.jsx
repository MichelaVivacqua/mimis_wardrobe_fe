import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import logo from "../assets/OIG4 (6).jpg";

const CreaAbbinamento = () => {
  const [myClothes, setMyClothes] = useState([]);
  const [selectedClothes, setSelectedClothes] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const successTimeout = setTimeout(() => setShowSuccessMessage(""), 5000);

    return () => {
      clearTimeout(successTimeout);
    };
  }, [showSuccessMessage]);

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
      setSelectedClothes([]); // Reset selezione dopo creazione abbinamento
      window.scrollTo(0, 0); // Scorrimento verso l'inizio della pagina
    } catch (error) {
      console.error("Errore durante la creazione dell'abbinamento:", error);
    }
  };

  return (
    <div>
      <Link to="/MyNavbar">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      {showSuccessMessage && (
        <Alert
          variant="success"
          onClose={() => setShowSuccessMessage(false)}
          dismissible
        >
          Abbinamento creato con successo!
        </Alert>
      )}
      <div>
        <Button onClick={createAbbinamento} className="custom-button">
          <i className="bi bi-stars mx-1"></i>
          CREA OUTFIT
        </Button>
      </div>
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
                onClick={() => toggleSelection(clothing)}
                style={{
                  backgroundColor: "#fff9c4",
                  color: "red",
                  border: "none",
                }}
              >
                {selectedClothes.some((c) => c.id === clothing.id) ? (
                  <i className="bi bi-check2-square"></i>
                ) : (
                  <i className="bi bi-app"></i>
                )}
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CreaAbbinamento;
