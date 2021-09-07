import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import AppRouter from "./routing/AppRouter";
import { AlertProvider } from "./context/AlertContext";

function App() {
  return (
    <AlertProvider>
      <AppRouter />
    </AlertProvider>
  );
}

export default App;
