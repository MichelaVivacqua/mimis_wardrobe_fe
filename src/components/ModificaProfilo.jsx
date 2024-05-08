import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ModificaProfilo = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3001/utenti/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
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

    try {
      const token = localStorage.getItem("token");
      const utenteId = userData.id;
      const response = await fetch(`http://localhost:3001/utenti/${utenteId}`, {
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
      });

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
    <Form onSubmit={handleFormSubmit}>
      {error && <p className="text-danger">{error}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}
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
      <Button type="submit" className="custom-button">
        Salva
      </Button>
    </Form>
  );
};

export default ModificaProfilo;
