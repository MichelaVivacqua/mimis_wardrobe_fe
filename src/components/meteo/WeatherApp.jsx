import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form, FormControl, Button } from "react-bootstrap";
import FetchWeatherData from "./FetchWeatherData";
import { Link } from "react-router-dom";
import logo from "../../assets/OIG4 (6).jpg";
import Card from "react-bootstrap/Card";

const WeatherApp = (props) => {
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

      const response = await fetch("http://localhost:3001/abbinamenti/miei", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
    <Container fluid style={{ backgroundColor: "#FFDAB9" }}>
      <Link to="/MyNavbar">
        <img
          src={logo}
          alt="logo"
          style={{ width: "150px", height: "auto" }}
          className="m-3"
        />
      </Link>
      <Row>
        <Col
          xs={12}
          className="d-flex flex-column justify-content-center align-items-center m-3"
        >
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
                <div className="my-outfits-container row justify-content-center">
                  {filterOutfitsBySeason(outfitType || "").map((outfit) => (
                    <Card key={outfit.id} className="m-1 col-12">
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
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default WeatherApp;
