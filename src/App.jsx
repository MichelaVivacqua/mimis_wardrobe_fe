import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import MyNavbar from "./components/MyNavbar";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registrazione from "./components/Registrazione";
import CreaIndumento from "./components/CreaIndumento";
import EliminaIndumento from "./components/EliminaIndumento";
import Armadio from "./components/Armadio";

function App() {
  return (
    <BrowserRouter>
      <>
        <main className="container-fluid">
          <Routes>
            <Route element={<Login />} path="/" />
            <Route element={<Registrazione />} path="/Registrazione" />
            <Route element={<MyNavbar />} path="/MyNavbar" />
            <Route element={<CreaIndumento />} path="/MyNavbar/CreaIndumento" />
            <Route
              element={<EliminaIndumento />}
              path="/MyNavbar/EliminaIndumento"
            />
            <Route element={<Armadio />} path="/MyNavbar/Armadio" />
            <Route
              element={
                <h1 className="text-center">ERRORE 404 - PAGINA NON TROVATA</h1>
              }
              path="*"
            />
          </Routes>
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
