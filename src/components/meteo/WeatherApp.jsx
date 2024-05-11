import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form, FormControl, Button } from "react-bootstrap";
import FetchWeatherData from "./FetchWeatherData";
import { Link } from "react-router-dom";
import logo from "../../assets/OIG4 (6).jpg";

const WeatherApp = (props) => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  //   const [fetchingLocation, setFetchingLocation] = useState(false);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  //   const handleLocationButtonClick = () => {
  //     setFetchingLocation(true);
  //     navigator.geolocation.getCurrentPosition(
  //       async (position) => {
  //         try {
  //           const weatherResponse = await FetchWeatherData(
  //             null,
  //             position.coords.latitude,
  //             position.coords.longitude
  //           );
  //           setWeatherData(weatherResponse);
  //           setError(null);

  //           const forecastResponse = await FetchForecastData(
  //             null,
  //             position.coords.latitude,
  //             position.coords.longitude
  //           );
  //           setForecastData(forecastResponse);
  //         } catch (error) {
  //           console.error("Error fetching data:", error);
  //           setError("Errore durante il recupero dei dati. Riprova più tardi.");
  //         }
  //         setFetchingLocation(false);
  //       },
  //       (error) => {
  //         console.error("Error getting user location:", error);
  //         setError("Impossibile rilevare la tua posizione.");
  //         setFetchingLocation(false);
  //       }
  //     );
  //   };

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
          {/* <Button
            className="m-2"
            variant="primary"
            disabled={fetchingLocation}
            onClick={handleLocationButtonClick}
          >
            {" "}
            <i className="bi bi-geo-alt"></i>
            {fetchingLocation ? "Rilevando posizione..." : "Rileva Posizione"}
          </Button> */}
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
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default WeatherApp;
