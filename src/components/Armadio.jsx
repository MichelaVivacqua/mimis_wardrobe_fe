import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import logo from "../assets/OIG4 (6).jpg";

const Armadio = () => {
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

  return (
    <div>
      <Link to="/MyNavbar">
        <img src={logo} alt="logo" className="logo" />
      </Link>
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
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Armadio;
