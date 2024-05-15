import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import logo from "../assets/OIG4 (6).jpg";

const Registrazione = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const errorTimeout = setTimeout(() => setError(""), 5000);
    const successTimeout = setTimeout(() => setSuccessMessage(""), 5000);

    return () => {
      clearTimeout(errorTimeout);
      clearTimeout(successTimeout);
    };
  }, [error, successMessage]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          name,
          surname,
          email,
          password,
        }),
      });

      if (response.ok) {
        setSuccessMessage(
          "UTENTE REGISTRATO CON SUCCESSO! Puoi effettuare il login."
        );
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
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
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          style={{ width: "150px", height: "auto" }}
          className="m-3"
        />
      </Link>
      {successMessage ? (
        <p className="text-success">{successMessage}</p>
      ) : (
        <Form onSubmit={handleFormSubmit}>
          {error && <p className="text-danger">{error}</p>}
          <div className="m-2">Inserisci qui i tuoi dati per registrarti!</div>
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

          <Button type="submit" className="custom-button">
            Crea il mio account
          </Button>
        </Form>
      )}
    </div>
  );
};

export default Registrazione;
