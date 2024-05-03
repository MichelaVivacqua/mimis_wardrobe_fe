import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Registrazione = () => (
  <Form>
    <div className="m-2">Inserisci qui i tuoi dati per registrarti!</div>
    <Form.Group className="m-2">
      <Form.Control type="text" placeholder="Username" />
    </Form.Group>

    <Form.Group className="m-2">
      <Form.Control type="text" placeholder="Nome" />
    </Form.Group>

    <Form.Group className="m-2">
      <Form.Control type="text" placeholder="Cognome" />
    </Form.Group>

    <Form.Group className="m-2" controlId="formBasicEmail">
      <Form.Control type="email" placeholder="Email" />
    </Form.Group>

    <Form.Group className="m-2" controlId="formBasicPassword">
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>

    <Form.Group className="m-2">
      <Form.Control type="text" placeholder="Immagine del profilo" />
    </Form.Group>

    <Button type="submit" className="custom-button">
      Crea il mio account
    </Button>
  </Form>
);

export default Registrazione;
