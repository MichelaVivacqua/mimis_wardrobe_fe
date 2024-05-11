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
    <div className="my-clothes-container row justify-content-center">
      <Link to="/MyNavbar">
        <img
          src={logo}
          alt="logo"
          style={{ width: "150px", height: "auto" }}
          className="m-3"
        />
      </Link>
      {myClothes.map((clothing) => (
        <Card key={clothing.id} className="m-1 col-12 col-md-3">
          <Card.Img
            variant="top"
            src={clothing.image}
            alt={clothing.tipo}
            style={{ width: "100px", height: "auto" }}
            className="align-self-center"
          />
          <Card.Body>
            <Card.Title>{clothing.tipo}</Card.Title>
            <Card.Text>{clothing.colore}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Armadio;
