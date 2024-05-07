import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

const Outfits = () => {
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

  return (
    <div className="my-outfits-container">
      {myOutfits &&
        myOutfits.map((outfit) => {
          console.log(outfit); // Qui inserisci il console.log
          return (
            <Card key={outfit.id}>
              <Card.Body>
                <Card.Title>Abbinamento #{outfit.id}</Card.Title>
                <Card.Text>
                  {outfit.indumenti &&
                    outfit.indumenti.map((indumento) => (
                      <div key={indumento.id}>
                        <p>Tipo: {indumento.tipo}</p>
                        <p>Colore: {indumento.colore}</p>
                      </div>
                    ))}
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
    </div>
  );
};

export default Outfits;
