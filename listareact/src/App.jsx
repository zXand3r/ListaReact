import React, { useState, useEffect } from "react";
import { places } from "./places";
import { Category } from "./Category";
import "./App.css";
import { isNewPlace } from "./Place.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import whatsappIcon from "./assets/whatsapp.svg";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchTextPlace, setSearchTextPlace] = useState("");
  const [newPlacesAdded, setNewPlacesAdded] = useState([]);
  const [toggleNotification, setToggleNotification] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState("");

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
            dateAdded: newCityPlaces[0].dateAdded, // Prendi la data del primo posto nuovo
          });
        }
      }
    }
    setNewPlacesAdded(newPlaces);
    setLastUpdated(new Date()); // Aggiorna la data dell'ultimo aggiornamento
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Ciao, puoi aggiungere questo: [Inserisci qui l'instagram del posto]"
    );
    window.open(`https://wa.me/3249854894?text=${message}`);
  };

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const formatDateNotification = (date) => {
    const options = { day: "2-digit", month: "long"};
    const formattedDate = new Date(date).toLocaleDateString("it-IT", options);
    return formattedDate;
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleNotificationClick = (city) => {
    setSearchText(city);
    setSelectedCategory("");
    toggleNotifications();
  };

  return (
    <div className="mainContainer" translate="no">
       <div className="corner-image top-left"></div>
      <div className="corner-image top-right"></div>
      <div className="corner-image bottom-left"></div>
      <div className="corner-image right"></div>
      <div className="corner-image bottom-right2"></div>
      {toggleNotification &&
        (newPlacesAdded.length > 0 ? (
          <ul className="notification">
            {newPlacesAdded.map((newPlace, index) => (
              <li key={index}>
                 {newPlace.count === 1
                  ? "1 posto aggiunto a"
                  : `${newPlace.count} posti aggiunti a`}{"➡️"}
                <span
                  style={{
                    color: "#3fade9",
                    fontWeight: "bolder",
                    fontStyle: "italic",
                    cursor: "pointer",
                  }}
                  onClick={() => handleNotificationClick(newPlace.city)}
                >
                  {newPlace.city}
                </span>{" "}
                - <strong>{newPlace.category}</strong>
                <span
                style={{
                  fontSize: "12px"
                }}>
                  {" "} - {formatDateNotification(newPlace.dateAdded)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <h3 className="notificationNone">
            😄Nessun nuovo posto aggiunto nell'
            <span
              style={{
                textDecoration: "underline",
                textDecorationColor: "cyan",
              }}
            >
              ultima settimana
            </span>
            😄
          </h3>
        ))}
        <button
        className="toggleNotificationButton"
        onClick={toggleNotifications}
      >
        {toggleNotification ? "Nascondi 🤫" : "Mostra aggiunti nell'ultima settimana😉"}
      </button>
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
      <div className="dropdown">
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Tutte le categorie</option>
          {Object.keys(places).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="lastUpdated">
        Ultimo aggiornamento: {formatDate(lastUpdated)}
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
            selectedCategory={selectedCategory}
          />
        ))}
      </div>
      {showScrollButton && (
        <>
          <div className="whatsappButton" onClick={handleWhatsApp}>
            <img src={whatsappIcon} alt="whatsapp Logo" />
          </div>
          <button className="scrollButton" onClick={scrollToTop}>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </>
      )}
    </div>
  );
}

export default App;
