import React, { memo } from "react";
import styles from "./ResultItem.module.css";

const ResultItem = ({ text, result }) => {
  const getResultStyle = (result) => {
    switch (result) {
      case "positive":
        return styles.positive;
      case "neutral":
        return styles.neutral;
      case "negative":
        return styles.negative;
      default:
        return "";
    }
  };

  return (
    <div className={styles.resultItemContainer}>
      <div className={styles.text}>{text}</div>
      <div className={`${styles.resultBox} ${getResultStyle(result)}`}>
        {result.charAt(0).toUpperCase() + result.slice(1)}
      </div>
    </div>
  );
};

export default memo(ResultItem);
