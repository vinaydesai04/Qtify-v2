import React from "react";
import styles from "./Card.module.css";
import Chip from "../Chip/Chip";

function Card({ image, title, follows, likes, onClick }) {
  const hasFollows = typeof follows === "number";
  const hasLikes = typeof likes === "number";

  let chipText = "";
  if (hasFollows) chipText = `${follows} Follows`;
  if (hasLikes) chipText = `${likes} Likes`;

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
        {(hasFollows || hasLikes) && (
          <div className={styles.chipWrapper}>
            <Chip>{chipText}</Chip>
          </div>
        )}
      </div>
      <p className={styles.title}>{title}</p>
    </div>
  );
}

export default Card;