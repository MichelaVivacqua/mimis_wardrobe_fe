import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import logo from "../assets/OIG4 (6).jpg";

const EliminaAbbinamento = () => {
  const [myOutfits, setMyOutfits] = useState([]);

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

  const handleDelete = async (abbinamentoId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/abbinamenti/${abbinamentoId}`,
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
      // Rimuovo l'indumento dall'array myOutfits
      setMyOutfits((prevOutfits) =>
        prevOutfits.filter((outfit) => outfit.id !== abbinamentoId)
      );
    } catch (error) {
      console.error("Errore durante l'eliminazione:", error);
    }
  };

  return (
    <div>
      <Link to="/MyNavbar">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <div className="cards-container">
        {myOutfits &&
          myOutfits.map((outfit) => {
            return (
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
                  </Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(outfit.id)}
                  >
                    Elimina
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default EliminaAbbinamento;
