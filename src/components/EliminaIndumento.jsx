import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const EliminaIndumento = () => {
  const [myClothes, setMyClothes] = useState([]);

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
    } catch (error) {
      console.error("Errore durante l'eliminazione:", error);
    }
  };

  return (
    <div className="my-clothes-container">
      {myClothes.map((clothing) => (
        <Card key={clothing.id}>
          <Card.Img variant="top" src={clothing.image} alt={clothing.tipo} />
          <Card.Body>
            <Card.Title>{clothing.tipo}</Card.Title>
            <Card.Text>{clothing.colore}</Card.Text>
            <Button variant="danger" onClick={() => handleDelete(clothing.id)}>
              Elimina
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default EliminaIndumento;