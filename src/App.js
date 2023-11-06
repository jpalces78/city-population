import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CityPopulation from './CityPopulation';

function App() {
  const [city, setCity] = useState('');
  const [population, setPopulation] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    if (population) {
      // No need to set city here
    }
  }, [population]);

  async function getPopulation() {
    const response = await axios.post(
      'https://countriesnow.space/api/v0.1/countries/population/cities',
      {
        city: city,
      }
    );
    const population = response.data.data.populationCounts[0].value;

    // Move the setCity here to update it only when the button is pressed
    setCity(city);

    setPopulation(population);

    // Add the search to the search history
    setSearchHistory([...searchHistory, { city, population }]);
  }

  return (
    <div>
      <h1>Get City Population</h1>
      <input
        type="text"
        placeholder="Enter a city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getPopulation}>Get Population</button>
      {population && <CityPopulation city={city} population={population} />}
      {searchHistory.length > 0 && (
        <div>
          <h2>Search History:</h2>
          {searchHistory.map((search, index) => (
            <div key={index}>
              <p>City: {search.city}</p>
              <p>Population: {search.population}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;