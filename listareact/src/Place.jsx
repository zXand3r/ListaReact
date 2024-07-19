import React, { useEffect, useRef, useState } from 'react';
import './Place.css';

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
        rootMargin: '0px',
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
          {place.menuImage ? (
            <a href={place.menuImage}>
              Menù
            </a>
          ) : (
            <a href={place.menu}>
              Menù
            </a>
          )}
        </button>
      ) : (
        <button className="menuButton">
          <p>Not Available</p>
        </button>
      )}
    </li>
  );
}
