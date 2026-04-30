// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Section from "./components/Section/Section";

function App() {
  //const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (query) => {
    setSearchTerm(query);
    console.log("Search query:", query);
    // later: use this query to filter items or hit a search API
  };

  return (
    <BrowserRouter>
      <Navbar onSearch={handleSearch} />
      <Hero />

      <Section
        title="Top Albums"
        endpoint="https://qtify-backend.labs.crio.do/albums/top"
      />

      <Section
        title="New Albums"
        endpoint="https://qtify-backend.labs.crio.do/albums/new"
      />

      <Section
        title="Songs"
        endpoint="https://qtify-backend.labs.crio.do/songs"
        isSongsSection={true}
        showToggle={false}
      />
    </BrowserRouter>
  );
}

export default App;