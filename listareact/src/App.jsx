import React from "react";
import { places } from "./places";
import { Category } from "./Category";
import "./App.css";
function App() {
  return (
    <div className="mainContainer">
      <div className="containerLista">
        <h1 className="titoloLista">Lista dei Posti</h1>
        {Object.keys(places).map((category) => (
          <Category
            key={category}
            category={category}
            cities={places[category]}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
