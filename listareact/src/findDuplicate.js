const { places } = require('./places.js')

/*
 * Find duplicate URLs and names in the given data structure.
 * Returns an object with two arrays: duplicateUrls and duplicateNames.
 * If no duplicates are found, both arrays will be empty.

 * Cambiamenti da fare prima del run nel file places.js:
 * - Line 2: rimuovere l'export ed aggiungere alla fine "module.exports = { places };"
 * - Rimuovere l'import nella linea 1 e commentare linea 23-24
 */ 

function findDuplicates(data) {
  const urls = new Set();
  const names = new Set();
  const duplicateUrls = new Set();
  const duplicateNames = new Set();

  Object.keys(data).forEach(category => {
    Object.keys(data[category]).forEach(city => {
      data[category][city].forEach(place => {
        if (urls.has(place.url)) {
          duplicateUrls.add(place.url);
        } else {
          urls.add(place.url);
        }
        
        if (names.has(place.name)) {
          duplicateNames.add(place.name);
        } else {
          names.add(place.name);
        }
      });
    });
  });

  return {
    duplicateUrls: Array.from(duplicateUrls),
    duplicateNames: Array.from(duplicateNames)
  };
}

const { duplicateUrls, duplicateNames } = findDuplicates(places);

if (duplicateUrls.length > 0) {
  console.log('Duplicate URLs found:', duplicateUrls);
} else {
  console.log('No duplicate URLs found');
}

if (duplicateNames.length > 0) {
  console.log('Duplicate Names found:', duplicateNames);
} else {
  console.log('No duplicate Names found');
}
