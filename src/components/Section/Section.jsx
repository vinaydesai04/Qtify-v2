// src/components/Section/Section.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

const TOP_ALBUMS_URL = "https://qtify-backend.labs.crio.do/albums/top";

function Section() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios
      .get(TOP_ALBUMS_URL)
      .then((res) => setAlbums(res.data))
      .catch((err) => {
        console.error("Failed to fetch top albums", err);
      });
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Top Albums</h2>
        <button className={styles.collapse}>Collapse</button>
      </div>

      <div className={styles.grid}>
        {albums.map((album) => (
          <Card
            key={album.id}
            image={album.image}
            title={album.title}
            subtitle={`${album.follows} Follows`}
          />
        ))}
      </div>
    </section>
  );
}

export default Section;