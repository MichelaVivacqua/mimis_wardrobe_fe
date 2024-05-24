import { render, screen } from "@testing-library/react";
import Login from "./components/Login";
import { BrowserRouter } from "react-router-dom";

test("renders login form with email and password inputs and login button", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  // Verifica che il campo email sia presente
  const emailInput = screen.getByPlaceholderText(/Inserisci qui la tua email/i);
  expect(emailInput).toBeInTheDocument();

  // Verifica che il campo password sia presente
  const passwordInput = screen.getByPlaceholderText(
    /Inserisci qui la tua password/i
  );
  expect(passwordInput).toBeInTheDocument();

  // Verifica che il pulsante di login sia presente
  const loginButton = screen.getByText(/Accedi/i);
  expect(loginButton).toBeInTheDocument();
});
