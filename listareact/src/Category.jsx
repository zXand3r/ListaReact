import { PlaceList } from "./PlaceList";
import "./Category.css"

export function Category({ category, cities }) {
   return (
       <div className="categoryContainer">
           {Object.keys(cities).map(city => (
               <PlaceList
                   key={`${category}-${city}`}
                   category={category}
                   city={city}
                   places={cities[city]}
               />
           ))}
       </div>
   );
}
