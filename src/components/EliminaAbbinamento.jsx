import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

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
    <div className="my-outfits-container">
      {myOutfits &&
        myOutfits.map((outfit) => {
          console.log(outfit); // Qui inserisci il console.log
          return (
            <Card key={outfit.id}>
              <Card.Body>
                <Card.Title>Abbinamento {outfit.id}</Card.Title>
                <Card.Text>
                  {outfit.indumenti &&
                    outfit.indumenti.map((indumento) => (
                      <div key={indumento.id}>
                        <Card.Img
                          variant="top"
                          src={indumento.image}
                          alt={indumento.tipo}
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
  );
};

export default EliminaAbbinamento;
