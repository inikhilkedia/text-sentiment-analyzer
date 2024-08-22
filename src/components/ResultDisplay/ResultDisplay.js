import { useCallback, memo } from "react";
import styles from "./ResultDisplay.module.css";

const ResultDisplay = ({ analysisResult }) => {
  const getResultStyle = useCallback((result) => {
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
  }, []);

  return (
    analysisResult && (
      <div className={`${styles.result} ${getResultStyle(analysisResult)}`}>
        <p>
          {analysisResult.charAt(0).toUpperCase() + analysisResult.slice(1)}
        </p>
      </div>
    )
  );
};

export default memo(ResultDisplay);
