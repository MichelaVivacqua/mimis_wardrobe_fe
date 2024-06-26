import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form, FormControl, Button } from "react-bootstrap";
import FetchWeatherData from "./FetchWeatherData";
import { Link } from "react-router-dom";
import logo from "../../assets/OIG4 (6).jpg";
import Card from "react-bootstrap/Card";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [outfitType, setOutfitType] = useState(null);
  const [outfits, setOutfits] = useState([]);
  const [seasonsMap] = useState({
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
      "BLAZER",
    ],
  });

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const determineOutfitType = (temperature) => {
    if (temperature > 28) {
      return "Estate";
    } else if (temperature >= 15 && temperature <= 28) {
      return "PrimaveraAutunno";
    } else {
      return "Inverno";
    }
  };

  const filterOutfitsBySeason = (selectedSeason) => {
    return outfits.filter((outfit) =>
      outfit.indumenti.every((indumento) =>
        seasonsMap[selectedSeason].includes(indumento.tipo)
      )
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!city) {
      setError("Inserisci una città valida.");
      return;
    }
    try {
      const weatherResponse = await FetchWeatherData(city);
      setWeatherData(weatherResponse);
      setError(null);

      const temperature = weatherResponse.main.temp;
      const type = determineOutfitType(temperature);
      setOutfitType(type);

      const response = await fetch(
        "https://amused-jeniece-mimiswardrobe-dcb5d9c7.koyeb.app/abbinamenti/miei",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Errore durante la richiesta.");
      }
      const data = await response.json();
      setOutfits(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Errore durante il recupero dei dati. Riprova più tardi.");
    }
    setCity("");
  };

  return (
    <div className="outfit-container">
      <Link to="/MyNavbar">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <Row>
        <Col className="d-flex flex-column justify-content-center align-items-center m-3">
          <h5>Dove andrai oggi? </h5>
          <Form onSubmit={handleSubmit} className="mb-2 d-flex">
            <FormControl
              type="text"
              placeholder="Scrivi qui la città"
              className="mr-sm-2"
              value={city}
              onChange={handleInputChange}
              style={{ backgroundColor: "white", width: "300px" }}
            />
            <Button className="custom-button" type="submit">
              Cerca
            </Button>
          </Form>
        </Col>
        <Col
          xs={12}
          className="d-flex flex-column justify-content-center align-items-center m-3"
        >
          {error && <p style={{ color: "red" }}>{error}</p>}
          {weatherData && (
            <div className="d-flex flex-column justify-content-center align-items-center m-3">
              <h2>Il meteo di oggi a {weatherData.name}</h2>
              <h4>Temperatura: {weatherData.main.temp} °C</h4>

              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}
              />
              <h5>{weatherData.weather[0].description}</h5>
              {outfitType && (
                <p>
                  Suggerimento outfit: <strong>{outfitType}</strong>
                </p>
              )}

              {outfits.length > 0 && (
                // <div className="row justify-content-center">
                <div className="outfit-container">
                  {filterOutfitsBySeason(outfitType || "").map((outfit) => (
                    <Card key={outfit.id} className="card-horizontal m-1">
                      <div className="images-container">
                        {outfit.indumenti &&
                          outfit.indumenti.map((indumento) => (
                            <img
                              key={indumento.id}
                              src={indumento.image}
                              alt={indumento.tipo}
                            />
                          ))}
                      </div>
                      <Card.Body>
                        <Card.Title className="card-title">
                          Outfit {outfit.id}
                        </Card.Title>
                        <Card.Text className="card-text">
                          {outfit.indumenti &&
                            outfit.indumenti.map((indumento) => (
                              <div key={indumento.id}>
                                <p>
                                  {indumento.tipo} {indumento.colore}
                                </p>
                              </div>
                            ))}
                          {outfit.dataIndossato && (
                            <p
                              style={{
                                backgroundColor: "white",
                                color: "#e24b3d",
                              }}
                            >
                              Indossato il:{" "}
                              {new Date(
                                outfit.dataIndossato
                              ).toLocaleDateString()}
                            </p>
                          )}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
                // </div>
              )}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default WeatherApp;
