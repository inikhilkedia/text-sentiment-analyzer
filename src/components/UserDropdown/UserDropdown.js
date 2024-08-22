import React, { memo } from "react";
import styles from "./UserDropdown.module.css";
import { ChevronDown } from "react-feather";

const UserDropdown = ({ currentUser, handleUserChange }) => (
  <div className={styles.userDropdown}>
    <select
      value={currentUser}
      onChange={handleUserChange}
      className={styles.select}
    >
      <option value="Admin">Admin</option>
      <option value="User1">User1</option>
      <option value="User2">User2</option>
    </select>
    <ChevronDown size={16} className={styles.chevron} />
  </div>
);

export default memo(UserDropdown);
