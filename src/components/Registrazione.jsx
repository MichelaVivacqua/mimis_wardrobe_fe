import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Registrazione = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [immagineProfilo, setImmagineProfilo] = useState("");
  const [ruolo, setRuolo] = useState("");
  const [error, setError] = useState("");

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
          propic: immagineProfilo,
          ruolo: ruolo.toUpperCase() === "ADMIN" ? "ADMIN" : "USER",
        }),
      });

      if (response.ok) {
        window.location.href = "/";
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

      <Form.Group className="m-5">
        <Form.Label>
          Immagine del profilo (puoi incollare un URL o caricarla dopo dal tuo
          dispositivo)
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="URL immagine del profilo qui"
          value={immagineProfilo}
          onChange={(e) => setImmagineProfilo(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="m-2">
        <Form.Control
          type="text"
          placeholder="RUOLO (USER o ADMIN)"
          value={ruolo}
          onChange={(e) => setRuolo(e.target.value)}
        />
      </Form.Group>

      <Button type="submit" className="custom-button">
        Crea il mio account
      </Button>
    </Form>
  );
};

export default Registrazione;
