import React from "react";
import styles from "./Chip.module.css";

function Chip({ children }) {
  return <div className={styles.chip}>{children}</div>;
}

export default Chip;