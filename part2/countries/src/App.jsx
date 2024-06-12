import { useState } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
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

        if (fetchedCountries.length > 10) {
          setCountries([]);
          setSelectedCountry(null);
          setInfoMessage("Too many matches, specify another filter");
        } else {
          setCountries(fetchedCountries);
          setSelectedCountry(null);
          setInfoMessage("");
        }
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
