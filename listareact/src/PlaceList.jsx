import { Place } from "./Place";
import "./PlaceList.css"
export function PlaceList({ category, city, places }) {
    return (
        <div className="list">
            <h2>{category} - {city}</h2>
            <ul>
                {places.map((place, index) => (
                    <Place key={index} place={place} />
                ))}
            </ul>
        </div>
    );
 }
