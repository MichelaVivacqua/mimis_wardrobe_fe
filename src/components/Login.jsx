import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/OIG4 (6).jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const errorTimeout = setTimeout(() => setError(""), 5000);

    return () => {
      clearTimeout(errorTimeout);
    };
  }, [error]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://amused-jeniece-mimiswardrobe-dcb5d9c7.koyeb.app/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

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
      setError(
        "Si è verificato un errore durante il login. Si prega di riprovare."
      );
    }
  };

  return (
    <div className="login-container">
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
    </div>
  );
};

export default Login;
