import React from "react";
import { PlaceList } from "./PlaceList";
import "./Category.css";

export function Category({ category, cities, searchText, searchTextPlace }) {
  const filteredCities = Object.keys(cities).filter((city) =>
    city.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="categoryContainer">
      {filteredCities.length ? (
        filteredCities.map((city) => (
          <PlaceList
            key={`${category}-${city}`}
            category={category}
            city={city}
            places={cities[city]}
            searchText={searchText}
            searchTextPlace={searchTextPlace} // Passa il nuovo testo di ricerca
          />
        ))
      ) : (
        <div className="noResults">Error</div>
      )}
    </div>
  );
}
