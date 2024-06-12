import { useState } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [infoMessage, setInfoMessage] = useState("");

  const handleSearchChange = async (event) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);

    if (searchTerm.length > 2) {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${searchTerm}`
        );
        const fetchedCountries = response.data;
        setCountries(fetchedCountries);
        setSelectedCountry(null);
        setWeather(null);
      } catch (error) {
        console.log(error);
        setCountries([]);
        setInfoMessage("No countries found. Try a different search.");
      }
    } else {
      setCountries([]);
      setInfoMessage("Continue typing to search for a country...");
    }
  };

  const handleShowDetails = (country) => {
    setSelectedCountry(country);
    fetchWeather(country.capital[0]);
  };

  const fetchWeather = async (capital) => {
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.log("Weather data not available", error);
      setWeather(null);
    }
  };

  const renderWeatherDetails = (weather) => {
    return (
      <div>
        <h3>Weather in {weather.name}</h3>
        <p>
          <strong>Temperature:</strong> {weather.main.temp}°C
        </p>
        <p>
          <strong>Weather:</strong> {weather.weather[0].main}
        </p>
        <p>
          <strong>Wind:</strong> {weather.wind.speed} m/s
        </p>
      </div>
    );
  };

  const renderCountryDetail = (country) => {
    return (
      <div>
        <h3>{country.name.common}</h3>
        <p>
          <strong>Capital:</strong> {country.capital.join(", ")}
        </p>
        <p>
          <strong>Area:</strong> {country.area.toLocaleString()} km²
        </p>
        <p>
          <strong>Languages:</strong>{" "}
          {Object.values(country.languages).join(", ")}
        </p>
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          style={{ width: "150px" }}
        />
        {weather && renderWeatherDetails(weather)}
      </div>
    );
  };

  return (
    <div>
      <h1>Countries</h1>
      <input
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={handleSearchChange}
      />
      {infoMessage && <p>{infoMessage}</p>}
      {selectedCountry
        ? renderCountryDetail(selectedCountry)
        : countries.map((country) => (
            <div key={country.name.official}>
              {country.name.common}
              <button onClick={() => handleShowDetails(country)}>
                Show details
              </button>
            </div>
          ))}
    </div>
  );
};

export default App;
