import React, { useState, useEffect } from "react";
import { places } from "./places";
import { Category } from "./Category";
import "./App.css";
import { isNewPlace } from "./Place.jsx";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchTextPlace, setSearchTextPlace] = useState("");
  const [newPlacesAdded, setNewPlacesAdded] = useState([]);
  const [toggleNotification, setToggleNotification] = useState(false);

  useEffect(() => {
    const newPlaces = [];
    for (const category in places) {
      for (const city in places[category]) {
        const cityPlaces = places[category][city];
        const newCityPlaces = cityPlaces.filter((place) => {
          return isNewPlace(place.dateAdded);
        });
        if (newCityPlaces.length > 0) {
          newPlaces.push({
            city,
            count: newCityPlaces.length,
            category: category,
          });
        }
      }
    }
    setNewPlacesAdded(newPlaces);
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setSearchTextPlace(""); // Disattiva l'altra searchbar
  };

  const handleSearchPlaceChange = (event) => {
    setSearchTextPlace(event.target.value);
    setSearchText(""); // Disattiva l'altra searchbar
  };

  const clearSearchText = () => {
    setSearchText("");
    setSearchTextPlace("");
  };

  const toggleNotifications = () => {
    setToggleNotification(!toggleNotification);
  };

  return (
    <div className="mainContainer">
      <button
        className="toggleNotificationButton"
        onClick={toggleNotifications}
      >
        {toggleNotification ? "Nascondi nuovi posti" : "Mostra nuovi posti"}
      </button>
      {toggleNotification &&
        (newPlacesAdded.length > 0 ? (
          <ul className="notification">
            {newPlacesAdded.map((newPlace, index) => (
              <li key={index}>
                {newPlace.count} nuovi posti aggiunti a <span style={{color: "#3fade9", fontWeight: "bolder", fontStyle: "italic"}}>{newPlace.city}</span> -{" "}
                <strong>{newPlace.category}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <h3 className="notificationNone">
          😄Nessun nuovo posto aggiunto nell'<span style={{textDecoration: "underline", textDecorationColor: "cyan"}}>
            ultima settimana</span>😄
        </h3>
        ))}
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
      <div className="searchBar">
        <input
          className="input"
          type="text"
          placeholder="Filtra per nome posto..."
          value={searchTextPlace}
          onChange={handleSearchPlaceChange}
        />
        {searchTextPlace.length > 0 && (
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
            searchTextPlace={searchTextPlace}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
