import React, { useEffect, useRef, useState } from "react";
import "./Place.css";

export function isNewPlace(dateAdded) {
  if (!dateAdded) return false;
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const addedDate = new Date(dateAdded);
  return addedDate > sevenDaysAgo;
}

export function Place({ place }) {
  const isNew = isNewPlace(place.dateAdded);
  const placeRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.9,
      }
    );

    const currentRef = placeRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [placeRef]);

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("it-IT");
  }

  return (
    <li
      translate="no"
      className={`container fadeIn ${isVisible ? "" : "fadeOut"}`}
      ref={placeRef}
    >
      <a
        href={place.url}
        className="name"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h3 className="name">{place.name}</h3>
        {isNew && <span className="newLabel">New</span>}
      </a>
      {place.menu ? (
        <a
          href={place.menuImage ? place.menuImage : place.menu}
          target="_blank"
          rel="noopener noreferrer"
          className="menuButton"
        >
          Menù
        </a>
      ) : (
        <button className="menuButton" disabled>
          Not Available
        </button>
      )}
      {place.dateAdded && <p style={{fontSize: "10px", opacity: "0.3", fontStyle:"italic"}}>aggiunto il: {formatDate(place.dateAdded)}</p>}
    </li>
  );
}
