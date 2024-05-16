import React from "react";
import { PlaceList } from "./PlaceList";
import "./Category.css";

export function Category({ category, cities, searchText, searchTextPlace }) {
  const filteredCities = Object.keys(cities).filter((city) =>
    city.toLowerCase().includes(searchText.toLowerCase())
  );

  // Verifica se ci sono posti filtrati in questa categoria
  const hasFilteredPlaces = filteredCities.some((city) =>
    cities[city].some((place) =>
      place.name.toLowerCase().includes(searchTextPlace.toLowerCase())
    )
  );

  // Se non ci sono posti filtrati in questa categoria, nascondi la categoria
  if (!hasFilteredPlaces) {
    return null;
  }

  return (
    <div className="categoryContainer">
      {filteredCities.map((city) => (
        <PlaceList
          key={`${category}-${city}`}
          category={category}
          city={city}
          places={cities[city]}
          searchText={searchText}
          searchTextPlace={searchTextPlace}
        />
      ))}
    </div>
  );
}