import React from "react";
import { Place } from "./Place";
import "./PlaceList.css";

export function PlaceList({ category, city, places, searchText, searchTextPlace }) {
  // Filtra i posti in base al testo di ricerca
  const filteredPlaces = places.filter((place) => {
    const nameMatch = place.name.toLowerCase().includes(searchTextPlace.toLowerCase());
    return nameMatch;
  });

  return (
    <div className="list">
      {filteredPlaces.length > 0 &&
        <div>
          <h2>
            {category} - {city}
          </h2>
          <ul>
            {filteredPlaces.map((place, index) => (
              <Place key={index} place={place} />
            ))}
          </ul>
        </div>
      }
    </div>
  );
}