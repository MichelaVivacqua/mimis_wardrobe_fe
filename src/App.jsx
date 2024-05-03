import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import MyNavbar from "./components/MyNavbar";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <>
        <header className="container-fluid">
          <MyNavbar />
        </header>
        <main className="container-fluid">
          <Routes>
            <Route element={<Login />} path="/" />
            {/* <Route element={<Registrazione/>} path="/Registrazione" /> */}
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
