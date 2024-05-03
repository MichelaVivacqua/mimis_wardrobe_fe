import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Se la richiesta ha avuto successo, ottieni il token dalla risposta
        const data = await response.json();
        const token = data.token;

        // Memorizza il token nel localStorage
        localStorage.setItem("token", token);

        // Reindirizza l'utente a una nuova pagina
        navigate("/dashboard");
      } else {
        // Altrimenti, gestisci l'errore
        console.error("Errore durante il login:", response.statusText);
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group className="mt-5 mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Inserisci qui la tua email"
          value={email}
          onChange={handleEmailChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Inserisci qui la tua password"
          value={password}
          onChange={handlePasswordChange}
        />
      </Form.Group>
      <Button type="submit" className="custom-button">
        Accedi
      </Button>
      <div className="m-3">
        <Form.Text>Non hai ancora un account?</Form.Text>
      </div>
      <div>
        <Link to="./Registrazione" className="linknondecorato">
          Registrati
        </Link>
      </div>
    </Form>
  );
};

export default Login;
