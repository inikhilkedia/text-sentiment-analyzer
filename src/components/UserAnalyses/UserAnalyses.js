import React, { memo, lazy } from "react";
import styles from "./UserAnalyses.module.css";

const ResultItem = lazy(() => import("../ResultItem/ResultItem"));

const UserAnalyses = ({ currentUser, analyses }) => (
  <div className={styles.userAnalyses}>
    <h3>Analyses for {currentUser}</h3>
    <ul>
      {analyses.map((item, index) => (
        <ResultItem key={index} text={item.text} result={item.result} />
      ))}
    </ul>
  </div>
);

export default memo(UserAnalyses);
