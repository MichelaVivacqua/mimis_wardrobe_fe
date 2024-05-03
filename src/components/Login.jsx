import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Login = () => (
  <Form>
    <Form.Group className="mt-5 mb-3" controlId="formBasicEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Inserisci qui la tua email" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Inserisci qui la tua password"
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

export default Login;
