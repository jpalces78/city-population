import React from 'react';

function CityPopulation({ city, population }) {
  return (
    <div>
      <h1>{city}</h1>
      <p>Population: {population}</p>
    </div>
  );
}

export default CityPopulation;