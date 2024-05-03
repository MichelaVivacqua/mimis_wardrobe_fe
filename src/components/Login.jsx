import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/OIG4 (6).jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
        const data = await response.json();
        const token = data.accessToken;

        localStorage.setItem("token", token);
        // console.log("token dell'utente loggato:" + token);

        navigate("/MyNavbar");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <img src={logo} alt="logo" style={{ width: "150px", height: "auto" }} />
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
      {error && <p className="text-danger">{error}</p>}{" "}
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
