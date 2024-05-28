import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import logo from "../assets/OIG4 (6).jpg";

const ModificaProfilo = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const errorTimeout = setTimeout(() => setError(""), 5000);
    const successTimeout = setTimeout(() => setSuccessMessage(""), 5000);

    return () => {
      clearTimeout(errorTimeout);
      clearTimeout(successTimeout);
    };
  }, [error, successMessage]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://amused-jeniece-mimiswardrobe-dcb5d9c7.koyeb.app/utenti/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          console.error("Errore nel caricamento dei dati dell'utente");
        }
      } catch (error) {
        console.error("Errore nel caricamento dei dati dell'utente:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Le password non corrispondono");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const utenteId = userData.id;
      const response = await fetch(
        `http://amused-jeniece-mimiswardrobe-dcb5d9c7.koyeb.app/utenti/${utenteId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            name,
            surname,
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        setSuccessMessage("DATI MODIFICATI CON SUCCESSO!");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
    }
  };

  return (
    <div className="login-container">
      <Link to="/MyNavbar">
        <img src={logo} alt="logo" style={{ width: "150px", height: "auto" }} />
      </Link>
      <Form onSubmit={handleFormSubmit}>
        <div className="m-2">Inserisci qui i tuoi dati aggiornati</div>
        <Form.Group className="m-2">
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="m-2">
          <Form.Control
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="m-2">
          <Form.Control
            type="text"
            placeholder="Cognome"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="m-2" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="m-2" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="m-2" controlId="formBasicConfirmPassword">
          <Form.Control
            type="password"
            placeholder="Conferma Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        {error && <p className="text-danger">{error}</p>}
        {successMessage && <p className="text-success">{successMessage}</p>}
        <Button type="submit" className="custom-button">
          Salva
        </Button>
      </Form>
    </div>
  );
};

export default ModificaProfilo;
