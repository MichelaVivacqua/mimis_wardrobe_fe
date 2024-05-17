import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import logo from "../assets/OIG4 (6).jpg";

const Outfits = () => {
  const [myOutfits, setMyOutfits] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [wornOutfits, setWornOutfits] = useState([]);

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
      "SANDALI",
      "TUTA",
      "COSTUME",
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

  const markAsWorn = async (outfitId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/abbinamenti/${outfitId}/indossato`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Errore durante l'aggiornamento dello stato.");
      }

      const updatedOutfit = await response.json();

      setWornOutfits((prevWornOutfits) => [...prevWornOutfits, outfitId]);
      setMyOutfits((prevOutfits) =>
        prevOutfits
          .filter((outfit) => outfit.id !== outfitId)
          .concat(updatedOutfit)
      );
    } catch (error) {
      console.error("Errore durante l'aggiornamento dello stato:", error);
    }
  };

  return (
    <div className="indumento-container">
      <Link to="/MyNavbar">
        <img src={logo} alt="logo" className="logo" />
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

      <div className="cards-container">
        {myOutfits
          .filter(
            (outfit) =>
              !selectedSeason ||
              outfit.indumenti.every((indumento) =>
                seasonsMap[selectedSeason].includes(indumento.tipo)
              )
          )
          .map((outfit) => (
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
                  {outfit.dataIndossato && (
                    <p style={{ backgroundColor: "white", color: "#e24b3d" }}>
                      Indossato il:{" "}
                      {new Date(outfit.dataIndossato).toLocaleDateString()}
                    </p>
                  )}
                </Card.Text>
                <button
                  className="btn btn-secondary"
                  onClick={() => markAsWorn(outfit.id)}
                >
                  INDOSSATO!
                </button>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Outfits;
