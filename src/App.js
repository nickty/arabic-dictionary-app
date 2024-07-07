import React, { useState } from "react";
import ArabicDictionary from "arabic-dictionary";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [dictionary] = useState(new ArabicDictionary());
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = () => {
    const cleanedInput = input.trim().replace(/\s+/g, " ");
    const searchResult = dictionary.search(cleanedInput);
    setResult(searchResult);
    setHasSearched(true);
    setSuggestions([]);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(value);
    if (value.length > 0) {
      const cleanedValue = value.trim().replace(/\s+/g, " ").toLowerCase();
      const filteredSuggestions = dictionary.data.filter((item) =>
        item.Translations.en.toLowerCase().startsWith(cleanedValue)
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.Translations.en);
    setSuggestions([]);
    setResult({
      ArabicWord: suggestion.Word,
      Frequency: suggestion.Frequency,
    });
    setHasSearched(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quranic Dictionary</h1>
        <p>Search a Word in Quran</p>
        <div className="search-container">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter an English word"
          />
          <button onClick={handleSearch}>Search</button>
          {suggestions.length > 0 && (
            <div className="suggestions">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.Translations.en}
                </div>
              ))}
            </div>
          )}
        </div>
        {result !== null ? (
          <div className="result">
            <p>Arabic Word: {result.ArabicWord}</p>
            <p>Frequency: {result.Frequency}</p>
          </div>
        ) : (
          hasSearched && <p>No result found</p>
        )}
      </header>
    </div>
  );
}

export default App;
