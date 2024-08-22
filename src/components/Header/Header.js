import React, { memo } from "react";
import styles from "./Header.module.css";

const Header = () => (
  <div>
    <div className={styles.header}>Hello, Dani</div>
    <div className={styles.subheader}>Just a quick check in</div>
  </div>
);

export default memo(Header);
