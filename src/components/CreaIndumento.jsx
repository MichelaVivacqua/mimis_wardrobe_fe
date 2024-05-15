import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import logo from "../assets/OIG4 (6).jpg";

const CreaIndumento = () => {
  const [imageFile, setImageFile] = useState(null);
  const [colore, setColore] = useState("");
  const [tipo, setTipo] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const indumentoId = uuidv4();
  let imageUrl = "";

  useEffect(() => {
    const errorTimeout = setTimeout(() => setError(""), 5000);
    const successTimeout = setTimeout(() => setSuccessMessage(""), 5000);

    return () => {
      clearTimeout(errorTimeout);
      clearTimeout(successTimeout);
    };
  }, [error, successMessage]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      imageUrl = await uploadImage(token, indumentoId);
      if (imageUrl) {
        await saveindumento(token);
        if (true) {
          setSuccessMessage("INDUMENTO CREATO CON SUCCESSO");
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
    <div className="indumento-container">
      <Link to="/MyNavbar">
        <img src={logo} alt="logo" style={{ width: "150px", height: "auto" }} />
      </Link>

      <Form onSubmit={handleFormSubmit}>
        <div className="m-5">Crea il tuo indumento!</div>
        <Form.Group className="m-3">
          <Form.Control
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </Form.Group>

        <Form.Group className="m-3">
          <Form.Select
            value={colore}
            onChange={(e) => setColore(e.target.value)}
          >
            <option value="">Colore</option>
            <option value="bianco">Bianco</option>
            <option value="NERO">Nero</option>
            <option value="bordeaux">Bordeaux</option>
            <option value="rosso">Rosso</option>
            <option value="arancione">Arancione</option>
            <option value="giallo">Giallo</option>
            <option value="verde">Verde</option>
            <option value="blu">Blu</option>
            <option value="ciano">Ciano</option>
            <option value="azzurro">Azzurro</option>
            <option value="viola">Viola</option>
            <option value="lilla">Lilla</option>
            <option value="rosa">Rosa</option>
            <option value="magenta">Magenta</option>
            <option value="grigio">Grigio</option>
            <option value="marrone">Marrone</option>
            <option value="beige">Beige</option>
            <option value="oro">Oro</option>
            <option value="ARGENTO">Argento</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="m-3">
          <Form.Select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Tipo</option>
            <option value="jeans">Jeans</option>
            <option value="pantaloni">Pantaloni</option>
            <option value="gonna">Gonna</option>
            <option value="pantaloncini">Pantaloncini</option>
            <option value="TOP">Top</option>
            <option value="maglioncino">Maglioncino</option>
            <option value="maglia">Maglia</option>
            <option value="felpa">Felpa</option>
            <option value="camicia">Camicia</option>
            <option value="canottiera">Canottiera</option>
            <option value="BODY">Body</option>
            <option value="tuta">Tuta</option>
            <option value="abito">Abito</option>
            <option value="borsa">Borsa</option>
            <option value="cintura">Cintura</option>
            <option value="sneakers">Sneakers</option>
            <option value="sandali">Sandali</option>
            <option value="tacchi">Tacchi</option>
            <option value="anfibi">Anfibi</option>
            <option value="stivali">Stivali</option>
            <option value="sciarpa">Sciarpa</option>
            <option value="cappotto">Cappotto</option>
            <option value="trench">Trench</option>
            <option value="giacca">Giacca</option>
            <option value="giubotto">Giubotto</option>
          </Form.Select>
        </Form.Group>
        {error && <p className="text-danger m-2">{error}</p>}
        {successMessage && <p className="text-success m-2">{successMessage}</p>}
        <Button type="submit" className="custom-button">
          SALVA
        </Button>
      </Form>
    </div>
  );
};

export default CreaIndumento;
