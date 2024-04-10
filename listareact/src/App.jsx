import React, { useState, useEffect } from "react";
import { places } from "./places";
import { Category } from "./Category";
import "./App.css";
import { isNewPlace } from './Place.jsx';

function App() {
  const [searchText, setSearchText] = useState("");
  const [newPlacesAdded, setNewPlacesAdded] = useState([]);

  useEffect(() => {
    const newPlaces = [];
    for (const category in places) {
      for (const city in places[category]) {
        const cityPlaces = places[category][city];
        const newCityPlaces = cityPlaces.filter(place => {
          return isNewPlace(place.dateAdded);
        });
        if (newCityPlaces.length > 0) {
          newPlaces.push({ city, count: newCityPlaces.length });
        }
      }
    }
    setNewPlacesAdded(newPlaces);
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const clearSearchText = () => {
    setSearchText("");
  };

  return (
    <div className="mainContainer">
      {newPlacesAdded.length > 0 && (
        <ul className="notification">
          {newPlacesAdded.map((newPlace, index) => (
            <li key={index}>
              {newPlace.count} nuovi posti aggiunti a {newPlace.city}
            </li>
          ))}
        </ul>
      )}
      <div className="searchBar">
        <input
          className="input"
          type="text"
          placeholder="Filtra per località..."
          value={searchText}
          onChange={handleSearchChange}
        />
        {searchText.length > 0 && (
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
