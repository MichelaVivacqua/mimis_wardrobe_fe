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
import FiltroColore from "./components/FiltroColore";
import FiltroTipologia from "./components/FiltroTipologia";
import CreaAbbinamento from "./components/CreaAbbinamento";
import Outfits from "./components/Outfits";
import EliminaAbbinamento from "./components/EliminaAbbinamento";
import ModificaProfilo from "./components/ModificaProfilo";
import EliminaProfilo from "./components/EliminaProfilo";
import Stagioni from "./components/Stagioni";
import WeatherApp from "./components/meteo/WeatherApp";

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
            <Route element={<FiltroColore />} path="/MyNavbar/FiltroColore" />
            <Route
              element={<FiltroTipologia />}
              path="/MyNavbar/FiltroTipologia"
            />
            <Route
              element={<CreaAbbinamento />}
              path="/MyNavbar/CreaAbbinamento"
            />
            <Route element={<Outfits />} path="/MyNavbar/Outfits" />
            <Route
              element={<EliminaAbbinamento />}
              path="/MyNavbar/EliminaAbbinamento"
            />
            <Route
              element={<ModificaProfilo />}
              path="/MyNavbar/ModificaProfilo"
            />
            <Route
              element={<EliminaProfilo />}
              path="/MyNavbar/EliminaProfilo"
            />
            <Route element={<Stagioni />} path="/MyNavbar/Stagioni" />
            <Route element={<WeatherApp />} path="/MyNavbar/Meteo" />
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
