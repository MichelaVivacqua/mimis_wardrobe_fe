import { render, screen } from "@testing-library/react";
import Login from "./components/Login";
import { BrowserRouter } from "react-router-dom";
import CreaIndumento from "./components/CreaIndumento";
import FiltroTipologia from "./components/FiltroTipologia";

test("Verifico che i campi email,password e login siano presenti", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const emailInput = screen.getByPlaceholderText(/Inserisci qui la tua email/i);
  expect(emailInput).toBeInTheDocument();

  const passwordInput = screen.getByPlaceholderText(
    /Inserisci qui la tua password/i
  );
  expect(passwordInput).toBeInTheDocument();

  const loginButton = screen.getByText(/Accedi/i);
  expect(loginButton).toBeInTheDocument();
});

test("Verifico che i campi immagine indumento, tipo e colore e il tasto di submit siano presenti", () => {
  render(
    <BrowserRouter>
      <CreaIndumento />
    </BrowserRouter>
  );

  const tipo = screen.getByText(/tipo/i);
  expect(tipo).toBeInTheDocument();

  const colore = screen.getByText(/colore/i);
  expect(colore).toBeInTheDocument();

  const submit = screen.getByText(/salva/i);
  expect(submit).toBeInTheDocument();
});

test("Verifica che il componente Armadio filtro tipologia venga renderizzato correttamente", () => {
  render(
    <BrowserRouter>
      <FiltroTipologia />
    </BrowserRouter>
  );

  const logo = screen.getByAltText("logo");
  expect(logo).toBeInTheDocument();

  const dropdown = screen.getByText(/Seleziona tipo/i);
  expect(dropdown).toBeInTheDocument();
});
