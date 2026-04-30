// src/App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Section from "./components/Section/Section";

function App() {
  return (
    <BrowserRouter>
      <Navbar /* you can pass searchData later */ />
      <Hero />
      <Section /> {/* Top Albums from backend */}
    </BrowserRouter>
  );
}

export default App;