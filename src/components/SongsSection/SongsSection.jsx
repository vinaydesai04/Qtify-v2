// src/components/SongsSection/SongsSection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Section from "../Section/Section";
import GenreTabs from "../GenreTabs/GenreTabs";

const SONGS_URL = "https://qtify-backend.labs.crio.do/songs";
const GENRES_URL = "https://qtify-backend.labs.crio.do/genres";

function SongsSection() {
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    axios
      .get(SONGS_URL)
      .then((res) => setSongs(res.data))
      .catch((err) => console.error("Failed to fetch songs", err));

    axios
      .get(GENRES_URL)
      .then((res) => {
        // API returns genres with a "key" like "rock", "pop", and a label.
        // Add "All" tab at the beginning.
        const apiGenres = res.data.data || res.data;
        const allGenre = { key: "all", label: "All" };
        setGenres([allGenre, ...apiGenres]);
      })
      .catch((err) => console.error("Failed to fetch genres", err));
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedIndex(newValue);
  };

  const selectedGenreKey = genres[selectedIndex]?.key || "all";

  const filteredSongs =
    selectedGenreKey === "all"
      ? songs
      : songs.filter((song) => song.genre.key === selectedGenreKey);

  return (
    <div>
      {/* Title handled by Section, but Tabs must appear as in Figma above carousel */}
      <div style={{ marginBottom: "16px" }}>
        <GenreTabs
          genres={genres}
          value={selectedIndex}
          onChange={handleTabChange}
        />
      </div>

      {/* Reuse Section: Songs section, no Show All, likes instead of follows */}
      <Section
        title="Songs"
        endpoint={SONGS_URL}          // not used internally in this approach
        isSongsSection={true}
        showToggle={false}
        overrideItems={filteredSongs} // we’ll add this prop next
      />
    </div>
  );
}

export default SongsSection;