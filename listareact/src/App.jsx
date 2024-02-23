import React, { useState } from "react";
import { places } from "./places";
import { Category } from "./Category";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const clearSearchText = () => {
    setSearchText(""); // Imposta il testo di ricerca a una stringa vuota quando si clicca sulla X
  };

  return (
    <div className="mainContainer">
      <div className="searchBar">
        <input
          className="input"
          type="text"
          placeholder="Filtra per località..."
          value={searchText}
          onChange={handleSearchChange}
        />
        {searchText.length > 0 && ( // Mostra la "X" solo quando il testo di ricerca non è vuoto
          <button className="clearButton" onClick={clearSearchText}>
            X
          </button>
        )}
      </div>
      <div className="containerLista">
        <h1 className="titoloLista">Lista dei Posti</h1>
        {Object.keys(places).map((category) => (
          <Category
            key={category}
            category={category}
            cities={places[category]}
            searchText={searchText}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
