import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CreaIndumento = () => {
  const [image, setImage] = useState("");
  const [colore, setColore] = useState("");
  const [tipo, setTipo] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await recuperotoken();
    } catch (error) {
      console.error("Errore durante il salvataggio dell'indumento:", error);
    }
  };

  const recuperotoken = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token non trovato");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/indumenti", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image,
          colore: colore.toUpperCase(),
          tipo: tipo.toUpperCase(),
        }),
      });

      if (response.ok) {
        setSuccessMessage("INDUMENTO CREATO CON SUCCESSO");
        setImage("");
        setColore("");
        setTipo("");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Errore durante il salvataggio dell'indumento:", error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleFormSubmit}>
        {error && <p className="text-danger">{error}</p>}
        <div className="m-5">Crea il tuo indumento!</div>
        <Form.Group className="m-3">
          <Form.Control
            type="text"
            placeholder="URL foto indumento"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="m-3">
          <Form.Control
            type="text"
            placeholder="Colore"
            value={colore}
            onChange={(e) => setColore(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="m-3">
          <Form.Control
            type="text"
            placeholder="Tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" className="custom-button">
          SALVA
        </Button>
      </Form>
      {successMessage && <p className="text-success m-3">{successMessage}</p>}
    </div>
  );
};

export default CreaIndumento;
