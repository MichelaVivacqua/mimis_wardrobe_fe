import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import logo from "../assets/OIG4 (6).jpg";

const FiltroTipologia = () => {
  const [myClothes, setMyClothes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

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

  const handleFilterByType = (type) => {
    setSelectedType(type);
  };

  const types = Array.from(new Set(myClothes.map((clothing) => clothing.tipo)));

  return (
    <div className="indumento-container">
      <Link to="/MyNavbar">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <Dropdown>
        <Dropdown.Toggle className="custom-button m-2" id="dropdown-basic">
          {selectedType || "Seleziona tipo"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleFilterByType(null)}>
            Tutti i tipi
          </Dropdown.Item>
          {types.map((type) => (
            <Dropdown.Item key={type} onClick={() => handleFilterByType(type)}>
              {type}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <div className="cards-container">
        {myClothes
          .filter((clothing) => !selectedType || clothing.tipo === selectedType)
          .map((clothing) => (
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
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default FiltroTipologia;
