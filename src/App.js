import React, { useState } from "react";
import ArabicDictionary from "arabic-dictionary";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [dictionary] = useState(new ArabicDictionary());

  const handleSearch = () => {
    const cleanedInput = input.trim().replace(/\s+/g, " ");
    const searchResult = dictionary.search(cleanedInput);
    setResult(searchResult);
    setHasSearched(true);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
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
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter an English word"
          />
          <button onClick={handleSearch}>Search</button>
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
