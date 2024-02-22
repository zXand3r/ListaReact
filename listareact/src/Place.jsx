import "./Place.css";

export function Place({ place }) {
  return (
    <li className="container">
      <a href={place.url} className="name">
        <h3 className="name">{place.name}</h3>
      </a>
      {place.menu ? (
        <button className="menuButton">
          <a href={place.menu}>Menù</a>
        </button>
      ) : (
        <button className="menuButton">
          <p>Not Available</p>
        </button>
      )}
    </li>
  );
}
