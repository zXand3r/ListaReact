import React from "react";
import { Place } from "./Place";
import "./PlaceList.css";

export function PlaceList({ category, city, places, searchText, searchTextPlace }) {
  // Filtra i posti in base al testo di ricerca
  const filteredPlaces = places.filter((place) => {
    const nameMatch = place.name.toLowerCase().includes(searchTextPlace.toLowerCase());
    const cityMatch = city.toLowerCase().includes(searchText.toLowerCase());
    return nameMatch && cityMatch;
  });

  return (
    <div className="list">
      <h2>{category} - {city}</h2>
      <ul>
        {filteredPlaces.map((place, index) => (
          <Place key={index} place={place} />
        ))}
      </ul>
    </div>
  );
}
