import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CreaIndumento = () => {
  const [imageFile, setImageFile] = useState(null);
  const [colore, setColore] = useState("");
  const [tipo, setTipo] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await uploadImage();
      if (imageUrl) {
        const indumentoId = await recuperotoken(imageUrl);
        if (indumentoId) {
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

  const recuperotoken = async (imageUrl) => {
    const token = localStorage.getItem("token");

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
          imageUrl,
          colore: colore.toUpperCase(),
          tipo: tipo.toUpperCase(),
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

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "your_cloudinary_upload_preset");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.secure_url;
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
