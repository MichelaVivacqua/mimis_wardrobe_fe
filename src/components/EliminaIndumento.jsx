import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import logo from "../assets/OIG4 (6).jpg";

const EliminaIndumento = () => {
  const [myClothes, setMyClothes] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleDelete = async (indumentoId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/indumenti/${indumentoId}`,
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
        prevClothes.filter((clothing) => clothing.id !== indumentoId)
      );
      setSuccessMessage("INDUMENTO ELIMINATO!");
    } catch (error) {
      console.error("Errore durante l'eliminazione:", error);
      setError("Errore durante l'eliminazione dell'indumento.");
    }
  };

  return (
    <div>
      <Link to="/MyNavbar">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <div className="cards-container">
        {myClothes.map((clothing) => (
          <Card key={clothing.id} className="custom-card">
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
                onClick={() => handleDelete(clothing.id)}
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
    </div>
  );
};

export default EliminaIndumento;
