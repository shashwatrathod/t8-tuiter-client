import React from "react";
import './styles.css';
import Tuiter from "./components/tuiter";
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Tuiter />
    </HashRouter>
  );
}

export default App;
