import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import logo from "../assets/OIG4 (6).jpg";

const Outfits = () => {
  const [myOutfits, setMyOutfits] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const seasonsMap = {
    Estate: [
      "PANTALONCINI",
      "TOP",
      "BODY",
      "GONNA",
      "MAGLIA",
      "CANOTTIERA",
      "BORSA",
      "CINTURA",
      "TACCHI",
      "ABITO",
    ],
    Inverno: [
      "CAPPOTTO",
      "TRENCH",
      "JEANS",
      "PANTALONI",
      "MAGLIONCINO",
      "FELPA",
      "BORSA",
      "CINTURA",
      "SNEAKERS",
      "TACCHI",
      "ANFIBI",
      "STIVALI",
      "TUTA",
      "SCIARPA",
      "CAPPOTTO",
      "GIUBOTTO",
      "ABITO",
    ],
    PrimaveraAutunno: [
      "GIUBBOTTO",
      "JEANS",
      "PANTALONI",
      "MAGLIA",
      "CAMICIA",
      "BORSA",
      "CINTURA",
      "SNEAKERS",
      "TACCHI",
      "TRENCH",
      "GIACCA",
      "GIUBOTTO",
      "ABITO",
    ],
  };

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

  const handleFilterBySeason = (season) => {
    setSelectedSeason(season);
  };

  return (
    <div className="my-outfits-container row justify-content-center">
      <Link to="/MyNavbar">
        <img src={logo} alt="logo" style={{ width: "150px", height: "auto" }} />
      </Link>
      <Dropdown>
        <Dropdown.Toggle className="custom-button m-2" id="dropdown-basic">
          {selectedSeason || "Tutte le stagioni"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            key="Estate"
            onClick={() => handleFilterBySeason("Estate")}
          >
            <i className="bi bi-brightness-high mx-1"></i>
            Estate
          </Dropdown.Item>
          <Dropdown.Item
            key="PrimaveraAutunno"
            onClick={() => handleFilterBySeason("PrimaveraAutunno")}
          >
            <i className="bi bi-cloud-sun mx-1"></i>
            Primavera/Autunno
          </Dropdown.Item>
          <Dropdown.Item
            key="Inverno"
            onClick={() => handleFilterBySeason("Inverno")}
          >
            <i className="bi bi-snow2 mx-1"></i>
            Inverno
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {myOutfits
        .filter(
          (outfit) =>
            !selectedSeason ||
            outfit.indumenti.every((indumento) =>
              seasonsMap[selectedSeason].includes(indumento.tipo)
            )
        )
        .map((outfit) => (
          <Card key={outfit.id} className="m-1 col-12 col-md-3">
            <Card.Body>
              <Card.Title>Outfit {outfit.id}</Card.Title>
              <Card.Text>
                {outfit.indumenti &&
                  outfit.indumenti.map((indumento) => (
                    <div key={indumento.id}>
                      <Card.Img
                        variant="top"
                        src={indumento.image}
                        alt={indumento.tipo}
                        style={{ width: "100px", height: "auto" }}
                        className="align-self-center"
                      />
                      <p>{indumento.tipo}</p>
                      <p>{indumento.colore}</p>
                    </div>
                  ))}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default Outfits;
