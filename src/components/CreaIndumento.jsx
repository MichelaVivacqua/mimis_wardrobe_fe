import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";

const CreaIndumento = () => {
  const [imageFile, setImageFile] = useState(null);
  const [colore, setColore] = useState("");
  const [tipo, setTipo] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const indumentoId = uuidv4();
  let imageUrl = "";

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      imageUrl = await uploadImage(token, indumentoId);
      if (imageUrl) {
        await saveindumento(token);
        if (true) {
          setSuccessMessage("Indumento creato con successo");
          setImageFile(null);
          setColore("");
          setTipo("");
        }
      }
    } catch (error) {
      console.error("Errore durante il salvataggio dell'indumento:", error);
    }
  };

  const saveindumento = async (token) => {
    if (!token) {
      console.error("Token non trovato");
      return null;
    }

    try {
      const response = await fetch("http://localhost:3001/indumenti", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageUrl,
          colore: colore.toUpperCase(),
          tipo: tipo.toUpperCase(),
          id: indumentoId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.indumentoId;
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        return null;
      }
    } catch (error) {
      console.error("Errore durante il salvataggio dell'indumento:", error);
      return null;
    }
  };

  const uploadImage = async (token, indumentoId) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      console.log(indumentoId);
      const response = await fetch(
        `http://localhost:3001/indumenti/upload/${indumentoId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.imageUrl;
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        return null;
      }
    } catch (error) {
      console.error("Errore durante il caricamento dell'immagine:", error);
      return null;
    }
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}
      <Form onSubmit={handleFormSubmit}>
        <div className="m-5">Crea il tuo indumento!</div>
        <Form.Group className="m-3">
          <Form.Control
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
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
    </div>
  );
};

export default CreaIndumento;
