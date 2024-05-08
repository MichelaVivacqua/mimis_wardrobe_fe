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
    <div className="my-clothes-container row">
      <Link to="/MyNavbar">
        <img src={logo} alt="logo" style={{ width: "150px", height: "auto" }} />
      </Link>
      <Dropdown>
        <Dropdown.Toggle className="custom-button m-2" id="dropdown-basic">
          Seleziona tipo
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

      {myClothes
        .filter((clothing) => !selectedType || clothing.tipo === selectedType)
        .map((clothing) => (
          <Card key={clothing.id} className="m-1 col-12 col-md-3 text-center">
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

export default FiltroTipologia;
