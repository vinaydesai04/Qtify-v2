import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import GenreTabs from "../GenreTabs/GenreTabs";
import styles from "./Section.module.css";

const GENRES_URL = "https://qtify-backend.labs.crio.do/genres";

function Section({
  title,
  endpoint,
  isSongsSection = false,
  showToggle = true,
}) {
  const [items, setItems] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false); // default: grid for albums

  // Songs-specific state
  const [genres, setGenres] = useState([]);
  const [selectedGenreIndex, setSelectedGenreIndex] = useState(0);

  // Fetch items (albums or songs)
  useEffect(() => {
    axios
      .get(endpoint)
      .then((res) => setItems(res.data))
      .catch((err) => {
        console.error(`Failed to fetch ${title}`, err);
      });
  }, [endpoint, title]);

  // Fetch genres only for Songs section
  useEffect(() => {
    if (!isSongsSection) return;

    axios
      .get(GENRES_URL)
      .then((res) => {
        const apiGenres = res.data.data || res.data;
        const allGenre = { key: "all", label: "All" };
        setGenres([allGenre, ...apiGenres]);
      })
      .catch((err) => console.error("Failed to fetch genres", err));
  }, [isSongsSection]);

  const handleToggle = () => {
  setIsCollapsed((prev) => !prev);
};

  const handleGenreChange = (event, newIndex) => {
    setSelectedGenreIndex(newIndex);
  };

  const selectedGenreKey =
    isSongsSection && genres[selectedGenreIndex]
      ? genres[selectedGenreIndex].key
      : "all";

  const visibleItems =
    isSongsSection && selectedGenreKey !== "all"
      ? items.filter((song) => song.genre.key === selectedGenreKey)
      : items;

  const renderCard = (item) => (
    <Card
      key={item.id}
      image={item.image}
      title={item.title}
      follows={!isSongsSection ? item.follows : undefined}
      likes={isSongsSection ? item.likes : undefined}
    />
  );

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        {/* Show All / Collapse button only for Albums, not for Songs */}
        {!isSongsSection && showToggle && (
          <button className={styles.collapse} onClick={handleToggle}>
            {isCollapsed ? "Collapse" : "Show All"}
          </button>
        )}
      </div>

      {/* Tabs inside section, under title, only for Songs */}
      {isSongsSection && genres.length > 0 && (
        <div className={styles.tabsWrapper}>
          <GenreTabs
            genres={genres}
            value={selectedGenreIndex}
            onChange={handleGenreChange}
          />
        </div>
      )}

      {isSongsSection ? (
  // Songs: always carousel
  <Carousel items={visibleItems}>
    {visibleItems.map(renderCard)}
    </Carousel>
  ) : isCollapsed ? (
    // Albums: collapsed state = carousel, button shows "Collapse"
    <Carousel items={visibleItems}>
      {visibleItems.map(renderCard)}
    </Carousel>
  ) : (
    // Albums: expanded state = grid, button shows "Show All"
    <div className={styles.grid}>{visibleItems.map(renderCard)}</div>
  )}
    </section>
  );
}

export default Section;
