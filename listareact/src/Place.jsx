import React, { useEffect, useRef, useState } from 'react';
import './Place.css';

export function isNewPlace(dateAdded) {
  if (!dateAdded) return false; // Se la data di aggiunta non è disponibile, il posto non è nuovo
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7); // Imposta la data a 7 giorni fa
  const addedDate = new Date(dateAdded);
  return addedDate > sevenDaysAgo; // Restituisce true se il posto è stato aggiunto entro 7 giorni
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
        rootMargin: '0px',
        threshold: 0.9, // Trigger when 10% of the element is visible
      }
    );

    if (placeRef.current) {
      observer.observe(placeRef.current);
    }

    return () => {
      if (placeRef.current) {
        observer.unobserve(placeRef.current);
      }
    };
  }, []);

  return (
    <li
      className={`container fadeIn ${isVisible ? '' : 'fadeOut'}`}
      ref={placeRef}
    >
      <a href={place.url} className="name">
        <h3 className="name">{place.name}</h3>
        {isNew && <span className="newLabel">New</span>}
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
