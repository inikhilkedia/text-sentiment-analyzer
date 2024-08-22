import React, { memo } from "react";
import styles from "./InputField.module.css";
import { ArrowUp } from "react-feather";

const InputField = ({ userInput, handleInputChange, handleSubmit }) => {
  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.input}
        value={userInput}
        onChange={handleInputChange}
        placeholder="Enter text here..."
      />
      <button
        onClick={handleSubmit}
        className={`${styles.iconButton} ${userInput ? styles.active : ""}`}
        disabled={!userInput}
      >
        <ArrowUp size={16} />
      </button>
    </div>
  );
};

export default memo(InputField);
