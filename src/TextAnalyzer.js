// src/TextAnalyzer.js
import React, { useState, useCallback } from "react";
import styles from "./TextAnalyzer.module.css";
import { ArrowUp, ChevronDown } from "react-feather"; // Import Feather Icons

const TextAnalyzer = () => {
  const [userInput, setUserInput] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [currentUser, setCurrentUser] = useState("Admin");

  const handleInputChange = useCallback(async (e) => {
    const text = e.target.value;
    setUserInput(text);

    if (text) {
      try {
        const response = await fetch("http://localhost:3001/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setAnalysisResult(data.result);
      } catch (error) {
        console.error("Error analyzing text:", error);
        setAnalysisResult("Error occurred while analyzing text.");
      }
    } else {
      setAnalysisResult("");
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!userInput) return;

    try {
      const response = await fetch("http://localhost:3001/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: userInput }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAnalysisResult(data.result);
    } catch (error) {
      console.error("Error analyzing text:", error);
      setAnalysisResult("Error occurred while analyzing text.");
    }
  }, [userInput]);

  const handleUserChange = (e) => {
    setCurrentUser(e.target.value);
  };

  return (
    <div className={styles.container}>
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
      <div className={styles.header}>Hello, Dani</div>
      <div className={styles.subheader}>Just a quick check in</div>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          value={userInput}
          onChange={handleInputChange}
          placeholder="Chat with CynchAI..."
        />
        <button
          onClick={handleSubmit}
          className={`${styles.iconButton} ${userInput ? styles.active : ""}`}
        >
          <ArrowUp size={16} />
        </button>
      </div>
      {analysisResult && (
        <div style={{ marginTop: "20px" }}>
          <p>{analysisResult}</p>
        </div>
      )}
    </div>
  );
};

export default TextAnalyzer;
